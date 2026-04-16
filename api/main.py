from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.pdf import router as pdf_router
from routers.image import router as image_router

app = FastAPI(
    title="DocHunt API",
    description="Micro-service d'analyse de métadonnées de fichiers.",
    version="2.0.0",
    docs_url="/docs",
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3333"],  # AdonisJS dev
    allow_methods=["POST"],
    allow_headers=["*"],
)

app.include_router(pdf_router)
app.include_router(image_router)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
