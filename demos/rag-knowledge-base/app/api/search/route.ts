import { NextRequest, NextResponse } from "next/server";
import { mockSearch } from "@/lib/knowledge-base";

function generateAnswer(query: string, sources: any[]): string {
  if (sources.length === 0) {
    return `I couldn't find relevant information in the knowledge base to answer "${query}". Try rephrasing your question or asking about topics covered in the documentation.`;
  }

  const context = sources.map((s) => s.content).join("\n\n");
  const lowerQuery = query.toLowerCase();

  if (
    lowerQuery.includes("what is") ||
    lowerQuery.includes("what are") ||
    lowerQuery.includes("explain")
  ) {
    const mainSource = sources[0];
    return `Based on the knowledge base: ${mainSource.content.slice(0, 300)}${
      mainSource.content.length > 300 ? "…" : ""
    }\n\nThis information comes from "${
      mainSource.title
    }" and ${sources.length - 1} other related document${
      sources.length > 2 ? "s" : ""
    }.`;
  }

  if (lowerQuery.includes("how to") || lowerQuery.includes("how do")) {
    return `To ${query.replace(/^how (to|do i?)\s*/i, "")}, follow these recommendations from the knowledge base:\n\n${sources[0].content.slice(0, 250)}${
      sources[0].content.length > 250 ? "…" : ""
    }\n\nFor more details, see the documentation on "${sources[0].title}".`;
  }

  if (lowerQuery.includes("best practice") || lowerQuery.includes("should")) {
    return `According to the knowledge base, here are key best practices:\n\n${sources[0].content.slice(0, 250)}${
      sources[0].content.length > 250 ? "…" : ""
    }\n\nThese recommendations are from "${sources[0].title}" and related documentation.`;
  }

  return `Here's what the knowledge base says about your question:\n\n${sources[0].content.slice(0, 280)}${
    sources[0].content.length > 280 ? "…" : ""
  }\n\nI found ${sources.length} relevant document${
    sources.length > 1 ? "s" : ""
  } that may help answer your question.`;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const query = typeof body.query === "string" ? body.query : "";

  if (!query.trim()) {
    return NextResponse.json(
      { error: "Query is required" },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));

  const sources = mockSearch(query);
  const answer = generateAnswer(query, sources);

  const sourcesWithRelevance = sources.map((doc, idx) => ({
    ...doc,
    relevance: 0.95 - idx * 0.12,
  }));

  return NextResponse.json({
    query,
    answer,
    sources: sourcesWithRelevance,
  });
}
