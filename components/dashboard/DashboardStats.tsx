'use client'

import { useCards } from '@/hooks/useCards'
import { useDebts } from '@/hooks/useDebts'
import { useTransactions } from '@/hooks/useTransactions'

export function DashboardStats() {
  const { cards } = useCards()
  const { debts } = useDebts()
  const { transactions } = useTransactions()

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0)
  const totalDebt = debts.reduce((sum, debt) => sum + debt.current_balance, 0)
  const monthlyIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const monthlyExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <p className="text-sm text-gray-400">Balance Total</p>
        <p className="text-2xl font-bold text-green-400">${totalBalance.toFixed(2)}</p>
      </div>
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <p className="text-sm text-gray-400">Deuda Total</p>
        <p className="text-2xl font-bold text-red-400">${totalDebt.toFixed(2)}</p>
      </div>
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <p className="text-sm text-gray-400">Ingresos</p>
        <p className="text-2xl font-bold text-blue-400">${monthlyIncome.toFixed(2)}</p>
      </div>
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <p className="text-sm text-gray-400">Gastos</p>
        <p className="text-2xl font-bold text-yellow-400">${monthlyExpense.toFixed(2)}</p>
      </div>
    </div>
  )
}
