'use client'

import { useBillingStore } from '@/lib/store'
import { UsageChart } from './UsageChart'

export function Usage() {
  const { usageMeters, currentPlan } = useBillingStore()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Usage Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {usageMeters.map((meter) => {
          const percentage = meter.limit > 0 ? (meter.current / meter.limit) * 100 : 0
          const isWarning = percentage > 75
          const isDanger = percentage > 90

          return (
            <div key={meter.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{meter.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">Resets: {meter.resetDate}</p>
                </div>
                {isDanger && <span className="text-xl">⚠️</span>}
              </div>

              <div className="text-3xl font-bold text-gray-900 mb-2">
                {meter.current.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                of {meter.limit.toLocaleString()} {meter.unit}
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full transition-all ${
                    isDanger ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>

              <div className="text-xs text-gray-600">
                {percentage.toFixed(1)}% used
                {isDanger && (
                  <span className="text-red-600 font-medium ml-2">
                    Consider upgrading
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <UsageChart />

      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Plan Limits</h2>
        {currentPlan && (
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">API Calls per Month</span>
              <span className="font-medium">
                {currentPlan.limits.apiCalls === -1
                  ? 'Unlimited'
                  : currentPlan.limits.apiCalls.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">Storage</span>
              <span className="font-medium">{currentPlan.limits.storage} GB</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Team Members</span>
              <span className="font-medium">
                {currentPlan.limits.users === -1 ? 'Unlimited' : currentPlan.limits.users}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
