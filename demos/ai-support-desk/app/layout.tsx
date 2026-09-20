import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Support Desk",
  description: "Portfolio demo — AI-powered support ticket triage with mock responses",
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
