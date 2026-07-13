from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import (
    dashboard,
    sql_lab,
    metrics,
    pipelines,
    datasets,
    github,
)
from app.database import engine
from app import models



app = FastAPI()

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.get("/")
def root():
    return {
        "message": "Data Engineering Workbench API",
        "status": "running"
    }


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://data-engineering-workbench.vercel.app"],
    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

app.include_router(dashboard.router)
app.include_router(sql_lab.router)
app.include_router(metrics.router)
app.include_router(pipelines.router)
app.include_router(datasets.router)
app.include_router(github.router)