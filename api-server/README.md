# api-server

FastAPI backend for FlowDoc agent orchestration.

## Endpoints

- `GET /health`
- `POST /agent/upload-pdf`
- `POST /agent/command`
- `POST /agent/generate-image`
- `POST /agent/export`

## Run locally

```bash
cd api-server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
