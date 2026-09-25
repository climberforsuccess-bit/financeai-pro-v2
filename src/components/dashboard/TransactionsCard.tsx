'use client'

import { useTransactions } from '@/hooks/useTransactions'
import { formatCurrency } from '@/lib/utils'

export function TransactionsCard() {
  const { transactions, loading, error, totalExpenses, totalIncome } = useTransactions()

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

  const balance = totalIncome - totalExpenses

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Income</p>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Expenses</p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Balance</p>
          <p className={`mt-2 text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(balance)}
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-500">
        {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
