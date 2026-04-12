from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean
from .database import Base
from datetime import datetime


class QueryHistory(Base):
    __tablename__ = "query_history"

    id = Column(Integer, primary_key=True, index=True)
    query = Column(Text)
    execution_time = Column(Float)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class DashboardStats(Base):
    __tablename__ = "dashboard_stats"

    id = Column(Integer, primary_key=True, index=True)
    sql_queries = Column(Integer)
    datasets = Column(Integer)
    pipelines = Column(Integer)
    api_sources = Column(Integer)

class SavedQuery(Base):
    __tablename__ = "saved_queries"

    id = Column(Integer, primary_key=True, index=True)
    query = Column(Text)
    is_pinned = Column(Boolean, default=False)   # ⭐ NEW
    created_at = Column(DateTime, default=datetime.utcnow)

