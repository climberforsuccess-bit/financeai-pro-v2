'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useDebts } from '@/hooks/useDebts'

export default function DebtsPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading, user } = useAuth()
  const { debts, loading, error } = useDebts(user?.id)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [authLoading, isAuthenticated, router])

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Cargando deudas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-600">Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Deudas</h1>
      {debts.length === 0 ? (
        <p className="text-gray-500">No tienes deudas registradas.</p>
      ) : (
        <div className="grid gap-4">
          {debts.map((debt) => (
            <div key={debt.id} className="border rounded-lg p-4">
              <h2 className="font-semibold">{debt.name}</h2>
              <p className="text-sm text-gray-600">
                Balance: {debt.current_balance} {debt.currency}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
