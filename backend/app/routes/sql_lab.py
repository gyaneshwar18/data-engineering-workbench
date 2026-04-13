import time
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db
from app.models import QueryHistory, SavedQuery
import pandas as pd
from sqlalchemy import text

router = APIRouter()


@router.post("/sql-lab/run")
def run_query(payload: dict, db: Session = Depends(get_db)):

    query = payload["query"].strip()

    if not query.lower().startswith("select"):
        raise HTTPException(status_code=400, detail="Only SELECT queries allowed")

    start_time = time.time()

    try:
        result = db.execute(text(query))

        rows = result.fetchall()
        columns = list(result.keys())   # ✅ FIXED

        data = [dict(zip(columns, row)) for row in rows]

        execution_time = time.time() - start_time

        history = QueryHistory(
            query=query,
            execution_time=execution_time,
            status="success"
        )

        db.add(history)
        db.commit()

        return {
            "columns": columns,
            "rows": data
        }

    except Exception as e:

        execution_time = time.time() - start_time

        history = QueryHistory(
            query=query,
            execution_time=execution_time,
            status="failed"
        )

        db.add(history)
        db.commit()

        raise HTTPException(status_code=400, detail=str(e))


@router.get("/sql-lab/history")
def get_query_history(db: Session = Depends(get_db)):

    history = db.query(QueryHistory)\
        .order_by(QueryHistory.created_at.desc())\
        .limit(20)\
        .all()

    return [
        {
            "id": h.id,
            "query": h.query,
            "execution_time": h.execution_time,
            "status": h.status,
            "created_at": h.created_at
        }
        for h in history
    ]


@router.post("/sql-lab/save")
def save_query(payload: dict, db: Session = Depends(get_db)):

    query = payload["query"]

    new_query = SavedQuery(query=query)

    db.add(new_query)
    db.commit()

    return {"message": "Query saved successfully"}

@router.get("/sql-lab/saved")
def get_saved_queries(db: Session = Depends(get_db)):

    queries = db.query(SavedQuery)\
        .order_by(SavedQuery.created_at.desc())\
        .all()

    return queries

@router.delete("/sql-lab/saved/{id}")
def delete_saved_query(id: int, db: Session = Depends(get_db)):

    query = db.query(SavedQuery).filter(SavedQuery.id == id).first()

    if not query:
        raise HTTPException(status_code=404, detail="Not found")

    db.delete(query)
    db.commit()

    return {"message": "Deleted"}

@router.put("/sql-lab/saved/{id}/pin")
def toggle_pin(id: int, db: Session = Depends(get_db)):

    query = db.query(SavedQuery).filter(SavedQuery.id == id).first()

    if not query:
        raise HTTPException(status_code=404, detail="Not found")

    query.is_pinned = not query.is_pinned
    db.commit()

    return {"message": "Updated"}

@router.post("/sql-lab/upload")
def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):

    try:
        # Read CSV
        df = pd.read_csv(file.file)

        # Clean table name
        table_name = file.filename.replace(".csv", "").lower()

        # Save to DB
        df.to_sql(table_name, db.bind, if_exists="replace", index=False)

        return {
            "message": f"Table '{table_name}' created successfully",
            "columns": list(df.columns)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sql-lab/tables")
def get_tables(db: Session = Depends(get_db)):

    tables = db.execute(text("""
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
    """)).fetchall()

    return [t[0] for t in tables]


@router.get("/sql-lab/table/{table_name}")
def get_table_data(table_name: str, db: Session = Depends(get_db)):

    try:
        result = db.execute(text(f"SELECT * FROM {table_name} LIMIT 10"))

        rows = result.fetchall()
        columns = list(result.keys())

        data = [dict(zip(columns, row)) for row in rows]

        return {
            "columns": columns,
            "rows": data
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))