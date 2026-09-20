'use client'

import { useTransactions } from '@/hooks/useTransactions'
import { Transaction } from '@/types'

export function TransactionsOverview() {
  const { transactions, loading, error } = useTransactions()

  if (loading) return <div className="text-gray-400">Cargando transacciones...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>
  if (!transactions.length) return <div className="text-gray-400">Sin transacciones</div>

  const recent = transactions.slice(0, 5)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Transacciones Recientes</h2>
      <div className="rounded-lg border border-gray-700 bg-gray-900 divide-y divide-gray-700">
        {recent.map((transaction: Transaction) => (
          <div key={transaction.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">{transaction.description}</p>
              <p className="text-sm text-gray-400">{transaction.category}</p>
            </div>
            <p
              className={`text-lg font-bold ${
                transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
