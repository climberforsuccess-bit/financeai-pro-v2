'use client'

import { useDebts } from '@/hooks/useDebts'
import { formatCurrency } from '@/lib/utils'

export function DebtsCard() {
  const { debts, loading, error, totalDebt, averageInterestRate } = useDebts()

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

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Total Debt</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {formatCurrency(totalDebt)}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            {debts.length} debt{debts.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-600">Avg Interest Rate</p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {averageInterestRate.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  )
}
