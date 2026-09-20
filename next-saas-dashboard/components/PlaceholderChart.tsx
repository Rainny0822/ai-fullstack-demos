const bars = [40, 65, 45, 80, 55, 90, 70];

export function PlaceholderChart() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "1.25rem",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>
        Weekly activity (placeholder)
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 12,
          height: 160,
        }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: "linear-gradient(180deg, #3b82f6, #93c5fd)",
              borderRadius: "6px 6px 2px 2px",
            }}
            title={`Day ${i + 1}: ${h}`}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
          color: "#9ca3af",
          fontSize: "0.75rem",
        }}
      >
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d} style={{ flex: 1, textAlign: "center" }}>
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
