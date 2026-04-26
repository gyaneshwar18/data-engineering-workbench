from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import dashboard, sql_lab, metrics, pipelines
from app.database import engine
from app import models

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

app.include_router(dashboard.router)
app.include_router(sql_lab.router)
app.include_router(metrics.router)
app.include_router(pipelines.router)