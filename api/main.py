from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.analyze import router as analyze_router

app = FastAPI(
    title="DocHunt API",
    description="Micro-service d'analyse de métadonnées de fichiers.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3333"],  # AdonisJS dev
    allow_methods=["POST"],
    allow_headers=["*"],
)

app.include_router(analyze_router)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
