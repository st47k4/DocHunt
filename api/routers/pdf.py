import asyncio
import os

from fastapi import APIRouter, File, HTTPException, UploadFile

from analyzers.pdf import PdfAnalyzer
from config import ANALYSIS_TIMEOUT, MAX_FILE_SIZE, PDF_MAGIC, ALLOWED_PDF_EXTENSIONS
from models.result import PdfAnalysisResult

router = APIRouter(prefix="/analyze", tags=["pdf"])

_pdf_analyzer = PdfAnalyzer()


def _validate_pdf(data: bytes, filename: str) -> None:
    """Valide la taille et les magic bytes du PDF."""
    if len(data) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail=f"Fichier trop volumineux. Maximum : {MAX_FILE_SIZE // (1024 * 1024)} Mo.",
        )
    if not data.startswith(PDF_MAGIC):
        raise HTTPException(
            status_code=415,
            detail="Le fichier n'est pas un PDF valide (magic bytes incorrects).",
        )
    ext = os.path.splitext(filename)[-1].lower()
    if ext not in ALLOWED_PDF_EXTENSIONS:
        raise HTTPException(
            status_code=415,
            detail="Extension non autorisée. Seuls les fichiers .pdf sont acceptés.",
        )


@router.post("/pdf", response_model=PdfAnalysisResult)
async def analyze_pdf(file: UploadFile = File(...)) -> PdfAnalysisResult:
    """
    Analyse les métadonnées d'un fichier PDF.

    - Validation MIME réelle (magic bytes, pas l'extension seule)
    - Taille max : 20 Mo
    - Timeout : 10 secondes
    - Traitement en mémoire uniquement, aucun fichier écrit sur disque
    """
    data = await file.read()
    filename = file.filename or "document.pdf"

    _validate_pdf(data, filename)

    try:
        result = await asyncio.wait_for(
            asyncio.to_thread(_pdf_analyzer.analyze, data, filename),
            timeout=ANALYSIS_TIMEOUT,
        )
    except asyncio.TimeoutError:
        raise HTTPException(
            status_code=408,
            detail="L'analyse a dépassé le délai maximum autorisé.",
        )
    except Exception as e:
        raise HTTPException(
            status_code=422,
            detail=f"Impossible de lire ce PDF : {str(e)}",
        )

    return result
