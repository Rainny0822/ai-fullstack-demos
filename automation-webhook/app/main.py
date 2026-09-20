"""
Automation / webhook starter (portfolio demo).

Mock-friendly FastAPI app with health check and an example event endpoint.
"""

from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(
    title="Automation Webhook Starter",
    description="Portfolio demo — FastAPI webhook/automation scaffold (mock mode)",
    version="0.1.0",
)

# In-memory event log for demo purposes
_events: list[dict[str, Any]] = []


class EventPayload(BaseModel):
    type: str = Field(..., examples=["invoice.paid", "user.created"])
    data: dict[str, Any] = Field(default_factory=dict)
    source: Optional[str] = Field(default="demo")


class EventResponse(BaseModel):
    ok: bool
    received_at: str
    event_id: int
    echo: EventPayload


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "automation-webhook"}


@app.post("/events", response_model=EventResponse)
def receive_event(
    payload: EventPayload,
    x_webhook_secret: Optional[str] = Header(default=None),
) -> EventResponse:
    """
    Example webhook endpoint.

    Optional header: X-Webhook-Secret. If WEBHOOK_SECRET env is unset,
    any secret (or none) is accepted — convenient for local demos.
    """
    import os

    expected = os.environ.get("WEBHOOK_SECRET")
    if expected and x_webhook_secret != expected:
        raise HTTPException(status_code=401, detail="Invalid webhook secret")

    event_id = len(_events) + 1
    received_at = datetime.now(timezone.utc).isoformat()
    record = {
        "id": event_id,
        "received_at": received_at,
        "payload": payload.model_dump(),
    }
    _events.append(record)

    # Hook point: enqueue job, call downstream automation, etc.
    return EventResponse(
        ok=True,
        received_at=received_at,
        event_id=event_id,
        echo=payload,
    )


@app.get("/events")
def list_events() -> dict[str, Any]:
    """List in-memory received events (demo only)."""
    return {"count": len(_events), "events": _events}
