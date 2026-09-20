# RAG Knowledge Base

A Next.js App Router + TypeScript demo showcasing Retrieval-Augmented Generation (RAG) with semantic search over a knowledge base.

## Features

- 🔍 **Semantic Search** — Mock keyword-based retrieval that simulates vector similarity search
- 📚 **Knowledge Base** — 12 sample documents covering development, AI/ML, security, and DevOps topics
- 🤖 **AI-Powered Answers** — Generates contextual answers using retrieved documents
- 📊 **Relevance Scoring** — Shows match percentages for retrieved sources
- 🎨 **Clean UI** — Polished interface with document browser and search results
- ⚡ **Mock Mode** — Fully functional without requiring vector databases or API keys

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How It Works

1. **Ask a Question** — Type your query in the search bar
2. **Mock Retrieval** — System finds relevant documents using keyword matching (simulates embeddings)
3. **View Answer** — AI generates a response based on retrieved documents
4. **Check Sources** — See which documents were used with relevance scores

## Sample Questions

Try asking:

- "What is RAG?"
- "How do I set up Next.js?"
- "Explain vector databases"
- "What are React Server Components?"
- "Best practices for TypeScript"
- "How does JWT authentication work?"

## Knowledge Base

The demo includes 12 documents across categories:
- **Development** — Next.js, TypeScript, React, API design
- **AI/ML** — RAG, vector databases, semantic search, prompt engineering
- **Database** — Schema design, normalization
- **Security** — JWT authentication
- **DevOps** — CI/CD pipelines

## Extending for Production

To build a real RAG system:

1. **Add Vector Database** — Replace keyword search with Pinecone, Weaviate, or Chroma
2. **Generate Embeddings** — Use OpenAI embeddings API or open-source models
3. **Connect LLM** — Replace mock answer generation with GPT-4, Claude, or Llama
4. **Document Ingestion** — Add API to upload and process new documents
5. **Chunk Strategy** — Implement smart text chunking for long documents
6. **Hybrid Search** — Combine vector search with keyword search for better results

## Architecture

```
User Query
    ↓
Mock Keyword Search (simulates vector similarity)
    ↓
Top 3 Retrieved Documents
    ↓
Answer Generation (template-based, simulates LLM)
    ↓
Response with Sources
```

## Stack

- Next.js 14 (App Router)
- TypeScript
- React Server Components
- API Routes for search logic
- Mock retrieval system (no external dependencies)
