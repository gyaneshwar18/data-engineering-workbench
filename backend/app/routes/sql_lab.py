import time
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db
from app.models import QueryHistory

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