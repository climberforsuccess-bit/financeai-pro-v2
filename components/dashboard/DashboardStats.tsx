'use client'

import { useCards } from '@/hooks/useCards'
import { useDebts } from '@/hooks/useDebts'
import { useTransactions } from '@/hooks/useTransactions'

export function DashboardStats() {
  const { cards, loading: cardsLoading } = useCards()
  const { debts, loading: debtsLoading } = useDebts()
  const { transactions, loading: transactionsLoading } = useTransactions()

  if (cardsLoading || debtsLoading || transactionsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Cargando...</p>
        </div>
      </div>
    )
  }

  const totalCardBalance = cards.reduce((sum, card) => sum + card.balance, 0)
  const totalDebt = debts.reduce((sum, debt) => sum + debt.current_balance, 0)
  const monthlyExpenses = transactions
    .filter(t => {
      const txDate = new Date(t.date)
      const now = new Date()
      return (
        t.type === 'expense' &&
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      )
    })
    .reduce((sum, t) => sum + t.amount, 0)

  const monthlyIncome = transactions
    .filter(t => {
      const txDate = new Date(t.date)
      const now = new Date()
      return (
        t.type === 'income' &&
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      )
    })
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 text-sm font-semibold">Saldo en Tarjetas</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">
          ${totalCardBalance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 text-sm font-semibold">Deuda Total</p>
        <p className="text-2xl font-bold text-red-600 mt-2">
          ${totalDebt.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 text-sm font-semibold">Gastos Este Mes</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">
          ${monthlyExpenses.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 text-sm font-semibold">Ingresos Este Mes</p>
        <p className="text-2xl font-bold text-green-600 mt-2">
          ${monthlyIncome.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  )
}
