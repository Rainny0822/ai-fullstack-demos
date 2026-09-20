# LLM Chat Kit

Portfolio demo: a Next.js App Router + TypeScript chat UI with **mock streaming replies**. No API key required.

## Features

- Clean chat interface (user / assistant bubbles)
- Server-sent style streaming via a ReadableStream API route
- Mock mode by default — swap `/app/api/chat/route.ts` for a real LLM when ready

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Notes

This is a **personal portfolio / demo project**, not a client engagement. It shows UI patterns for streaming chat without depending on paid APIs.
