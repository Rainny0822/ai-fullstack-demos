"use client";

import { FormEvent, useEffect, useState } from "react";

type Document = {
  id: string;
  title: string;
  content: string;
  category: string;
  relevance?: number;
};

type SearchResult = {
  answer: string;
  sources: Document[];
  query: string;
};

export function SearchInterface() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data.documents || []))
      .catch(console.error);
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        answer: "Failed to perform search. Please try again.",
        sources: [],
        query: q,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minHeight: 0,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1rem",
          flex: 1,
          minHeight: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              gap: "0.75rem",
              padding: "1rem",
              border: "1px solid #2a2f3a",
              borderRadius: 12,
              background: "#161b22",
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question about the knowledge base…"
              disabled={loading}
              style={{
                flex: 1,
                padding: "0.7rem 1rem",
                borderRadius: 8,
                border: "1px solid #2a2f3a",
                background: "#0f1117",
                color: "#e8eaed",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              style={{
                padding: "0.7rem 1.5rem",
                borderRadius: 8,
                border: "none",
                background: loading ? "#374151" : "#3b82f6",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Searching…" : "Search"}
            </button>
          </form>

          {result && (
            <div
              style={{
                flex: 1,
                border: "1px solid #2a2f3a",
                borderRadius: 12,
                background: "#161b22",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "1rem 1.25rem",
                  borderBottom: "1px solid #2a2f3a",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>Answer</span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#9aa0a6",
                    fontWeight: 400,
                  }}
                >
                  for "{result.query}"
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "1.25rem",
                }}
              >
                <div
                  style={{
                    background: "#0f1117",
                    padding: "1rem",
                    borderRadius: 8,
                    lineHeight: 1.7,
                    fontSize: "0.95rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {result.answer}
                </div>

                {result.sources.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#9aa0a6",
                        marginBottom: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Sources ({result.sources.length})
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {result.sources.map((doc) => (
                        <div
                          key={doc.id}
                          style={{
                            background: "#0f1117",
                            padding: "0.85rem 1rem",
                            borderRadius: 8,
                            border: "1px solid #21262d",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginBottom: 6,
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.85rem",
                                fontWeight: 600,
                              }}
                            >
                              {doc.title}
                            </span>
                            {doc.relevance && (
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                  color: "#22c55e",
                                  background: "#22c55e22",
                                  padding: "0.15rem 0.5rem",
                                  borderRadius: 6,
                                }}
                              >
                                {(doc.relevance * 100).toFixed(0)}% match
                              </span>
                            )}
                            <span
                              style={{
                                fontSize: "0.7rem",
                                color: "#9aa0a6",
                                marginLeft: "auto",
                              }}
                            >
                              {doc.category}
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: "0.85rem",
                              color: "#9aa0a6",
                              lineHeight: 1.5,
                            }}
                          >
                            {doc.content.slice(0, 150)}
                            {doc.content.length > 150 ? "…" : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!result && !loading && (
            <div
              style={{
                flex: 1,
                border: "1px solid #2a2f3a",
                borderRadius: 12,
                background: "#161b22",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280",
              }}
            >
              Ask a question to see AI-powered answers with sources
            </div>
          )}
        </div>

        <div
          style={{
            border: "1px solid #2a2f3a",
            borderRadius: 12,
            background: "#161b22",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid #2a2f3a",
              fontWeight: 600,
            }}
          >
            Knowledge Base ({documents.length})
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0.75rem",
            }}
          >
            {documents.map((doc) => (
              <div
                key={doc.id}
                style={{
                  padding: "0.75rem",
                  marginBottom: "0.5rem",
                  borderRadius: 8,
                  background: "#0f1117",
                  border: "1px solid #21262d",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {doc.title}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#9aa0a6",
                  }}
                >
                  {doc.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
