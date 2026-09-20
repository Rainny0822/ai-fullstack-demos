import { NextRequest, NextResponse } from "next/server";
import { answerFromDocs, retrieve } from "@/lib/docs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const query = typeof body.query === "string" ? body.query.trim() : "";
  if (!query) {
    return NextResponse.json({ error: "query is required" }, { status: 400 });
  }

  const hits = retrieve(query, 2);
  const answer = answerFromDocs(query, hits);

  return NextResponse.json({
    query,
    answer,
    sources: hits.map(({ id, title, score }) => ({ id, title, score })),
  });
}
