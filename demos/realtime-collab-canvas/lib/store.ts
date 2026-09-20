import { create } from 'zustand'
import type { Shape, User, ConnectionStatus } from './types'

interface CollabStore {
  shapes: Shape[]
  users: Map<string, User>
  localUserId: string
  selectedTool: 'select' | 'rectangle' | 'circle' | 'line' | 'text'
  selectedColor: string
  connectionStatus: ConnectionStatus
  
  addShape: (shape: Shape) => void
  updateShape: (id: string, updates: Partial<Shape>) => void
  deleteShape: (id: string) => void
  
  updateUser: (userId: string, updates: Partial<User>) => void
  removeUser: (userId: string) => void
  
  setLocalUserId: (id: string) => void
  setSelectedTool: (tool: 'select' | 'rectangle' | 'circle' | 'line' | 'text') => void
  setSelectedColor: (color: string) => void
  setConnectionStatus: (status: ConnectionStatus) => void
  
  reset: () => void
}

const generateUserId = () => `user-${Math.random().toString(36).substring(2, 11)}`

export const useCollabStore = create<CollabStore>((set) => ({
  shapes: [],
  users: new Map(),
  localUserId: generateUserId(),
  selectedTool: 'rectangle',
  selectedColor: '#3b82f6',
  connectionStatus: 'connected',
  
  addShape: (shape) =>
    set((state) => ({ shapes: [...state.shapes, shape] })),
  
  updateShape: (id, updates) =>
    set((state) => ({
      shapes: state.shapes.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
  
  deleteShape: (id) =>
    set((state) => ({
      shapes: state.shapes.filter((s) => s.id !== id),
    })),
  
  updateUser: (userId, updates) =>
    set((state) => {
      const newUsers = new Map(state.users)
      const existingUser = newUsers.get(userId)
      if (existingUser) {
        newUsers.set(userId, { ...existingUser, ...updates })
      } else {
        newUsers.set(userId, {
          id: userId,
          name: `User ${userId.slice(-4)}`,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          cursor: null,
          lastSeen: Date.now(),
          ...updates,
        })
      }
      return { users: newUsers }
    }),
  
  removeUser: (userId) =>
    set((state) => {
      const newUsers = new Map(state.users)
      newUsers.delete(userId)
      return { users: newUsers }
    }),
  
  setLocalUserId: (id) => set({ localUserId: id }),
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  
  reset: () =>
    set({
      shapes: [],
      users: new Map(),
      selectedTool: 'rectangle',
      selectedColor: '#3b82f6',
    }),
}))
