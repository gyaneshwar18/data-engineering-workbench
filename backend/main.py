from app.routes import sql_lab
from fastapi import FastAPI
from app.database import engine
from app import models
from app.routes import dashboard
from app.routes import metrics

app = FastAPI()
# create tables
models.Base.metadata.create_all(bind=engine)



# include routes
app.include_router(dashboard.router)
app.include_router(sql_lab.router)
app.include_router(metrics.router)