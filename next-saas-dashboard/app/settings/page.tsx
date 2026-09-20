"use client";

export default function SettingsPage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.35rem" }}>
        Settings
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
        Placeholder settings form for the portfolio demo
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "1.5rem",
          maxWidth: 480,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "0.9rem" }}>
          Workspace name
          <input
            defaultValue="Acme Workspace"
            style={{
              padding: "0.55rem 0.75rem",
              borderRadius: 8,
              border: "1px solid #d1d5db",
            }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "0.9rem" }}>
          Notification email
          <input
            defaultValue="you@example.com"
            type="email"
            style={{
              padding: "0.55rem 0.75rem",
              borderRadius: 8,
              border: "1px solid #d1d5db",
            }}
          />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem" }}>
          <input type="checkbox" defaultChecked />
          Email me weekly product digests
        </label>
        <button
          type="submit"
          style={{
            alignSelf: "flex-start",
            padding: "0.55rem 1.1rem",
            borderRadius: 8,
            border: "none",
            background: "#111827",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Save (demo)
        </button>
      </form>
    </div>
  );
}
