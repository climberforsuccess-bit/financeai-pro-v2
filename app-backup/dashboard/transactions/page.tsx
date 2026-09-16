'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useTransactions } from '@/hooks/useTransactions'

export default function TransactionsPage() {
  const { user, loading, logout } = useAuth()
  const { transactions } = useTransactions(user?.id)

  if (loading) {
    return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Cargando...</div>
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Transacciones</h1>
          <div className="space-x-4">
            <Link href="/dashboard" className="text-slate-400 hover:text-white">Volver</Link>
            <button 
              onClick={logout}
              className="text-slate-400 hover:text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-bold mb-4">Historial de Transacciones</h2>
          <div className="space-y-3">
            {transactions.length > 0 ? (
              transactions.map((tx: any) => (
                <div key={tx.id} className="flex justify-between items-center pb-3 border-b border-slate-700 last:border-0">
                  <div>
                    <p className="font-semibold">{tx.description}</p>
                    <p className="text-sm text-slate-400">
                      {tx.category} • {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className={tx.type === 'income' ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
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
