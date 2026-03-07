from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import dashboard

app = FastAPI(title="DE Workbench API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routes
app.include_router(dashboard.router)

@app.get("/")
def root():
    return {"status": "Backend running successfully"}