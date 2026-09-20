import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAG Doc Q&A Demo",
  description: "Simple document Q&A with in-memory mock retrieval",
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
