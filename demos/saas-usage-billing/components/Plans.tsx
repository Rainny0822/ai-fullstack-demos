'use client'

import { plans } from '@/lib/mockData'
import { useBillingStore } from '@/lib/store'

export function Plans() {
  const { currentPlan, userRole } = useBillingStore()
  const canManageBilling = userRole === 'owner' || userRole === 'admin'

  const handleUpgrade = (planId: string) => {
    if (!canManageBilling) {
      alert('Only owners and admins can change plans')
      return
    }
    alert(`Upgrade to ${plans.find((p) => p.id === planId)?.name} - Mock action`)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Plans & Pricing</h1>
      <p className="text-gray-600 mb-8">Choose the plan that fits your needs</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan?.id === plan.id

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-lg border-2 p-6 transition-all ${
                isCurrentPlan
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {isCurrentPlan && (
                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  Current Plan
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600">/{plan.interval}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={isCurrentPlan || !canManageBilling}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isCurrentPlan
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : canManageBilling
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isCurrentPlan ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          )
        })}
      </div>

      {!canManageBilling && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          ℹ️ Contact your account owner or admin to change plans
        </div>
      )}
    </div>
  )
}
