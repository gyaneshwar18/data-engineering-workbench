from sqlalchemy import Column, Integer
from .database import Base


class DashboardStats(Base):
    __tablename__ = "dashboard_stats"

    id = Column(Integer, primary_key=True, index=True)
    sql_queries = Column(Integer)
    datasets = Column(Integer)
    pipelines = Column(Integer)
    api_sources = Column(Integer)