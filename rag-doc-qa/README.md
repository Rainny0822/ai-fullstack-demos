# RAG Doc Q&A

Portfolio demo: a simple Next.js document Q&A app with **in-memory mock retrieval** (keyword scoring). Sample docs are included under `data/` and mirrored in `lib/docs.ts`.

## Features

- Ask a question → retrieve top docs → generate a mock answer from context
- No embeddings, vector DB, or LLM API key required
- Easy to swap retrieval for real RAG later

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API

`POST /api/ask` with JSON `{ "query": "How do webhooks work?" }`.

## Notes

This is a **personal portfolio demo** illustrating RAG UI/flow patterns, not a production retrieval system or client project.
