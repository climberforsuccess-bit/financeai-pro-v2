'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useTransactions } from '@/hooks/useTransactions'

export default function TransactionsPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading, user } = useAuth()
  const { transactions, loading, error } = useTransactions(user?.id)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [authLoading, isAuthenticated, router])

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Cargando transacciones...</p>
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
      <h1 className="text-3xl font-bold mb-6">Transacciones</h1>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No tienes transacciones registradas.</p>
      ) : (
        <div className="grid gap-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="border rounded-lg p-4">
              <h2 className="font-semibold">{transaction.description}</h2>
              <p className="text-sm text-gray-600">
                {transaction.amount} {transaction.currency} - {transaction.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
