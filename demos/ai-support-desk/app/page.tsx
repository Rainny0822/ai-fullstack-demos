import { TicketList } from "./ticket-list";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
      }}
    >
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600 }}>AI Support Desk</h1>
        <p style={{ color: "#9aa0a6", fontSize: "0.95rem", marginTop: 6 }}>
          Portfolio demo — automatic ticket triage & AI-suggested responses (mock mode)
        </p>
      </header>
      <TicketList />
    </main>
  );
}
