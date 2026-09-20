'use client'

import { useFinancialDashboard } from '@/hooks/useFinancialDashboard'
import { redirect } from 'next/navigation'

export default function DebtsPage() {
  const { user, debts, loading } = useFinancialDashboard()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando deudas...</p>
      </div>
    )
  }

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Mis Deudas</h1>

      {debts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">No tienes deudas registradas</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {debts.map((debt) => (
            <div key={debt.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{debt.name}</h2>
                  <p className="text-gray-600 text-sm">{debt.debt_type}</p>
                </div>
                <span className="text-lg font-bold">${debt.current_balance?.toFixed(2) || '0.00'}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Tasa de Interés</p>
                  <p className="font-bold">{debt.interest_rate || 0}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Pago Mínimo</p>
                  <p className="font-bold">${debt.minimum_payment?.toFixed(2) || '0.00'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Monto Original</p>
                  <p className="font-bold">${debt.total_amount?.toFixed(2) || '0.00'}</p>
                </div>
              </div>

              {debt.due_date && (
                <p className="text-xs text-gray-500 mt-4">Vencimiento: {new Date(debt.due_date).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
