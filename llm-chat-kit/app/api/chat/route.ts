import { NextRequest } from "next/server";

const TEMPLATES = [
  (q: string) =>
    `Thanks for asking about "${q}". This is a mock streaming reply from LLM Chat Kit — useful for UI demos without an API key.`,
  (q: string) =>
    `You said: "${q}". In production you'd call an LLM here. For this portfolio demo we stream a canned answer token by token.`,
  (q: string) =>
    `Got it — "${q}". Mock mode is on by default. Swap the route handler for OpenAI/Anthropic when you're ready.`,
];

function buildReply(message: string): string {
  const pick = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  return pick(message.slice(0, 120));
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const message = typeof body.message === "string" ? body.message : "hello";
  const reply = buildReply(message);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = reply.split(/(\s+)/);
      for (const word of words) {
        controller.enqueue(encoder.encode(word));
        await new Promise((r) => setTimeout(r, 35 + Math.random() * 40));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
