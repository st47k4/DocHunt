from pydantic import BaseModel


class MetadataField(BaseModel):
    key: str
    label: str
    value: str
    sensitive: bool = False


class SensitiveMatch(BaseModel):
    type: str   # ip_v4, email, phone, date, iban, postal_fr, ssn_fr…
    label: str  # label humain (ex: "Email")
    value: str  # valeur trouvée dans le texte


# ── PDF ───────────────────────────────────────────────────────────────────────

class PdfAnalysisResult(BaseModel):
    filename: str
    file_size: int
    page_count: int
    pdf_version: str
    encrypted: bool
    risk_score: int          # 0 à 100
    fields: list[MetadataField]
    warnings: list[str]
    has_javascript: bool
    has_embedded_files: bool
    embedded_urls: list[str]
    sensitive_matches: list[SensitiveMatch]


# ── Image ─────────────────────────────────────────────────────────────────────

class ImageAnalysisResult(BaseModel):
    filename: str
    file_size: int
    format: str              # JPEG, PNG, WEBP, TIFF…
    width: int | None = None
    height: int | None = None
    mode: str | None = None  # RGB, RGBA, L…
    risk_score: int          # 0 à 100
    fields: list[MetadataField]
    warnings: list[str]
    has_gps: bool = False
    gps_latitude: float | None = None
    gps_longitude: float | None = None
    sensitive_matches: list[SensitiveMatch] = []
