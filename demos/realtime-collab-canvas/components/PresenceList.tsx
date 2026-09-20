'use client'

import { useEffect } from 'react'
import { useCollabStore } from '@/lib/store'
import { MockSocket } from '@/lib/mockSocket'
import type { User } from '@/lib/types'

let socket: MockSocket | null = null

export function PresenceList() {
  const { users, localUserId, updateUser, removeUser, connectionStatus, setConnectionStatus } =
    useCollabStore()

  useEffect(() => {
    socket = new MockSocket()

    socket.on('connect', () => {
      setConnectionStatus('connected')
    })

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected')
    })

    socket.on('reconnecting', () => {
      setConnectionStatus('reconnecting')
    })

    socket.on('cursor-update', (data) => {
      const user = data as User
      if (user.id !== localUserId) {
        updateUser(user.id, user)
      }
    })

    const inactivityCheck = setInterval(() => {
      const now = Date.now()
      users.forEach((user, userId) => {
        if (userId !== localUserId && now - user.lastSeen > 10000) {
          removeUser(userId)
        }
      })
    }, 5000)

    return () => {
      if (socket) {
        socket.cleanup()
        socket = null
      }
      clearInterval(inactivityCheck)
    }
  }, [localUserId, updateUser, removeUser, setConnectionStatus, users])

  const activeUsers = Array.from(users.values()).filter((u) => u.id !== localUserId)

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected'
                ? 'bg-green-500'
                : connectionStatus === 'reconnecting'
                ? 'bg-yellow-500 animate-pulse'
                : 'bg-red-500'
            }`}
          />
          <h3 className="font-bold text-sm">
            {connectionStatus === 'connected'
              ? 'Connected'
              : connectionStatus === 'reconnecting'
              ? 'Reconnecting...'
              : 'Disconnected'}
          </h3>
        </div>
      </div>

      <h3 className="font-bold mb-3">Active Users ({activeUsers.length + 1})</h3>

      <div className="space-y-2">
        <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            You
          </div>
          <span className="text-sm font-medium">You (local)</span>
        </div>

        {activeUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
              style={{ backgroundColor: user.color }}
            >
              {user.name.charAt(0)}
            </div>
            <span className="text-sm">{user.name}</span>
          </div>
        ))}
      </div>

      {activeUsers.length === 0 && (
        <div className="text-sm text-gray-500 mt-4 text-center">
          Waiting for other users...
        </div>
      )}
    </div>
  )
}
