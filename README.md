# Contra Portfolio Demos

Four honest portfolio demo projects (not client work). Built locally for Contra uploads.

| Project | Stack | Path |
|---------|-------|------|
| LLM Chat Kit | Next.js / TS | `llm-chat-kit/` |
| Next SaaS Dashboard | Next.js / TS | `next-saas-dashboard/` |
| RAG Doc Q&A | Next.js / TS | `rag-doc-qa/` |
| Automation Webhook | Python FastAPI | `automation-webhook/` |

See [INDEX.md](./INDEX.md) for Contra titles, descriptions, and skills.

---

## 1. LLM Chat Kit

```bash
cd llm-chat-kit
npm install
npm run dev
```

→ http://localhost:3000 — mock streaming chat, no API key.

---

## 2. Next SaaS Dashboard

```bash
cd next-saas-dashboard
npm install
npm run dev
```

→ http://localhost:3000 — sidebar, metrics, chart placeholder, settings.

---

## 3. RAG Doc Q&A

```bash
cd rag-doc-qa
npm install
npm run dev
```

→ http://localhost:3000 — ask questions over sample docs (mock retrieval).

---

## 4. Automation Webhook

```bash
cd automation-webhook
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

→ http://localhost:8000/health and http://localhost:8000/docs

---

## Note on ports

Run one Next app at a time on port 3000, or pass `-p 3001` / `-p 3002` to `next dev` if you need several concurrently.
