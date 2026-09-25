'use client'

import { useSubscriptions } from '@/hooks/useSubscriptions'
import { formatCurrency } from '@/lib/utils'

export function SubscriptionsOverview() {
  const { subscriptions, loading, error, monthlySpend, activeCount } = useSubscriptions()

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="h-24 bg-gray-100 animate-pulse rounded" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  const annualSpend = monthlySpend * 12

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">Subscriptions</h3>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Active</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {activeCount}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Monthly</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatCurrency(monthlySpend)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Annual</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatCurrency(annualSpend)}
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-500">
        {subscriptions.length} subscription{subscriptions.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
