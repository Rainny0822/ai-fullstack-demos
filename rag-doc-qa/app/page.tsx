"use client";

import { FormEvent, useState } from "react";
import { DOCS } from "@/lib/docs";

type AskResult = {
  answer: string;
  sources: { id: string; title: string; score: number }[];
};

export default function Home() {
  const [query, setQuery] = useState("How do webhooks work?");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AskResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onAsk(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult({ answer: data.answer, sources: data.sources });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.25rem" }}>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 700 }}>RAG Doc Q&A</h1>
      <p style={{ color: "#94a3b8", marginTop: 6, marginBottom: "1.5rem" }}>
        Ask questions over sample docs. Retrieval is in-memory keyword matching
        (mock RAG — no vector DB or API key).
      </p>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "0.95rem", color: "#94a3b8", marginBottom: 8 }}>
          Sample corpus ({DOCS.length} docs)
        </h2>
        <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8 }}>
          {DOCS.map((d) => (
            <li
              key={d.id}
              style={{
                background: "#1e293b",
                padding: "0.35rem 0.7rem",
                borderRadius: 999,
                fontSize: "0.8rem",
                border: "1px solid #334155",
              }}
            >
              {d.title}
            </li>
          ))}
        </ul>
      </section>

      <form onSubmit={onAsk} style={{ display: "flex", gap: 8, marginBottom: "1.25rem" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question…"
          style={{
            flex: 1,
            padding: "0.7rem 0.9rem",
            borderRadius: 8,
            border: "1px solid #334155",
            background: "#1e293b",
            color: "#e2e8f0",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          style={{
            padding: "0.7rem 1.2rem",
            borderRadius: 8,
            border: "none",
            background: loading ? "#475569" : "#38bdf8",
            color: "#0f172a",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "…" : "Ask"}
        </button>
      </form>

      {error && (
        <p style={{ color: "#f87171", marginBottom: "1rem" }}>{error}</p>
      )}

      {result && (
        <div
          style={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: 12,
            padding: "1.25rem",
          }}
        >
          <h2 style={{ fontSize: "1rem", marginBottom: 8 }}>Answer</h2>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
              lineHeight: 1.55,
              fontSize: "0.92rem",
              color: "#cbd5e1",
            }}
          >
            {result.answer}
          </pre>
          <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#94a3b8" }}>
            Retrieved:{" "}
            {result.sources.map((s) => `${s.title} (score ${s.score})`).join(" · ")}
          </div>
        </div>
      )}
    </main>
  );
}
