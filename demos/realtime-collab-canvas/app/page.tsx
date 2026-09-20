'use client'

import { Canvas } from '@/components/Canvas'
import { Toolbar } from '@/components/Toolbar'
import { PresenceList } from '@/components/PresenceList'
import { Cursors } from '@/components/Cursors'

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 shadow-lg">
        <h1 className="text-2xl font-bold">Realtime Collab Canvas</h1>
        <p className="text-sm text-indigo-100">
          Collaborative whiteboard with live cursors and presence
        </p>
      </header>

      <Toolbar />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 relative">
          <Canvas />
          <Cursors />
        </main>
        <PresenceList />
      </div>
    </div>
  )
}
