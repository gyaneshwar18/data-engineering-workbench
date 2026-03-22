from fastapi.middleware.cors import CORSMiddleware
from app.routes import sql_lab
from fastapi import FastAPI
from app.database import engine
from app import models
from app.routes import dashboard
from app.routes import metrics

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# create tables
models.Base.metadata.create_all(bind=engine)



# include routes
app.include_router(dashboard.router)
app.include_router(sql_lab.router)
app.include_router(metrics.router)