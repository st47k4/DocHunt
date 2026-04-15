import io
import re
from typing import TYPE_CHECKING

import pikepdf
import pdfplumber

from analyzers.base import BaseAnalyzer
from models.result import AnalysisResult, MetadataField, SensitiveMatch

if TYPE_CHECKING:
    from spacy.language import Language

# Chargement lazy : le modèle spaCy est initialisé au premier appel,
# pas au démarrage du serveur (évite de bloquer les workers uvicorn)
_nlp: "Language | None" = None


def _get_nlp() -> "Language":
    global _nlp
    if _nlp is None:
        import spacy
        # Seul le pipeline NER est chargé — parser/tagger/lemmatizer désactivés
        # pour réduire la mémoire et doubler la vitesse de traitement
        _nlp = spacy.load("fr_core_news_md", disable=["parser", "tagger", "lemmatizer"])
    return _nlp


# Champs du dictionnaire Info d'un PDF avec leur label humain et leur sensibilité
_INFO_FIELDS: list[tuple[str, str, bool]] = [
    ("Title",    "Titre",             False),
    ("Author",   "Auteur",            True),
    ("Subject",  "Sujet",             False),
    ("Keywords", "Mots-clés",         False),
    ("Creator",  "Logiciel créateur", True),
    ("Producer", "Producteur PDF",    True),
    ("CreationDate", "Date de création",    True),
    ("ModDate",      "Date de modification", True),
]

# Regex pour détecter les URLs dans le contenu brut du PDF
_URL_RE = re.compile(rb"https?://[^\s<>\"')\]]+", re.IGNORECASE)

# Clés XMP qui indiquent une présence de coordonnées GPS
_GPS_XMP_KEYS = {"exif:GPSLatitude", "exif:GPSLongitude", "GPS"}

# ── Regex données sensibles ────────────────────────────────────────────────────

_RE_IPV4 = re.compile(
    r'\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b'
)

_RE_EMAIL = re.compile(
    r'\b[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}\b'
)

# Téléphone FR étendu : +33 (0)1 56 65 89 98 · 01.56.65.89.98 · 06-12-34-56-78
# Capture aussi les mobiles FR et les formats internationaux courants
_RE_PHONE = re.compile(
    r'(?:'
    r'(?:\+33|0033)[\s.\-]?\(?0?\)?[\s.\-]?[1-9](?:[\s.\-]?\d{2}){4}'  # +33 (0)X ou 0033 X
    r'|0[1-9](?:[\s.\-]?\d{2}){4}'                                        # 0X XX XX XX XX
    r'|\+(?!33)\d{1,3}[\s.\-]?\(?\d{1,4}\)?[\s.\-]?\d{1,4}[\s.\-]?\d{1,9}'  # international hors FR
    r')'
)

# Dates : DD/MM/YYYY · YYYY-MM-DD · "12 mars 2024" · "12 March 2024"
_RE_DATE = re.compile(
    r'\b(?:\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}'
    r'|\d{4}[-/.]\d{2}[-/.]\d{2}'
    r'|\d{1,2}\s+(?:janvier|février|mars|avril|mai|juin|juillet|ao[uû]t'
    r'|septembre|octobre|novembre|décembre'
    r'|january|february|march|april|may|june|july|august'
    r'|september|october|november|december)\s+\d{4})\b',
    re.IGNORECASE,
)

# IBAN (FR et international)
_RE_IBAN = re.compile(
    r'\b[A-Z]{2}\d{2}(?:\s?[A-Z0-9]{4}){2,7}\s?[A-Z0-9]{1,4}\b'
)

# Code postal français (01000 – 95999, Corse 20xxx inclus)
_RE_POSTAL_FR = re.compile(
    r'\b(?:0[1-9]|[1-8]\d|9[0-5]|20)\d{3}\b'
)

# Numéro de sécurité sociale français (15 chiffres avec espaces optionnels)
_RE_SSN_FR = re.compile(
    r'\b[12]\s?\d{2}\s?(?:0[1-9]|1[0-2])\s?\d{2}\s?\d{3}\s?\d{3}\s?\d{2}\b'
)

# Personne avec civilité : M. / Mr / Mme / Madame / Mademoiselle / Mlle / Dr / Me / Maître
# Capture le nom complet qui suit (1 à 3 mots en majuscule)
_RE_PERSON = re.compile(
    r'\b(?:M\.|Mr\.?|Mme\.?|Madame|Mademoiselle|Mlle\.?|Dr\.?|Me\.?|Ma[îi]tre)\s+'
    r'[A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ][A-Za-zàâäéèêëîïôöùûüç\-]+'
    r'(?:\s+[A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ][A-Za-zàâäéèêëîïôöùûüç\-]+){0,2}',
    re.UNICODE,
)

# SIRET (14 chiffres : 3-3-3-5) — toujours avant SIREN pour éviter les chevauchements
_RE_SIRET = re.compile(
    r'\b\d{3}[\s.\-]?\d{3}[\s.\-]?\d{3}[\s.\-]\d{5}\b'
)

# SIREN (9 chiffres : 3-3-3) — uniquement s'il n'est pas suivi de 5 autres chiffres (SIRET)
_RE_SIREN = re.compile(
    r'\b\d{3}[\s.\-]\d{3}[\s.\-]\d{3}(?![\s.\-]?\d)\b'
)

# TVA intracommunautaire française : FR + 2 caractères alphanumériques + 9 chiffres
_RE_TVA_FR = re.compile(
    r'\bFR\s?[0-9A-Z]{2}\s?\d{3}\s?\d{3}\s?\d{3}\b',
    re.IGNORECASE,
)

# Plaque d'immatriculation française SIV (depuis 2009) : AA-000-AA
# Exclut les lettres I, O, U, SS et les séquences ambiguës
_RE_PLATE_FR = re.compile(
    r'\b[A-HJ-NP-TV-Z]{2}[-\s]\d{3}[-\s][A-HJ-NP-TV-Z]{2}\b'
)

# Coordonnées GPS décimales dans le texte
# Formats : "48.8566, 2.3522" · "48.8566° N, 2.3522° E" · "lat: 48.856 lon: 2.352"
_RE_GPS_TEXT = re.compile(
    r'-?\d{1,3}\.\d{4,}\s*°?\s*[NSns]?[,;]\s*-?\d{1,3}\.\d{4,}\s*°?\s*[EWew]?'
)

# Handle / pseudo social media : @username (Twitter, Instagram, etc.)
# L'email étant déjà capturé, on exclut les chaînes avec un domaine
_RE_HANDLE = re.compile(
    r'(?<!\S)@[a-zA-Z0-9_\.]{3,30}(?!\.[a-zA-Z]{2,})'
)

# UUID / GUID (version 1 à 5)
_RE_UUID = re.compile(
    r'\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b',
    re.IGNORECASE,
)

# URLs dans le texte (http/https + www.)
_RE_URL_TEXT = re.compile(
    r'https?://[^\s<>"\')\]]+|www\.[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(?:/[^\s<>"\')\]]*)?',
    re.IGNORECASE,
)


def _parse_pdf_date(raw: str) -> str:
    """Convertit une date PDF (D:20230101120000+01'00') en format lisible."""
    raw = raw.strip().lstrip("D:").replace("'", "")
    if len(raw) >= 14:
        return f"{raw[0:4]}-{raw[4:6]}-{raw[6:8]} {raw[8:10]}:{raw[10:12]}:{raw[12:14]}"
    if len(raw) >= 8:
        return f"{raw[0:4]}-{raw[4:6]}-{raw[6:8]}"
    return raw


def _score(fields: list[MetadataField], has_js: bool, has_embedded: bool, has_gps: bool, urls: list[str]) -> int:
    """Calcule un score de risque de 0 à 100."""
    score = 0

    sensitive = [f for f in fields if f.sensitive and f.value]
    score += min(len(sensitive) * 12, 40)  # max 40 pts pour les champs sensibles

    if has_gps:
        score += 25
    if has_js:
        score += 20
    if has_embedded:
        score += 15
    if urls:
        score += min(len(urls) * 3, 10)

    return min(score, 100)


class PdfAnalyzer(BaseAnalyzer):
    def analyze(self, data: bytes, filename: str) -> AnalysisResult:
        warnings: list[str] = []
        fields: list[MetadataField] = []
        embedded_urls: list[str] = []
        has_javascript = False
        has_embedded_files = False
        has_gps = False

        with pikepdf.open(io.BytesIO(data)) as pdf:
            # ── Infos de base ──────────────────────────────────────────────
            page_count = len(pdf.pages)
            pdf_version = str(pdf.pdf_version)
            encrypted = pdf.is_encrypted

            if encrypted:
                warnings.append("Le PDF est chiffré : certaines métadonnées peuvent être inaccessibles.")

            # ── Dictionnaire Info ──────────────────────────────────────────
            info = pdf.docinfo or {}
            for key, label, sensitive in _INFO_FIELDS:
                raw = info.get(f"/{key}")
                if raw is None:
                    continue
                value = str(raw)
                if key in ("CreationDate", "ModDate"):
                    value = _parse_pdf_date(value)
                fields.append(MetadataField(key=key, label=label, value=value, sensitive=sensitive))

            # ── Métadonnées XMP ────────────────────────────────────────────
            try:
                with pdf.open_metadata() as meta:
                    for k in _GPS_XMP_KEYS:
                        if any(k.lower() in mk.lower() for mk in meta):
                            has_gps = True
                            warnings.append("Des coordonnées GPS ont été détectées dans les métadonnées XMP.")
                            break
            except Exception:
                pass  # XMP absent ou corrompu

            # ── JavaScript ────────────────────────────────────────────────
            try:
                root = pdf.Root
                if "/Names" in root:
                    names = root["/Names"]
                    if "/JavaScript" in names:
                        has_javascript = True
                        warnings.append("Du JavaScript est présent dans ce PDF.")
                if "/AA" in root or "/OpenAction" in root:
                    action = root.get("/OpenAction") or root.get("/AA")
                    if action and "/JS" in str(action):
                        has_javascript = True
            except Exception:
                pass

            # ── Fichiers embarqués ────────────────────────────────────────
            try:
                root = pdf.Root
                if "/Names" in root:
                    names = root["/Names"]
                    if "/EmbeddedFiles" in names:
                        has_embedded_files = True
                        warnings.append("Des fichiers sont embarqués dans ce PDF.")
            except Exception:
                pass

            # ── URLs dans le contenu brut ─────────────────────────────────
            try:
                raw_content = data
                found = _URL_RE.findall(raw_content)
                seen: set[str] = set()
                for url in found:
                    decoded = url.decode("utf-8", errors="ignore").rstrip(".,;)")
                    if decoded not in seen:
                        seen.add(decoded)
                        embedded_urls.append(decoded)
                embedded_urls = embedded_urls[:50]  # cap pour éviter les abus
            except Exception:
                pass

        risk_score = _score(fields, has_javascript, has_embedded_files, has_gps, embedded_urls)

        # ── Extraction et analyse du texte ─────────────────────────────────
        text = _extract_text(data)
        sensitive_matches = _extract_sensitive_data(text) if text else []

        return AnalysisResult(
            filename=filename,
            file_size=len(data),
            page_count=page_count,
            pdf_version=pdf_version,
            encrypted=encrypted,
            risk_score=risk_score,
            fields=fields,
            warnings=warnings,
            has_javascript=has_javascript,
            has_embedded_files=has_embedded_files,
            embedded_urls=embedded_urls,
            sensitive_matches=sensitive_matches,
        )


def _extract_text(data: bytes) -> str | None:
    """
    Extrait le texte embarqué via pdfplumber.
    Retourne None si le PDF est un scan pur (aucune couche texte).
    """
    try:
        with pdfplumber.open(io.BytesIO(data)) as pdf:
            parts: list[str] = []
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    parts.append(text.strip())

            if not parts:
                return None  # PDF scanné sans couche texte → OCR Tesseract requis

            return "\n\n".join(parts)
    except Exception:
        return None


def _extract_sensitive_data(text: str) -> list[SensitiveMatch]:
    """
    Recherche par regex les données sensibles dans le texte extrait du PDF.
    Déduplique les valeurs identiques par type.
    """
    matches: list[SensitiveMatch] = []
    seen: set[tuple[str, str]] = set()

    def _add(match_type: str, label: str, value: str) -> None:
        value = value.strip()
        key = (match_type, value)
        if key not in seen:
            seen.add(key)
            matches.append(SensitiveMatch(type=match_type, label=label, value=value))

    # ── Identité ──────────────────────────────────────────────────────────────
    for m in _RE_PERSON.finditer(text):
        _add("person", "Personne", m.group())

    for m in _RE_HANDLE.finditer(text):
        _add("handle", "Pseudo", m.group())

    # ── Contact ───────────────────────────────────────────────────────────────
    for m in _RE_EMAIL.finditer(text):
        _add("email", "E-mail", m.group())

    for m in _RE_PHONE.finditer(text):
        digits = re.sub(r'\D', '', m.group())
        if len(digits) >= 9:
            _add("phone", "Téléphone", m.group())

    # ── Entreprise ────────────────────────────────────────────────────────────
    for m in _RE_SIRET.finditer(text):
        _add("siret", "SIRET", m.group())

    for m in _RE_SIREN.finditer(text):
        _add("siren", "SIREN", m.group())

    for m in _RE_TVA_FR.finditer(text):
        _add("tva_fr", "N° TVA", m.group())

    # ── Finances ──────────────────────────────────────────────────────────────
    for m in _RE_IBAN.finditer(text):
        _add("iban", "IBAN", m.group())

    # ── Réseau / technique ────────────────────────────────────────────────────
    for m in _RE_IPV4.finditer(text):
        _add("ip_v4", "Adresse IP", m.group())

    for m in _RE_UUID.finditer(text):
        _add("uuid", "UUID", m.group())

    for m in _RE_URL_TEXT.finditer(text):
        url = m.group().rstrip(".,;)")
        _add("url", "Lien", url)

    # ── Localisation ─────────────────────────────────────────────────────────
    for m in _RE_GPS_TEXT.finditer(text):
        _add("gps_text", "Coordonnées GPS", m.group())

    for m in _RE_POSTAL_FR.finditer(text):
        _add("postal_fr", "Code postal", m.group())

    for m in _RE_PLATE_FR.finditer(text):
        _add("plate_fr", "Plaque d'immatriculation", m.group())

    # ── Documents ────────────────────────────────────────────────────────────
    for m in _RE_SSN_FR.finditer(text):
        _add("ssn_fr", "N° Sécurité sociale", m.group())

    for m in _RE_DATE.finditer(text):
        _add("date", "Date", m.group())

    # ── NER spaCy ────────────────────────────────────────────────────────────
    # Complète les regex : détecte les personnes sans titre, les villes/pays,
    # et les organisations que les patterns ci-dessus ne peuvent pas capturer.
    # Limité à 100 000 caractères pour éviter les pics mémoire sur les gros PDFs.
    try:
        nlp = _get_nlp()
        doc = nlp(text[:100_000])
        for ent in doc.ents:
            value = ent.text.strip()
            if not _ner_valid(ent.label_, value):
                continue
            # Déduplication globale : si la valeur exacte est déjà dans seen
            # (capturée par regex ou un autre label NER), on ne la re-ajoute pas
            already = any(v == value for (_, v) in seen)
            if already:
                continue
            if ent.label_ == "PER":
                _add("ner_person", "Personne", value)
            elif ent.label_ in ("LOC", "GPE"):
                _add("ner_loc", "Lieu / Ville / Pays", value)
            elif ent.label_ == "ORG":
                _add("ner_org", "Organisation", value)
    except Exception:
        pass  # spaCy non disponible ou erreur → on continue sans NER

    return matches


# Mots typiques de CV / sections qui génèrent des faux positifs NER
_NER_BLOCKLIST: frozenset[str] = frozenset({
    "compétences", "langues", "expériences", "formation", "diplômes",
    "certifications", "projets", "références", "contact", "profil",
    "résumé", "summary", "skills", "education", "experience", "languages",
    "freelance", "esport", "collecte", "scraping", "administration",
    "développeur", "développement", "anglais", "français", "espagnol",
    "alternance", "stage", "poste", "mission", "objectif",
})

# Outils techniques courants mal classifiés comme LOC / ORG
_TECH_NAMES: frozenset[str] = frozenset({
    "symfony", "mattermost", "teleport", "docker", "github", "gitlab",
    "linux", "windows", "python", "javascript", "typescript", "react",
    "nodejs", "zabbix", "grafana", "ansible", "kubernetes", "jenkins",
    "element", "jira", "confluence", "slack",
})

# Connecteurs autorisés au milieu d'un nom d'org
_CONNECTORS: frozenset[str] = frozenset({
    "de", "du", "des", "le", "la", "les", "l'", "d'", "en", "et",
    "&", "of", "the", "·", "-",
})


def _ner_valid(label: str, value: str) -> bool:
    """
    Filtre de qualité NER — retourne False si l'entité ressemble à un faux positif.
    Préférence forte : rien plutôt que n'importe quoi.
    """
    if len(value) < 3:
        return False

    words = value.split()
    lower_words = [w.lower().strip("'.,;:") for w in words]

    # Rejeter si un mot est dans la blocklist (section CV, terme générique)
    if any(w in _NER_BLOCKLIST for w in lower_words):
        return False

    if label == "PER":
        # Prénom + Nom : 2 à 4 mots, chacun commençant par une majuscule, pas de chiffres
        if not (2 <= len(words) <= 4):
            return False
        if any(c.isdigit() for c in value):
            return False
        if not all(w[0].isupper() for w in words if w and w[0].isalpha()):
            return False
        return True

    if label in ("LOC", "GPE"):
        # Lieu : 1 à 3 mots, commence par une majuscule, pas un outil tech
        if len(words) > 3 or len(value) > 40:
            return False
        if not value[0].isupper():
            return False
        if words[0].lower() in _TECH_NAMES or value.lower() in _TECH_NAMES:
            return False
        # Rejeter les chaînes entièrement en minuscules
        if value.islower():
            return False
        return True

    if label == "ORG":
        # Organisation : 2 à 5 mots, commence par une majuscule
        if not (2 <= len(words) <= 5):
            return False
        if len(value) > 60:
            return False
        if not value[0].isupper():
            return False
        # Chaque mot non-connecteur doit commencer par une majuscule
        significant = [w for w in words if w.lower().strip("'.,") not in _CONNECTORS]
        if not all(w[0].isupper() for w in significant if w and w[0].isalpha()):
            return False
        return True

    return False
