import io
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

from analyzers.base import BaseAnalyzer
from analyzers.pdf import _extract_sensitive_data  # réutilise regex + NER sans duplication
from logger import logger
from models.result import MetadataField, OfficeAnalysisResult, OfficeComment, SensitiveMatch

# ── XML namespaces ─────────────────────────────────────────────────────────────
_CP  = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
_DC  = "http://purl.org/dc/elements/1.1/"
_DCT = "http://purl.org/dc/terms/"
_APP = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
_W   = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
_A   = "http://schemas.openxmlformats.org/drawingml/2006/main"
_SS  = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
_REL = "http://schemas.openxmlformats.org/package/2006/relationships"
_HYPERLINK_REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink"


def _read_zip(zf: zipfile.ZipFile, path: str) -> bytes | None:
    try:
        return zf.read(path)
    except KeyError:
        return None


def _parse_xml(data: bytes) -> ET.Element | None:
    try:
        return ET.fromstring(data)
    except ET.ParseError:
        return None


def _iter_text_nodes(root: ET.Element, ns: str, tag: str) -> list[str]:
    return [el.text.strip() for el in root.iter(f"{{{ns}}}{tag}") if el.text and el.text.strip()]


# ── Core metadata (docProps/core.xml) ─────────────────────────────────────────

_CORE_FIELDS: list[tuple[str, str, str, bool]] = [
    (_DC,  "title",          "Titre",                False),
    (_DC,  "creator",        "Auteur",               True),
    (_DC,  "subject",        "Sujet",                False),
    (_DC,  "description",    "Description",          False),
    (_CP,  "lastModifiedBy", "Dernière modif. par",  True),
    (_CP,  "revision",       "Révisions",            True),
    (_CP,  "keywords",       "Mots-clés",            False),
    (_CP,  "category",       "Catégorie",            False),
    (_DCT, "created",        "Date de création",     True),
    (_DCT, "modified",       "Date de modification", True),
]


def _extract_core(zf: zipfile.ZipFile) -> list[MetadataField]:
    raw = _read_zip(zf, "docProps/core.xml")
    if not raw:
        return []
    root = _parse_xml(raw)
    if root is None:
        return []
    fields: list[MetadataField] = []
    for ns, tag, label, sensitive in _CORE_FIELDS:
        el = root.find(f"{{{ns}}}{tag}")
        if el is not None and el.text:
            fields.append(MetadataField(key=tag, label=label, value=el.text.strip(), sensitive=sensitive))
    return fields


# ── App metadata (docProps/app.xml) ───────────────────────────────────────────

_APP_FIELDS: list[tuple[str, str, bool]] = [
    ("Application",  "Application",          True),
    ("AppVersion",   "Version",              False),
    ("Company",      "Société",              True),
    ("Template",     "Template",             True),
    ("TotalTime",    "Temps d'édition (min)", False),
    ("Pages",        "Pages",                False),
    ("Words",        "Mots",                 False),
    ("Characters",   "Caractères",           False),
    ("Slides",       "Diapositives",         False),
    ("Sheets",       "Feuilles",             False),
]


def _extract_app(zf: zipfile.ZipFile) -> list[MetadataField]:
    raw = _read_zip(zf, "docProps/app.xml")
    if not raw:
        return []
    root = _parse_xml(raw)
    if root is None:
        return []
    fields: list[MetadataField] = []
    for tag, label, sensitive in _APP_FIELDS:
        el = root.find(f"{{{_APP}}}{tag}")
        if el is not None and el.text:
            fields.append(MetadataField(key=tag, label=label, value=el.text.strip(), sensitive=sensitive))
    return fields


# ── Text extraction ────────────────────────────────────────────────────────────

def _docx_text(zf: zipfile.ZipFile) -> str | None:
    raw = _read_zip(zf, "word/document.xml")
    if not raw:
        return None
    root = _parse_xml(raw)
    if root is None:
        return None
    parts = _iter_text_nodes(root, _W, "t")
    return " ".join(parts) if parts else None


def _xlsx_text(zf: zipfile.ZipFile) -> str | None:
    raw = _read_zip(zf, "xl/sharedStrings.xml")
    if not raw:
        return None
    root = _parse_xml(raw)
    if root is None:
        return None
    parts = _iter_text_nodes(root, _SS, "t")
    return " ".join(parts) if parts else None


def _pptx_text(zf: zipfile.ZipFile) -> str | None:
    parts: list[str] = []
    slide_names = sorted(n for n in zf.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n))
    for name in slide_names:
        raw = _read_zip(zf, name)
        if not raw:
            continue
        root = _parse_xml(raw)
        if root is None:
            continue
        parts.extend(_iter_text_nodes(root, _A, "t"))
    return " ".join(parts) if parts else None


# ── Tracked changes — texte supprimé récupérable (DOCX uniquement) ────────────

def _docx_deletions(zf: zipfile.ZipFile) -> list[str]:
    raw = _read_zip(zf, "word/document.xml")
    if not raw:
        return []
    root = _parse_xml(raw)
    if root is None:
        return []
    snippets: list[str] = []
    seen: set[str] = set()
    for del_el in root.iter(f"{{{_W}}}del"):
        texts = [
            el.text.strip()
            for el in del_el.iter(f"{{{_W}}}delText")
            if el.text and el.text.strip()
        ]
        snippet = " ".join(texts)
        if snippet and snippet not in seen:
            seen.add(snippet)
            snippets.append(snippet)
    return snippets[:50]


# ── Commentaires ──────────────────────────────────────────────────────────────

def _docx_comments(zf: zipfile.ZipFile) -> list[OfficeComment]:
    raw = _read_zip(zf, "word/comments.xml")
    if not raw:
        return []
    root = _parse_xml(raw)
    if root is None:
        return []
    results: list[OfficeComment] = []
    for el in root.iter(f"{{{_W}}}comment"):
        author = el.get(f"{{{_W}}}author", "").strip()
        date = el.get(f"{{{_W}}}date", "").strip() or None
        texts = [t.text.strip() for t in el.iter(f"{{{_W}}}t") if t.text and t.text.strip()]
        text = " ".join(texts)
        if text or author:
            results.append(OfficeComment(author=author, date=date, text=text))
    return results


def _xlsx_comments(zf: zipfile.ZipFile) -> list[OfficeComment]:
    results: list[OfficeComment] = []
    names = sorted(n for n in zf.namelist() if re.match(r"xl/comments\d+\.xml$", n))
    for name in names:
        raw = _read_zip(zf, name)
        if not raw:
            continue
        root = _parse_xml(raw)
        if root is None:
            continue
        authors_el = root.find(f"{{{_SS}}}authors")
        author_list = [el.text or "" for el in authors_el] if authors_el is not None else []
        for comment_el in root.iter(f"{{{_SS}}}comment"):
            try:
                author = author_list[int(comment_el.get("authorId", "0"))]
            except (IndexError, ValueError):
                author = ""
            texts = [t.text.strip() for t in comment_el.iter(f"{{{_SS}}}t") if t.text and t.text.strip()]
            text = " ".join(texts)
            if text or author:
                results.append(OfficeComment(author=author, date=None, text=text))
    return results


# ── Liens hypertextes ─────────────────────────────────────────────────────────

def _extract_hyperlinks(zf: zipfile.ZipFile, file_type: str) -> list[str]:
    if file_type == "pptx":
        rels_paths = sorted(
            n for n in zf.namelist()
            if re.match(r"ppt/slides/_rels/slide\d+\.xml\.rels$", n)
        )
    else:
        path_map = {"docx": "word/_rels/document.xml.rels", "xlsx": "xl/_rels/workbook.xml.rels"}
        path = path_map.get(file_type)
        rels_paths = [path] if path else []

    urls: list[str] = []
    seen: set[str] = set()
    for path in rels_paths:
        raw = _read_zip(zf, path)
        if not raw:
            continue
        root = _parse_xml(raw)
        if root is None:
            continue
        for rel in root.iter(f"{{{_REL}}}Relationship"):
            if rel.get("Type") == _HYPERLINK_REL:
                target = rel.get("Target", "").strip()
                if target and target not in seen:
                    seen.add(target)
                    urls.append(target)
    return urls[:50]


# ── Scoring ───────────────────────────────────────────────────────────────────

def _score(
    fields: list[MetadataField],
    comments: list[OfficeComment],
    has_tracked_changes: bool,
    sensitive_matches: list[SensitiveMatch],
    embedded_urls: list[str],
) -> int:
    score = min(sum(1 for f in fields if f.sensitive and f.value) * 10, 30)
    if has_tracked_changes:
        score += 20
    score += min(len(comments) * 5, 15)
    score += min(len(sensitive_matches) * 5, 25)
    score += min(len(embedded_urls) * 2, 10)
    return min(score, 100)


# ── OfficeAnalyzer ─────────────────────────────────────────────────────────────

_TEXT_EXTRACTORS = {
    "docx": _docx_text,
    "xlsx": _xlsx_text,
    "pptx": _pptx_text,
}

_COMMENT_EXTRACTORS = {
    "docx": _docx_comments,
    "xlsx": _xlsx_comments,
}


class OfficeAnalyzer(BaseAnalyzer):
    def analyze(self, data: bytes, filename: str) -> OfficeAnalysisResult:
        file_type = Path(filename).suffix.lower().lstrip(".")
        warnings: list[str] = []

        with zipfile.ZipFile(io.BytesIO(data)) as zf:
            core_fields = _extract_core(zf)
            app_fields = _extract_app(zf)
            all_fields = core_fields + app_fields
            logger.debug("[OFFICE] %s: core=%d app=%d fields", file_type, len(core_fields), len(app_fields))

            extractor = _TEXT_EXTRACTORS.get(file_type)
            text = extractor(zf) if extractor else None
            logger.debug("[OFFICE] text: %d chars", len(text) if text else 0)

            deleted_snippets = _docx_deletions(zf) if file_type == "docx" else []
            if deleted_snippets:
                warnings.append(
                    f"{len(deleted_snippets)} fragment(s) de texte supprimé(s) récupérable(s) via les tracked changes."
                )

            comment_extractor = _COMMENT_EXTRACTORS.get(file_type)
            comments: list[OfficeComment] = comment_extractor(zf) if comment_extractor else []
            if comments:
                authors = {c.author for c in comments if c.author}
                warnings.append(f"{len(comments)} commentaire(s), {len(authors)} auteur(s) identifié(s).")
            logger.debug("[OFFICE] comments=%d deletions=%d", len(comments), len(deleted_snippets))

            embedded_urls = _extract_hyperlinks(zf, file_type)
            logger.debug("[OFFICE] hyperlinks=%d", len(embedded_urls))

        text_parts = [p for p in [text, " ".join(deleted_snippets) if deleted_snippets else None] if p]
        sensitive_matches: list[SensitiveMatch] = (
            _extract_sensitive_data(" ".join(text_parts)) if text_parts else []
        )
        logger.debug("[OFFICE] sensitive_matches=%d", len(sensitive_matches))

        company = next((f.value for f in all_fields if f.key == "Company" and f.value), None)
        if company:
            warnings.append(f"Société identifiée dans les métadonnées : {company}")

        last_mod = next((f.value for f in all_fields if f.key == "lastModifiedBy" and f.value), None)
        if last_mod:
            warnings.append(f"Dernière modification par : {last_mod}")

        has_tracked_changes = bool(deleted_snippets)
        risk = _score(all_fields, comments, has_tracked_changes, sensitive_matches, embedded_urls)
        logger.debug("[OFFICE] risk_score=%d", risk)

        return OfficeAnalysisResult(
            filename=filename,
            file_size=len(data),
            file_type=file_type,
            risk_score=risk,
            fields=all_fields,
            warnings=warnings,
            has_tracked_changes=has_tracked_changes,
            deleted_text_snippets=deleted_snippets,
            comments=comments,
            embedded_urls=embedded_urls,
            sensitive_matches=sensitive_matches,
        )
