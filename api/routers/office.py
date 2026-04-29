import asyncio
import io
import os
import time
import zipfile

from fastapi import APIRouter, File, HTTPException, UploadFile

from analyzers.office import OfficeAnalyzer
from logger import logger
from config import (
    ALLOWED_OFFICE_EXTENSIONS,
    ANALYSIS_TIMEOUT,
    MAX_FILE_SIZE,
    OFFICE_MAGIC,
)
from models.result import OfficeAnalysisResult

router = APIRouter(prefix="/analyze", tags=["office"])

_office_analyzer = OfficeAnalyzer()

_OFFICE_DIR_MARKERS = {
    ".docx": "word/",
    ".xlsx": "xl/",
    ".pptx": "ppt/",
}


def _validate_office(data: bytes, filename: str) -> None:
    if len(data) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail=f"Fichier trop volumineux. Maximum : {MAX_FILE_SIZE // (1024 * 1024)} Mo.",
        )
    if not data.startswith(OFFICE_MAGIC):
        raise HTTPException(
            status_code=415,
            detail="Le fichier n'est pas un document Office valide (magic bytes incorrects).",
        )
    ext = os.path.splitext(filename)[-1].lower()
    if ext not in ALLOWED_OFFICE_EXTENSIONS:
        allowed = ", ".join(sorted(ALLOWED_OFFICE_EXTENSIONS))
        raise HTTPException(
            status_code=415,
            detail=f"Extension non autorisée. Formats acceptés : {allowed}.",
        )
    marker = _OFFICE_DIR_MARKERS[ext]
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as zf:
            if not any(n.startswith(marker) for n in zf.namelist()):
                raise HTTPException(
                    status_code=415,
                    detail=f"Le fichier ZIP ne correspond pas au format {ext[1:].upper()} attendu.",
                )
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=415,
            detail="Impossible d'ouvrir ce fichier comme archive Office.",
        )


@router.post("/office", response_model=OfficeAnalysisResult)
async def analyze_office(file: UploadFile = File(...)) -> OfficeAnalysisResult:
    data = await file.read()
    filename = file.filename or "document.docx"

    logger.info("[OFFICE] Received filename=%s size=%d bytes", filename, len(data))

    _validate_office(data, filename)
    logger.debug("[OFFICE] Validation OK")

    t0 = time.perf_counter()
    try:
        result = await asyncio.wait_for(
            asyncio.to_thread(_office_analyzer.analyze, data, filename),
            timeout=ANALYSIS_TIMEOUT,
        )
    except asyncio.TimeoutError:
        logger.warning("[OFFICE] Analysis timed out after %ds for %s", ANALYSIS_TIMEOUT, filename)
        raise HTTPException(
            status_code=408,
            detail="L'analyse a dépassé le délai maximum autorisé.",
        )
    except Exception as e:
        logger.error("[OFFICE] Analysis failed for %s: %s", filename, e)
        raise HTTPException(
            status_code=422,
            detail=f"Impossible de lire ce fichier Office : {str(e)}",
        )

    elapsed = time.perf_counter() - t0
    logger.info(
        "[OFFICE] Done in %.3fs — score=%d fields=%d comments=%d tracked=%s",
        elapsed,
        result.risk_score,
        len(result.fields),
        len(result.comments),
        result.has_tracked_changes,
    )
    return result
