import { MetricCard } from "@/components/MetricCard";
import { PlaceholderChart } from "@/components/PlaceholderChart";

export default function OverviewPage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.35rem" }}>
        Overview
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
        Minimal SaaS dashboard demo — sample metrics only
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <MetricCard label="MRR" value="$12.4k" delta="+8.2% vs last month" />
        <MetricCard label="Active users" value="1,842" delta="+124 this week" />
        <MetricCard label="Churn" value="2.1%" delta="-0.3% improved" />
        <MetricCard label="NPS" value="62" delta="+4 pts" />
      </div>
      <PlaceholderChart />
    </div>
  );
}
