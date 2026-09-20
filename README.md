# AI Full-Stack Portfolio Demos

Nine production-quality portfolio demo projects showcasing AI, full-stack, and SaaS engineering skills. All demos built with strict TypeScript, modern UI/UX, and zero external dependencies for local development.

| Project | Stack | Path |
|---------|-------|------|
| LLM Chat Kit | Next.js / TS | `llm-chat-kit/` |
| Next SaaS Dashboard | Next.js / TS | `next-saas-dashboard/` |
| RAG Doc Q&A | Next.js / TS | `rag-doc-qa/` |
| Automation Webhook | Python FastAPI | `automation-webhook/` |
| AI Support Desk | Next.js / TS | `demos/ai-support-desk/` |
| RAG Knowledge Base | Next.js / TS | `demos/rag-knowledge-base/` |
| **Agent Workflow Studio** | **Next.js / TS / Zustand** | **`demos/agent-workflow-studio/`** |
| **Realtime Collab Canvas** | **Next.js / TS / Zustand** | **`demos/realtime-collab-canvas/`** |
| **SaaS Usage & Billing** | **Next.js / TS / Recharts** | **`demos/saas-usage-billing/`** |

See [INDEX.md](./INDEX.md) for detailed descriptions and skills.

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

## 5. AI Support Desk

```bash
cd demos/ai-support-desk
npm install
npm run dev
```

→ http://localhost:3000 — AI-powered support ticket triage with mock response suggestions.

---

## 6. RAG Knowledge Base

```bash
cd demos/rag-knowledge-base
npm install
npm run dev
```

→ http://localhost:3000 — semantic search & RAG over knowledge base (mock retrieval).

---

## 7. Agent Workflow Studio

```bash
cd demos/agent-workflow-studio
npm install
npm run dev
```

→ http://localhost:3000 — visual AI workflow builder with LLM, tool, condition, and webhook nodes. Drag-and-drop canvas with real-time execution traces.

---

## 8. Realtime Collab Canvas

```bash
cd demos/realtime-collab-canvas
npm install
npm run dev
```

→ http://localhost:3000 — collaborative whiteboard with live cursors, presence list, and drawing tools. In-memory mock WebSocket (no server required).

---

## 9. SaaS Usage & Billing

```bash
cd demos/saas-usage-billing
npm install
npm run dev
```

→ http://localhost:3000 — modern SaaS console with plans, usage meters, invoices, and team management. Role-aware UI with charts.

---

## Note on ports

Run one Next app at a time on port 3000, or pass `-p 3001` / `-p 3002` to `next dev` if you need several concurrently.
