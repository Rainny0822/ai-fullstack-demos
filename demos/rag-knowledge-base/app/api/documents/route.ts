import { NextResponse } from "next/server";
import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";

export async function GET() {
  const documents = KNOWLEDGE_BASE.map(({ id, title, category }) => ({
    id,
    title,
    category,
  }));

  return NextResponse.json({ documents });
}
