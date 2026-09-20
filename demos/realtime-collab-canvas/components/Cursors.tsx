'use client'

import { useCollabStore } from '@/lib/store'

export function Cursors() {
  const { users, localUserId } = useCollabStore()

  const otherUsers = Array.from(users.values()).filter((u) => u.id !== localUserId && u.cursor)

  return (
    <>
      {otherUsers.map((user) => {
        if (!user.cursor) return null

        return (
          <div
            key={user.id}
            className="canvas-cursor"
            style={{
              left: user.cursor.x,
              top: user.cursor.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3L19 12L12 13L9 20L5 3Z"
                fill={user.color}
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
            <div
              className="absolute top-6 left-6 px-2 py-1 rounded text-xs text-white font-medium whitespace-nowrap shadow-lg"
              style={{ backgroundColor: user.color }}
            >
              {user.name}
            </div>
          </div>
        )
      })}
    </>
  )
}
