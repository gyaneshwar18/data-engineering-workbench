from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_query_stats():

    response = client.get("/metrics/query-stats")

    assert response.status_code == 200


def test_pipeline_analytics():

    response = client.get("/metrics/pipeline-analytics")

    assert response.status_code == 200