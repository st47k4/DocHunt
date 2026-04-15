from pydantic import BaseModel


class MetadataField(BaseModel):
    key: str
    label: str
    value: str
    sensitive: bool = False


class SensitiveMatch(BaseModel):
    type: str   # ip_v4, email, phone, date, iban, postal_fr, ssn_fr
    label: str  # label humain (ex: "Email")
    value: str  # valeur trouvée dans le texte


class AnalysisResult(BaseModel):
    filename: str
    file_size: int
    page_count: int
    pdf_version: str
    encrypted: bool
    risk_score: int  # 0 à 100
    fields: list[MetadataField]
    warnings: list[str]
    has_javascript: bool
    has_embedded_files: bool
    embedded_urls: list[str]
    sensitive_matches: list[SensitiveMatch]  # données sensibles extraites du texte
