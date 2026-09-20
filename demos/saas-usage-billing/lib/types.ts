import { z } from 'zod'

export const PlanTierSchema = z.enum(['free', 'starter', 'pro', 'enterprise'])
export type PlanTier = z.infer<typeof PlanTierSchema>

export const UserRoleSchema = z.enum(['owner', 'admin', 'member'])
export type UserRole = z.infer<typeof UserRoleSchema>

export interface Plan {
  id: string
  name: string
  tier: PlanTier
  price: number
  interval: 'month' | 'year'
  features: string[]
  limits: {
    apiCalls: number
    storage: number
    users: number
  }
}

export interface UsageMeter {
  id: string
  name: string
  current: number
  limit: number
  unit: string
  resetDate: string
}

export interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  items: InvoiceItem[]
  pdfUrl?: string
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Subscription {
  id: string
  planId: string
  status: 'active' | 'canceled' | 'past_due'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: UserRole
  joinedAt: string
}

export interface UsageDataPoint {
  date: string
  value: number
}
