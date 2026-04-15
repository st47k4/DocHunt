FROM python:3.13-slim

WORKDIR /app

# Dépendances système :
#   pikepdf          → libqpdf-dev
#   pdf2image        → poppler-utils (pdftoppm)
#   pytesseract      → tesseract-ocr + packs de langues
RUN apt-get update && apt-get install -y --no-install-recommends \
    libqpdf-dev \
    poppler-utils \
    tesseract-ocr \
    tesseract-ocr-fra \
    tesseract-ocr-eng \
    tesseract-ocr-deu \
    tesseract-ocr-spa \
    tesseract-ocr-por \
    tesseract-ocr-ara \
    tesseract-ocr-chi-sim \
    tesseract-ocr-jpn \
    tesseract-ocr-hin \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
# spaCy + modèle français moyen (fr_core_news_md ~43 MB, bon compromis précision/taille)
# Upgrade vers fr_core_news_lg (~588 MB) pour une meilleure précision sur les noms rares
RUN pip install --no-cache-dir -r requirements.txt && \
    python -m spacy download fr_core_news_md

COPY . .

# Utilisateur non-root pour l'isolation
RUN useradd -m -u 1001 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
