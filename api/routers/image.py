import asyncio
import os

from fastapi import APIRouter, File, HTTPException, UploadFile

from analyzers.image import ImageAnalyzer
from config import (
    ALLOWED_IMAGE_EXTENSIONS,
    ANALYSIS_TIMEOUT,
    IMAGE_MAGIC_GIF,
    IMAGE_MAGIC_ICO,
    IMAGE_MAGIC_JPEG,
    IMAGE_MAGIC_PNG,
    IMAGE_MAGIC_RIFF,
    IMAGE_MAGIC_WEBP,
    MAX_FILE_SIZE,
)
from models.result import ImageAnalysisResult

router = APIRouter(prefix="/analyze", tags=["image"])

_image_analyzer = ImageAnalyzer()


def _validate_image(data: bytes, filename: str) -> None:
    """Valide la taille, l'extension et les magic bytes de l'image."""
    if len(data) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail=f"Fichier trop volumineux. Maximum : {MAX_FILE_SIZE // (1024 * 1024)} Mo.",
        )
    ext = os.path.splitext(filename)[-1].lower()
    if ext not in ALLOWED_IMAGE_EXTENSIONS:
        exts = ", ".join(sorted(ALLOWED_IMAGE_EXTENSIONS))
        raise HTTPException(
            status_code=415,
            detail=f"Extension non autorisée. Extensions acceptées : {exts}.",
        )
    is_jpeg = len(data) >= 3 and data[:3] == IMAGE_MAGIC_JPEG
    is_png  = len(data) >= 8 and data[:8] == IMAGE_MAGIC_PNG
    is_webp = len(data) >= 12 and data[:4] == IMAGE_MAGIC_RIFF and data[8:12] == IMAGE_MAGIC_WEBP
    is_gif  = len(data) >= 4 and data[:4] == IMAGE_MAGIC_GIF
    is_ico  = len(data) >= 4 and data[:4] == IMAGE_MAGIC_ICO

    if not (is_jpeg or is_png or is_webp or is_gif or is_ico):
        raise HTTPException(
            status_code=415,
            detail="Le fichier ne correspond à aucun format image valide (JPEG, PNG, WebP, GIF, ICO).",
        )


@router.post("/image", response_model=ImageAnalysisResult)
async def analyze_image(file: UploadFile = File(...)) -> ImageAnalysisResult:
    """
    Analyse les métadonnées EXIF d'une image.

    - Formats acceptés : JPEG, PNG, WebP, GIF, ICO
    - Validation magic bytes (pas uniquement l'extension)
    - Taille max : 20 Mo
    - Traitement en mémoire uniquement
    """
    data = await file.read()
    filename = file.filename or "image.jpg"

    _validate_image(data, filename)

    try:
        result = await asyncio.wait_for(
            asyncio.to_thread(_image_analyzer.analyze, data, filename),
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
            detail=f"Impossible d'analyser cette image : {str(e)}",
        )

    return result
