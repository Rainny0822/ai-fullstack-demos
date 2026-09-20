import { NextResponse } from "next/server";

const MOCK_TICKETS = [
  {
    id: "t1",
    user: "alice@example.com",
    subject: "Cannot login to account",
    message:
      "I've been trying to log in for the past hour but keep getting an 'invalid credentials' error. I'm sure my password is correct. Can you help?",
    priority: "high" as const,
    category: "Authentication",
    status: "open" as const,
    timestamp: "2 hours ago",
  },
  {
    id: "t2",
    user: "bob@example.com",
    subject: "Billing question about invoice #1234",
    message:
      "I received invoice #1234 yesterday, but the amount doesn't match what I expected. Could you review and explain the charges?",
    priority: "medium" as const,
    category: "Billing",
    status: "open" as const,
    timestamp: "4 hours ago",
  },
  {
    id: "t3",
    user: "charlie@example.com",
    subject: "Feature request: Dark mode",
    message:
      "Love the app! Would be great to have a dark mode option for late-night work sessions. Is this on the roadmap?",
    priority: "low" as const,
    category: "Feature Request",
    status: "open" as const,
    timestamp: "6 hours ago",
  },
  {
    id: "t4",
    user: "dana@example.com",
    subject: "Critical: Payment gateway down",
    message:
      "Our customers are reporting that payments are failing at checkout. This is causing significant revenue loss. Please investigate immediately!",
    priority: "urgent" as const,
    category: "Technical",
    status: "in-progress" as const,
    timestamp: "30 minutes ago",
  },
  {
    id: "t5",
    user: "eve@example.com",
    subject: "How do I export my data?",
    message:
      "I'd like to export all my project data to CSV. I've looked through the docs but can't find the export feature. Could you point me in the right direction?",
    priority: "medium" as const,
    category: "General",
    status: "open" as const,
    timestamp: "1 day ago",
  },
  {
    id: "t6",
    user: "frank@example.com",
    subject: "API rate limit concerns",
    message:
      "We're hitting rate limits on the API during peak hours. Is there a way to increase our quota or should we optimize our request patterns?",
    priority: "high" as const,
    category: "Technical",
    status: "open" as const,
    timestamp: "5 hours ago",
  },
];

export async function GET() {
  return NextResponse.json({ tickets: MOCK_TICKETS });
}
