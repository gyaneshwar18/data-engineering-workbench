from app.routes import sql_lab
from fastapi import FastAPI
from app.database import engine
from app import models
from app.routes import dashboard

# create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# include routes
app.include_router(dashboard.router)
app.include_router(sql_lab.router)