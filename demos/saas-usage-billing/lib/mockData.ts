import type { Plan, Invoice, UsageMeter, Subscription, TeamMember, UsageDataPoint } from './types'

export const plans: Plan[] = [
  {
    id: 'plan-free',
    name: 'Free',
    tier: 'free',
    price: 0,
    interval: 'month',
    features: ['1,000 API calls/month', '1 GB storage', '1 user'],
    limits: {
      apiCalls: 1000,
      storage: 1,
      users: 1,
    },
  },
  {
    id: 'plan-starter',
    name: 'Starter',
    tier: 'starter',
    price: 29,
    interval: 'month',
    features: ['50,000 API calls/month', '10 GB storage', '5 users', 'Email support'],
    limits: {
      apiCalls: 50000,
      storage: 10,
      users: 5,
    },
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    tier: 'pro',
    price: 99,
    interval: 'month',
    features: [
      '500,000 API calls/month',
      '100 GB storage',
      '25 users',
      'Priority support',
      'Advanced analytics',
    ],
    limits: {
      apiCalls: 500000,
      storage: 100,
      users: 25,
    },
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    tier: 'enterprise',
    price: 499,
    interval: 'month',
    features: [
      'Unlimited API calls',
      '1 TB storage',
      'Unlimited users',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
    limits: {
      apiCalls: -1,
      storage: 1000,
      users: -1,
    },
  },
]

export const mockSubscription: Subscription = {
  id: 'sub-123456',
  planId: 'plan-pro',
  status: 'active',
  currentPeriodStart: '2026-09-01',
  currentPeriodEnd: '2026-10-01',
  cancelAtPeriodEnd: false,
}

export const mockUsageMeters: UsageMeter[] = [
  {
    id: 'meter-api',
    name: 'API Calls',
    current: 347892,
    limit: 500000,
    unit: 'calls',
    resetDate: '2026-10-01',
  },
  {
    id: 'meter-storage',
    name: 'Storage',
    current: 67,
    limit: 100,
    unit: 'GB',
    resetDate: '2026-10-01',
  },
  {
    id: 'meter-users',
    name: 'Team Members',
    current: 12,
    limit: 25,
    unit: 'users',
    resetDate: 'N/A',
  },
]

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-2026-09',
    date: '2026-09-01',
    amount: 99.0,
    status: 'paid',
    items: [
      {
        description: 'Pro Plan - September 2026',
        quantity: 1,
        unitPrice: 99.0,
        total: 99.0,
      },
    ],
    pdfUrl: '#',
  },
  {
    id: 'inv-2026-08',
    date: '2026-08-01',
    amount: 99.0,
    status: 'paid',
    items: [
      {
        description: 'Pro Plan - August 2026',
        quantity: 1,
        unitPrice: 99.0,
        total: 99.0,
      },
    ],
    pdfUrl: '#',
  },
  {
    id: 'inv-2026-07',
    date: '2026-07-01',
    amount: 29.0,
    status: 'paid',
    items: [
      {
        description: 'Starter Plan - July 2026',
        quantity: 1,
        unitPrice: 29.0,
        total: 29.0,
      },
    ],
    pdfUrl: '#',
  },
]

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'owner',
    joinedAt: '2026-01-15',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    joinedAt: '2026-03-22',
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'member',
    joinedAt: '2026-05-10',
  },
]

export const mockUsageData: UsageDataPoint[] = [
  { date: '2026-09-01', value: 12450 },
  { date: '2026-09-03', value: 18230 },
  { date: '2026-09-05', value: 15670 },
  { date: '2026-09-07', value: 21340 },
  { date: '2026-09-09', value: 19580 },
  { date: '2026-09-11', value: 23120 },
  { date: '2026-09-13', value: 20890 },
  { date: '2026-09-15', value: 25670 },
  { date: '2026-09-17', value: 22340 },
  { date: '2026-09-19', value: 24560 },
]
