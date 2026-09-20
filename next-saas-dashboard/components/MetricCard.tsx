export function MetricCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "1.1rem 1.25rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ color: "#6b7280", fontSize: "0.85rem" }}>{label}</div>
      <div style={{ fontSize: "1.6rem", fontWeight: 700, marginTop: 4 }}>{value}</div>
      <div style={{ color: "#059669", fontSize: "0.8rem", marginTop: 6 }}>{delta}</div>
    </div>
  );
}
