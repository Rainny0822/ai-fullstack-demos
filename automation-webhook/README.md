# Automation Webhook Starter

Portfolio demo: a minimal **Python FastAPI** webhook / automation starter.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Liveness check |
| POST | `/events` | Example event webhook |
| GET | `/events` | List in-memory events (demo) |

Optional header: `X-Webhook-Secret`. Set env `WEBHOOK_SECRET` to enforce it; unset = accept anything (local mock mode).

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

Open docs at [http://localhost:8000/docs](http://localhost:8000/docs).

### Example

```bash
curl -s http://localhost:8000/health
curl -s -X POST http://localhost:8000/events \
  -H 'Content-Type: application/json' \
  -d '{"type":"invoice.paid","data":{"amount":49},"source":"stripe-demo"}'
```

## Notes

This is a **personal portfolio starter**, not a paid client integration. Use it as a base for real webhook handlers and automation jobs.
