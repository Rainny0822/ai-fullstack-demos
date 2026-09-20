export interface User {
  id: string
  name: string
  color: string
  cursor: { x: number; y: number } | null
  lastSeen: number
}

export type ShapeType = 'rectangle' | 'circle' | 'line' | 'text'

export interface Shape {
  id: string
  type: ShapeType
  x: number
  y: number
  width?: number
  height?: number
  radius?: number
  endX?: number
  endY?: number
  text?: string
  color: string
  userId: string
  createdAt: number
}

export interface DrawingState {
  shapes: Shape[]
  users: Map<string, User>
  localUserId: string
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting'
