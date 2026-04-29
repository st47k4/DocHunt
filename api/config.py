import os

DEBUG_ANALYSIS = os.getenv("DEBUG_ANALYSIS", "false").lower() == "true"

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 Mo
ANALYSIS_TIMEOUT = 10             # secondes

# ── PDF ───────────────────────────────────────────────────────────────────────
PDF_MAGIC = b"%PDF"
ALLOWED_PDF_EXTENSIONS = {".pdf"}

# ── Images ────────────────────────────────────────────────────────────────────
IMAGE_MAGIC_JPEG = bytes([0xFF, 0xD8, 0xFF])
IMAGE_MAGIC_PNG  = bytes([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])
IMAGE_MAGIC_RIFF = b"RIFF"   # WebP commence par RIFF
IMAGE_MAGIC_WEBP = b"WEBP"   # WebP a WEBP à l'offset 8
IMAGE_MAGIC_GIF  = b"GIF8"   # GIF87a / GIF89a
IMAGE_MAGIC_ICO  = bytes([0x00, 0x00, 0x01, 0x00])
ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".ico"}

# ── Office (DOCX / XLSX / PPTX) ───────────────────────────────────────────────
OFFICE_MAGIC = bytes([0x50, 0x4B, 0x03, 0x04])  # PK\x03\x04 — ZIP local file header
ALLOWED_OFFICE_EXTENSIONS = {".docx", ".xlsx", ".pptx"}
