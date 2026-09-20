'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useDebts } from '@/hooks/useDebts'

export default function DebtsPage() {
  const router = useRouter()
  const { authenticated, loading: authLoading } = useAuth()
  const { debts, loading, error } = useDebts()

  useEffect(() => {
    if (!authLoading && !authenticated) {
      router.push('/auth/login')
    }
  }, [authLoading, authenticated, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Cargando deudas...</p>
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

  const totalDebt = debts.reduce((sum, debt) => sum + debt.current_balance, 0)
  const sortedDebts = [...debts].sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Deudas</h1>
            <p className="text-gray-600 mt-2">Total: ${totalDebt.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ← Volver
          </button>
        </div>

        {/* Deudas List */}
        <div className="space-y-4">
          {debts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">No tienes deudas registradas.</p>
            </div>
          ) : (
            sortedDebts.map((debt) => (
              <div key={debt.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{debt.name}</h3>
                    <p className="text-sm text-gray-600">{debt.debt_type} • {debt.category || 'Sin categoría'}</p>
                  </div>
                  <span className="text-xl font-bold text-red-600">
                    ${debt.current_balance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Monto Total</p>
                    <p className="font-semibold text-gray-900">
                      ${debt.total_amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tasa de Interés</p>
                    <p className="font-semibold text-gray-900">{debt.interest_rate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pago Mínimo</p>
                    <p className="font-semibold text-gray-900">
                      ${debt.minimum_payment.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Vencimiento</p>
                    <p className="font-semibold text-gray-900">{new Date(debt.due_date).toLocaleDateString('es-AR')}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(((debt.total_amount - debt.current_balance) / debt.total_amount) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Pagado: {(((debt.total_amount - debt.current_balance) / debt.total_amount) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
