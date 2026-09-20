"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview" },
  { href: "/settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside
      style={{
        width: 220,
        background: "#111827",
        color: "#e5e7eb",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "1.25rem", paddingLeft: 8 }}>
        Acme SaaS
      </div>
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            style={{
              padding: "0.55rem 0.75rem",
              borderRadius: 8,
              background: active ? "#1f2937" : "transparent",
              color: active ? "#fff" : "#9ca3af",
              fontSize: "0.95rem",
            }}
          >
            {l.label}
          </Link>
        );
      })}
    </aside>
  );
}
