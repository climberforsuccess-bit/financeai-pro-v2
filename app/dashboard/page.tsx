'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useTransactions } from '@/hooks/useTransactions'
import { useDebts } from '@/hooks/useDebts'

export default function DashboardPage() {
  const { user, loading, logout, isClient } = useAuth()
  const router = useRouter()
  const { transactions } = useTransactions(user?.id)
  const { debts } = useDebts(user?.id)

  useEffect(() => {
    if (!isClient || loading) return
    if (!user) {
      router.push('/auth/login')
    }
  }, [isClient, loading, user, router])

  if (!isClient || loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Cargando...</p>
          <div className="animate-spin inline-block w-8 h-8 border-4 border-slate-700 border-t-cyan-400 rounded-full"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const totalIncome = transactions
    .filter((t: any) => t.type === 'income')
    .reduce((sum: number, t: any) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t: any) => t.type === 'expense')
    .reduce((sum: number, t: any) => sum + t.amount, 0)

  const totalDebt = debts.reduce((sum: number, d: any) => sum + d.balance, 0)

  const recentTransactions = transactions.slice(0, 5)

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-4 flex items-center">
          <Link href="/dashboard/transactions" className="text-slate-400 hover:text-white">
            Transacciones
          </Link>
          <Link href="/dashboard/debts" className="text-slate-400 hover:text-white">
            Deudas
          </Link>
          <Link href="/dashboard/scanner" className="text-slate-400 hover:text-white">
            Scanner
          </Link>
          <button 
            onClick={logout}
            className="text-slate-400 hover:text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-slate-400 mb-8">Bienvenido, {user.name || user.email}</p>
        
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <p className="text-slate-400 mb-2">Ingresos</p>
            <p className="text-3xl font-bold text-green-400">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <p className="text-slate-400 mb-2">Gastos</p>
            <p className="text-3xl font-bold text-red-400">${totalExpense.toFixed(2)}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <p className="text-slate-400 mb-2">Balance</p>
            <p className="text-3xl font-bold">${(totalIncome - totalExpense).toFixed(2)}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <p className="text-slate-400 mb-2">Deuda Total</p>
            <p className="text-3xl font-bold text-red-400">${totalDebt.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Transacciones Recientes</h2>
            <Link href="/dashboard/transactions" className="text-cyan-400 hover:text-cyan-300">
              Ver todas
            </Link>
          </div>
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((tx: any) => (
                <div key={tx.id} className="flex justify-between items-center pb-3 border-b border-slate-700 last:border-0">
                  <div>
                    <p className="font-semibold">{tx.description}</p>
                    <p className="text-sm text-slate-400">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                  <p className={tx.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No hay transacciones</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
