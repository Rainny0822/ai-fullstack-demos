import { create } from 'zustand'
import type { Plan, Subscription, Invoice, UsageMeter, UserRole, TeamMember } from './types'

interface BillingStore {
  currentPlan: Plan | null
  subscription: Subscription | null
  invoices: Invoice[]
  usageMeters: UsageMeter[]
  userRole: UserRole
  teamMembers: TeamMember[]
  
  setCurrentPlan: (plan: Plan) => void
  setSubscription: (subscription: Subscription) => void
  setInvoices: (invoices: Invoice[]) => void
  setUsageMeters: (meters: UsageMeter[]) => void
  setUserRole: (role: UserRole) => void
  updateUsageMeter: (id: string, current: number) => void
}

export const useBillingStore = create<BillingStore>((set) => ({
  currentPlan: null,
  subscription: null,
  invoices: [],
  usageMeters: [],
  userRole: 'owner',
  teamMembers: [],
  
  setCurrentPlan: (plan) => set({ currentPlan: plan }),
  setSubscription: (subscription) => set({ subscription }),
  setInvoices: (invoices) => set({ invoices }),
  setUsageMeters: (meters) => set({ usageMeters: meters }),
  setUserRole: (role) => set({ userRole: role }),
  
  updateUsageMeter: (id, current) =>
    set((state) => ({
      usageMeters: state.usageMeters.map((m) =>
        m.id === id ? { ...m, current } : m
      ),
    })),
}))
