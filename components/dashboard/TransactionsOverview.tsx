'use client'

import { useRouter } from 'next/navigation'
import { useTransactions } from '@/hooks/useTransactions'

export function TransactionsOverview() {
  const router = useRouter()
  const { transactions, loading, error } = useTransactions()

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Cargando transacciones...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    )
  }

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const getTypeIcon = (type: string) => {
    return type === 'income' ? '↓' : '↑'
  }

  const getTypeColor = (type: string) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Transacciones Recientes</h2>
          <p className="text-gray-600 text-sm mt-1">Ingresos: ${totalIncome.toLocaleString('es-AR', { minimumFractionDigits: 2 })} | Gastos: ${totalExpenses.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/transactions')}
          className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
        >
          Ver todas →
        </button>
      </div>

      <div className="divide-y">
        {recentTransactions.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-600">No tienes transacciones registradas.</p>
          </div>
        ) : (
          recentTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className={`text-lg font-bold ${getTypeColor(transaction.type)}`}>
                  {getTypeIcon(transaction.type)}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {transaction.merchant || transaction.description}
                  </p>
                  <p className="text-sm text-gray-600">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getTypeColor(transaction.type)}`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  ${transaction.amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-600">
                  {new Date(transaction.date).toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
