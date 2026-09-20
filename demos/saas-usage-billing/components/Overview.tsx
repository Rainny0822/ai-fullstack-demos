'use client'

import { useEffect } from 'react'
import { useBillingStore } from '@/lib/store'
import { plans, mockSubscription, mockUsageMeters } from '@/lib/mockData'
import { UsageChart } from './UsageChart'

export function Overview() {
  const { currentPlan, subscription, usageMeters, setCurrentPlan, setSubscription, setUsageMeters } =
    useBillingStore()

  useEffect(() => {
    const plan = plans.find((p) => p.id === mockSubscription.planId)
    if (plan) setCurrentPlan(plan)
    setSubscription(mockSubscription)
    setUsageMeters(mockUsageMeters)
  }, [setCurrentPlan, setSubscription, setUsageMeters])

  if (!currentPlan || !subscription) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Current Plan</div>
          <div className="text-2xl font-bold text-gray-900">{currentPlan.name}</div>
          <div className="text-sm text-gray-500 mt-1">
            ${currentPlan.price}/{currentPlan.interval}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Billing Cycle</div>
          <div className="text-2xl font-bold text-gray-900">
            {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <div className="text-sm text-gray-500 mt-1">Next billing date</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Status</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-2xl font-bold text-gray-900 capitalize">
              {subscription.status}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Usage This Month</h2>
        <div className="space-y-4">
          {usageMeters.map((meter) => {
            const percentage = meter.limit > 0 ? (meter.current / meter.limit) * 100 : 0
            const isOverage = percentage > 90

            return (
              <div key={meter.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{meter.name}</span>
                  <span className="text-sm text-gray-600">
                    {meter.current.toLocaleString()} / {meter.limit.toLocaleString()} {meter.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isOverage ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                {isOverage && (
                  <div className="text-xs text-red-600 mt-1">
                    ⚠️ Approaching limit - consider upgrading
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <UsageChart />
    </div>
  )
}
