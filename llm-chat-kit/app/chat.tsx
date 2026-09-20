"use client";

import { FormEvent, useCallback, useRef, useState } from "react";

type Message = { id: string; role: "user" | "assistant"; content: string };

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm a mock assistant. Send a message and I'll stream a demo reply — no API key needed.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const send = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || streaming) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: text,
      };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setStreaming(true);

      const assistantId = `a-${Date.now()}`;
      setMessages((m) => [
        ...m,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        if (!res.ok || !res.body) throw new Error("Stream failed");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          const snapshot = acc;
          setMessages((m) =>
            m.map((msg) =>
              msg.id === assistantId ? { ...msg, content: snapshot } : msg
            )
          );
          scrollToBottom();
        }
      } catch {
        setMessages((m) =>
          m.map((msg) =>
            msg.id === assistantId
              ? {
                  ...msg,
                  content:
                    "Sorry — mock stream failed. Check that the API route is running.",
                }
              : msg
          )
        );
      } finally {
        setStreaming(false);
        scrollToBottom();
      }
    },
    [input, streaming]
  );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        border: "1px solid #2a2f3a",
        borderRadius: 12,
        overflow: "hidden",
        background: "#161b22",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              padding: "0.65rem 0.9rem",
              borderRadius: 12,
              background: msg.role === "user" ? "#3b82f6" : "#21262d",
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              fontSize: "0.95rem",
            }}
          >
            {msg.content || (streaming ? "…" : "")}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form
        onSubmit={send}
        style={{
          display: "flex",
          gap: 8,
          padding: "0.75rem",
          borderTop: "1px solid #2a2f3a",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          disabled={streaming}
          style={{
            flex: 1,
            padding: "0.65rem 0.85rem",
            borderRadius: 8,
            border: "1px solid #2a2f3a",
            background: "#0f1117",
            color: "#e8eaed",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          style={{
            padding: "0.65rem 1.1rem",
            borderRadius: 8,
            border: "none",
            background: streaming ? "#374151" : "#3b82f6",
            color: "#fff",
            fontWeight: 600,
            cursor: streaming ? "not-allowed" : "pointer",
          }}
        >
          {streaming ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}
