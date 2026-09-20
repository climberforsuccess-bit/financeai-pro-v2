'use client'

import { useDebts } from '@/hooks/useDebts'
import { Debt } from '@/types'

export function DebtsOverview() {
  const { debts, loading, error } = useDebts()

  if (loading) return <div className="text-gray-400">Cargando deudas...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>
  if (!debts.length) return <div className="text-gray-400">Sin deudas</div>

  const totalDebt = debts.reduce((sum, debt) => sum + debt.current_balance, 0)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Mis Deudas</h2>
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <p className="text-sm text-gray-400 mb-2">Total de deudas</p>
        <p className="text-3xl font-bold text-red-400">${totalDebt.toFixed(2)}</p>
      </div>
      <div className="space-y-2">
        {debts.map((debt: Debt) => (
          <div key={debt.id} className="rounded-lg border border-gray-700 bg-gray-900 p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-white">{debt.name}</p>
                <p className="text-sm text-gray-400">{debt.debt_type}</p>
              </div>
              <p className="text-lg font-bold text-red-400">${debt.current_balance.toFixed(2)}</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Tasa:</span>
                <p className="text-white">{debt.interest_rate}%</p>
              </div>
              <div>
                <span className="text-gray-400">Vencimiento:</span>
                <p className="text-white">{new Date(debt.due_date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
