import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "SaaS Dashboard Demo",
  description: "Minimal Next.js SaaS dashboard portfolio demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <div style={{ flex: 1, padding: "1.5rem 2rem" }}>{children}</div>
        </div>
      </body>
    </html>
  );
}
