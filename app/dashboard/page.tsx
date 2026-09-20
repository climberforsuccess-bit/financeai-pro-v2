'use client'

import { useFinancialDashboard } from '@/hooks/useFinancialDashboard'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  const { user, loading, summary, strategies } = useFinancialDashboard()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando dashboard...</p>
      </div>
    )
  }

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Financiero</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Deuda */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Deuda Total</p>
          <p className="text-2xl font-bold mt-2">${summary.totalDebt.toFixed(2)}</p>
        </div>

        {/* Interés Mensual */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Interés Mensual</p>
          <p className="text-2xl font-bold mt-2">${summary.monthlyInterest.toFixed(2)}</p>
        </div>

        {/* Balance */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Balance Mensual</p>
          <p className={`text-2xl font-bold mt-2 ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${summary.balance.toFixed(2)}
          </p>
        </div>

        {/* Tasa de Ahorro */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Tasa de Ahorro</p>
          <p className="text-2xl font-bold mt-2">{summary.savingsRate.toFixed(1)}%</p>
        </div>
      </div>

      {/* Estrategias de Pago */}
      {strategies && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Estrategias de Pago</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategies.all.map((strat) => (
              <div key={strat.strategy} className="border rounded p-4">
                <p className="font-semibold capitalize">{strat.strategy}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Meses: <span className="font-bold">{strat.totalMonths}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Interés Total: <span className="font-bold">${strat.totalInterestPaid.toFixed(2)}</span>
                </p>
                {strat.strategy === strategies.best.strategy && (
                  <p className="text-xs text-green-600 font-bold mt-2">✓ Mejor opción</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gastos por Categoría */}
      {Object.keys(summary.expensesByCategory).length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Gastos por Categoría</h2>
          <div className="space-y-3">
            {Object.entries(summary.expensesByCategory).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-700">{category}</span>
                <span className="font-bold">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
