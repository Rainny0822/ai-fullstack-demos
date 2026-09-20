import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLM Chat Kit",
  description: "Portfolio demo — mock streaming chat UI (no API key required)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
