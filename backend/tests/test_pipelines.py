from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_pipelines():

    response = client.get("/pipelines")

    assert response.status_code == 200