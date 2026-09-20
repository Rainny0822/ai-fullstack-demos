import { Chat } from "./chat";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
      }}
    >
      <header style={{ marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>LLM Chat Kit</h1>
        <p style={{ color: "#9aa0a6", fontSize: "0.9rem", marginTop: 4 }}>
          Portfolio demo — mock streaming replies (no API key)
        </p>
      </header>
      <Chat />
    </main>
  );
}
