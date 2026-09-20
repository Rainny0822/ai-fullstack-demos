"use client";

import { useEffect, useState } from "react";

type Ticket = {
  id: string;
  user: string;
  subject: string;
  message: string;
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  status: "open" | "in-progress" | "resolved";
  timestamp: string;
};

export function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data.tickets || []))
      .catch(console.error);
  }, []);

  const selected = tickets.find((t) => t.id === selectedId);

  const loadSuggestion = async (ticketId: string) => {
    setLoading(true);
    setSuggestion("");
    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId }),
      });
      const data = await res.json();
      setSuggestion(data.suggestion || "No suggestion available.");
    } catch {
      setSuggestion("Failed to load suggestion.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSuggestion("");
    loadSuggestion(id);
  };

  const priorityColor = (p: string) => {
    switch (p) {
      case "urgent":
        return "#ef4444";
      case "high":
        return "#f97316";
      case "medium":
        return "#eab308";
      case "low":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        gap: "1rem",
        minHeight: 0,
      }}
    >
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
            padding: "0.9rem 1rem",
            borderBottom: "1px solid #2a2f3a",
            fontWeight: 600,
          }}
        >
          Tickets ({tickets.length})
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => handleSelect(ticket.id)}
              style={{
                padding: "0.85rem 1rem",
                borderBottom: "1px solid #21262d",
                cursor: "pointer",
                background:
                  selectedId === ticket.id ? "#21262d" : "transparent",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: priorityColor(ticket.priority),
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                  }}
                >
                  {ticket.priority}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginLeft: "auto",
                  }}
                >
                  {ticket.timestamp}
                </span>
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                {ticket.subject}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#9aa0a6",
                  marginTop: 4,
                }}
              >
                {ticket.user}
              </div>
            </div>
          ))}
        </div>
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
        {selected ? (
          <>
            <div
              style={{
                padding: "1rem 1.25rem",
                borderBottom: "1px solid #2a2f3a",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: priorityColor(selected.priority),
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    padding: "0.25rem 0.6rem",
                    borderRadius: 6,
                    background: `${priorityColor(selected.priority)}22`,
                  }}
                >
                  {selected.priority}
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#9aa0a6",
                    padding: "0.25rem 0.6rem",
                    borderRadius: 6,
                    background: "#21262d",
                  }}
                >
                  {selected.category}
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#9aa0a6",
                    marginLeft: "auto",
                  }}
                >
                  {selected.timestamp}
                </span>
              </div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                {selected.subject}
              </h2>
              <div style={{ fontSize: "0.85rem", color: "#9aa0a6", marginTop: 4 }}>
                From: {selected.user}
              </div>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#9aa0a6",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Message
                </div>
                <div
                  style={{
                    background: "#0f1117",
                    padding: "1rem",
                    borderRadius: 8,
                    lineHeight: 1.6,
                    fontSize: "0.95rem",
                  }}
                >
                  {selected.message}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#9aa0a6",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  AI Suggested Response
                </div>
                <div
                  style={{
                    background: "#0f1117",
                    padding: "1rem",
                    borderRadius: 8,
                    lineHeight: 1.6,
                    fontSize: "0.95rem",
                    minHeight: 100,
                    border: "1px solid #3b82f6",
                  }}
                >
                  {loading ? (
                    <span style={{ color: "#9aa0a6" }}>
                      Generating suggestion…
                    </span>
                  ) : (
                    suggestion || (
                      <span style={{ color: "#9aa0a6" }}>
                        Select a ticket to see AI-generated response
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
            }}
          >
            Select a ticket to view details
          </div>
        )}
      </div>
    </div>
  );
}
