'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useDebts } from '@/hooks/useDebts'

export default function DebtsPage() {
  const { user, loading, logout } = useAuth()
  const { debts } = useDebts(user?.id)

  if (loading) {
    return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Cargando...</div>
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Deudas</h1>
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
        <div className="grid grid-cols-1 gap-6">
          {debts.length > 0 ? (
            debts.map((debt: any) => (
              <div key={debt.id} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold mb-4">{debt.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saldo:</span>
                    <span className="font-bold text-red-400">${debt.balance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Deuda Original:</span>
                    <span className="font-bold">${debt.principal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tasa de Interés:</span>
                    <span className="font-bold">{debt.interest_rate}% anual</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pago Mensual:</span>
                    <span className="font-bold">${debt.monthly_payment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Acreedor:</span>
                    <span className="font-bold">{debt.creditor}</span>
                  </div>
                </div>
                <button className="mt-4 bg-orange-500 hover:bg-orange-600 w-full py-2 rounded font-semibold">
                  Hacer Pago
                </button>
              </div>
            ))
          ) : (
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <p className="text-slate-400">No tienes deudas registradas</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
