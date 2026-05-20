from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean
from app.database import Base
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
    is_pinned = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Pipeline(Base):
    __tablename__ = "pipelines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    source = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    status = Column(String, default="idle")
    last_run = Column(DateTime, default=None)
    file_path = Column(String, nullable=True)
    api_url = Column(String, nullable=True)
    logs = Column(Text, nullable=True)
    error = Column(Text, nullable=True)
    schedule_type = Column(String, nullable=True)
    is_active = Column(Boolean, default=False)
    last_scheduled_run = Column(DateTime, nullable=True)


class PipelineRun(Base):
    __tablename__ = "pipeline_runs"

    id = Column(Integer, primary_key=True, index=True)
    pipeline_id = Column(Integer)
    status = Column(String)
    started_at = Column(DateTime)
    finished_at = Column(DateTime)
    logs = Column(Text)
