import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Realtime Collab Canvas',
  description: 'Collaborative whiteboard with live cursors and presence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
