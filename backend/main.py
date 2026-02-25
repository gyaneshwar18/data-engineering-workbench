from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="DE Workbench API")

# Allow frontend (Vite) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "Backend running successfully"}

@app.get("/dashboard/stats")
def dashboard_stats():
    return {
        "sql_queries": 142,
        "datasets": 12,
        "pipelines": 5,
        "api_sources": 3
    }