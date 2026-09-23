'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useTransactions } from '@/hooks/useTransactions'

export default function TransactionsPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const { transactions, loading, error } = useTransactions()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [authLoading, isAuthenticated, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Cargando transacciones...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-600">Error: {error.message}</p>
      </div>
    )
  }

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'income' ? '↓' : '↑'
  }

  const getTypeColor = (type: string) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transacciones</h1>
            <p className="text-gray-600 mt-2">Gestiona tu historial de movimientos</p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ← Volver
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">Ingresos</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ${totalIncome.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">Gastos</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              ${totalExpenses.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {transactions.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No tienes transacciones registradas.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Descripción</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Etiquetas</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700">Monto</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {sortedTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          <span className={`text-lg font-bold ${getTypeColor(transaction.type)} mr-2`}>
                            {getTypeIcon(transaction.type)}
                          </span>
                          {transaction.merchant || transaction.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{transaction.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(transaction.date).toLocaleDateString('es-AR')}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {transaction.tags && transaction.tags.length > 0 ? (
                            transaction.tags.map((tag: string, idx: number) => (
                              <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">Sin etiquetas</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-right">
                        <span className={getTypeColor(transaction.type)}>
                          {transaction.type === 'income' ? '+' : '-'}
                          ${transaction.amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
