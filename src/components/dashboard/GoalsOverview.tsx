'use client'

import { useGoals } from '@/hooks/useGoals'
import { formatCurrency } from '@/lib/utils'

export function GoalsOverview() {
  const { goals, loading, error, totalTarget, totalSaved, overallProgress } = useGoals()

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
      <h3 className="text-lg font-semibold text-gray-900">Goals</h3>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Target</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatCurrency(totalTarget)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Saved</p>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {formatCurrency(totalSaved)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Progress</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            {overallProgress.toFixed(1)}%
          </p>
        </div>
      </div>
      <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${Math.min(overallProgress, 100)}%` }}
        />
      </div>
      <p className="mt-4 text-xs text-gray-500">
        {goals.length} goal{goals.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
