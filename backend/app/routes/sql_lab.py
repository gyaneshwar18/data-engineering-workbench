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
        columns = result.keys()

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