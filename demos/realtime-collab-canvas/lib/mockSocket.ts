import type { User, Shape } from './types'

type EventCallback = (data: unknown) => void

export class MockSocket {
  private listeners: Map<string, EventCallback[]> = new Map()
  private connected = false
  private reconnectTimer: NodeJS.Timeout | null = null
  private userUpdateInterval: NodeJS.Timeout | null = null

  constructor() {
    this.connect()
  }

  connect() {
    setTimeout(() => {
      this.connected = true
      this.emit('connect', {})
      this.startMockUserUpdates()
    }, 500)
  }

  disconnect() {
    this.connected = false
    this.emit('disconnect', {})
    if (this.userUpdateInterval) {
      clearInterval(this.userUpdateInterval)
      this.userUpdateInterval = null
    }
  }

  on(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  off(event: string, callback: EventCallback) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  emit(event: string, data: unknown) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach((cb) => cb(data))
    }

    if (this.connected && event !== 'connect' && event !== 'disconnect') {
      setTimeout(() => {
        this.broadcastToOthers(event, data)
      }, Math.random() * 100 + 50)
    }
  }

  private broadcastToOthers(event: string, data: unknown) {
    if (event === 'cursor-move') {
      this.emit('cursor-update', data)
    } else if (event === 'shape-add') {
      this.emit('shape-added', data)
    } else if (event === 'shape-update') {
      this.emit('shape-updated', data)
    } else if (event === 'shape-delete') {
      this.emit('shape-deleted', data)
    }
  }

  private startMockUserUpdates() {
    const mockUsers = [
      { id: 'user-alice', name: 'Alice', color: '#ef4444' },
      { id: 'user-bob', name: 'Bob', color: '#10b981' },
    ]

    let currentUserIndex = 0

    this.userUpdateInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const user = mockUsers[currentUserIndex]
        const cursor = {
          x: Math.random() * 800 + 100,
          y: Math.random() * 500 + 100,
        }

        this.emit('cursor-update', {
          userId: user.id,
          name: user.name,
          color: user.color,
          cursor,
          lastSeen: Date.now(),
        })

        currentUserIndex = (currentUserIndex + 1) % mockUsers.length
      }
    }, 2000)
  }

  simulateReconnect() {
    this.disconnect()
    this.emit('reconnecting', {})

    this.reconnectTimer = setTimeout(() => {
      this.connect()
    }, 2000)
  }

  cleanup() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer)
    if (this.userUpdateInterval) clearInterval(this.userUpdateInterval)
    this.listeners.clear()
  }
}
