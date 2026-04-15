# OCR — Extraction de texte depuis les PDFs scannés
#
# Deux stratégies selon le type de PDF :
#
#   1. PDF avec couche texte OCR embarquée (invisible text layer)
#      → pdfplumber extrait directement le texte sans re-OCR
#
#   2. PDF scanné (images pures, aucun texte embarqué)
#      → pdf2image convertit chaque page en image
#      → pytesseract (Tesseract) fait la reconnaissance de caractères
#
# Langues Tesseract installées : fra, eng, deu, spa, por, ara, chi_sim, jpn, hin
#
# TODO : implémenter extract_text(data: bytes, lang: str) -> str
#        et détecter automatiquement si le PDF a déjà une couche texte
#        avant de lancer l'OCR complet (coûteux en CPU).
#
# Dépendances (déjà dans requirements.txt) :
#   - pdf2image
#   - pytesseract
#   - pdfplumber
#
# Dépendances système (déjà dans Dockerfile) :
#   - poppler-utils  (pour pdf2image / pdftoppm)
#   - tesseract-ocr  (moteur OCR)
#   - tesseract-ocr-{fra,eng,deu,spa,por,ara,chi_sim,jpn,hin}
