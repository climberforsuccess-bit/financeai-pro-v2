'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useTransactions } from '@/hooks/useTransactions'

export default function TransactionsPage() {
  const router = useRouter()
  const { authenticated, loading: authLoading } = useAuth()
  const { transactions, loading, error } = useTransactions()
  const [filterType, setFilterType] = useState<'all' | 'expense' | 'income'>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  useEffect(() => {
    if (!authLoading && !authenticated) {
      router.push('/auth/login')
    }
  }, [authLoading, authenticated, router])

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
        <p className="text-lg font-semibold text-red-600">Error: {error}</p>
      </div>
    )
  }

  // Filter transactions
  let filtered = transactions
  if (filterType !== 'all') {
    filtered = filtered.filter((t) => t.type === filterType)
  }
  if (filterCategory !== 'all') {
    filtered = filtered.filter((t) => t.category === filterCategory)
  }

  // Get unique categories
  const categories = Array.from(new Set(transactions.map((t) => t.category)))

  // Calculate totals
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transacciones</h1>
            <p className="text-gray-600 mt-2">{transactions.length} movimientos registrados</p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ← Volver
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-600">Gastos Totales</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              ${totalExpenses.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-600">Ingresos Totales</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ${totalIncome.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">Todos</option>
                <option value="expense">Gasto</option>
                <option value="income">Ingreso</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">Todas</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">No hay transacciones que coincidan con los filtros.</p>
            </div>
          ) : (
            filtered.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{transaction.description}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {transaction.category}
                      {transaction.merchant && ` • ${transaction.merchant}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(transaction.date).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-xl font-bold ${
                        transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {transaction.type === 'expense' ? '-' : '+'}$
                      {transaction.amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.status === 'completed'
                        ? 'Completado'
                        : transaction.status === 'pending'
                          ? 'Pendiente'
                          : 'Revertido'}
                    </span>
                  </div>
                </div>
                {transaction.tags && transaction.tags.length > 0 && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {transaction.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
