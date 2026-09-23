'use client'

import { useRouter } from 'next/navigation'
import { useDebts } from '@/hooks/useDebts'

export function DebtsOverview() {
  const router = useRouter()
  const { debts, loading, error } = useDebts()

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Cargando deudas...</p>
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

  const totalDebt = debts.reduce((sum, debt) => sum + debt.current_balance, 0)
  const topDebts = debts.slice(0, 5).sort((a, b) => b.current_balance - a.current_balance)

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Deudas</h2>
          <p className="text-gray-600 text-sm mt-1">Total: ${totalDebt.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/debts')}
          className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
        >
          Ver todas →
        </button>
      </div>

      <div className="divide-y">
        {debts.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-600">No tienes deudas registradas.</p>
          </div>
        ) : (
          topDebts.map((debt) => (
            <div key={debt.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{debt.name}</h3>
                  <p className="text-sm text-gray-600">{debt.debt_type}</p>
                </div>
                <span className="font-bold text-red-600">
                  ${debt.current_balance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(((debt.total_amount - debt.current_balance) / debt.total_amount) * 100, 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {(((debt.total_amount - debt.current_balance) / debt.total_amount) * 100).toFixed(1)}% pagado
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
