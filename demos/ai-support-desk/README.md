# AI Support Desk

A Next.js App Router + TypeScript demo showcasing AI-powered customer support ticket triage and automated response suggestions.

## Features

- 📬 **Ticket Management** — View and triage support tickets with priority levels
- 🎯 **Smart Categorization** — Automatic ticket classification (Authentication, Billing, Technical, etc.)
- 🤖 **AI Response Suggestions** — Mock AI-generated response templates based on ticket content
- 🎨 **Modern UI** — Polished dark theme with priority-based color coding
- ⚡ **Mock Mode** — Fully functional demo without requiring API keys

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How It Works

1. **Ticket List** (left panel) shows all support tickets with priority indicators
2. **Ticket Detail** (right panel) displays the full message and metadata
3. **AI Suggestion** automatically generates a response draft when you select a ticket

## Mock Data

The demo includes 6 sample tickets covering common support scenarios:
- Authentication issues
- Billing inquiries
- Feature requests
- Critical technical incidents
- General questions
- API/technical concerns

## Extending for Production

To connect real AI:

1. Replace `/app/api/suggest/route.ts` with OpenAI/Anthropic API calls
2. Add database integration for ticket persistence
3. Implement user authentication
4. Add ticket status management (open → in-progress → resolved)
5. Connect to email/webhook ingestion for new tickets

## Stack

- Next.js 14 (App Router)
- TypeScript
- React Server Components
- API Routes for backend logic
