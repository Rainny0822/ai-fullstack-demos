import { SearchInterface } from "./search-interface";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
      }}
    >
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600 }}>
          RAG Knowledge Base
        </h1>
        <p style={{ color: "#9aa0a6", fontSize: "0.95rem", marginTop: 6 }}>
          Portfolio demo — semantic search over documents with mock retrieval & AI answers
        </p>
      </header>
      <SearchInterface />
    </main>
  );
}
