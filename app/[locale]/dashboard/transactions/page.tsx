'use client'

import { useAuth } from '@/hooks/useAuth'
import { useTransactions } from '@/hooks/useTransactions'
import { DashboardHeader } from '../components/DashboardHeader'

export default function TransactionsPage() {
  const { user } = useAuth()
  const { transactions, loading } = useTransactions(user?.id)

  if (loading) {
    return <div className="p-4">Cargando transacciones...</div>
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      <div className="px-6">
        <h2 className="text-xl font-semibold mb-4">Transacciones</h2>
        
        {transactions.length === 0 ? (
          <div className="text-gray-500">No hay transacciones registradas</div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-white p-4 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{transaction.description}</h3>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount.toLocaleString(undefined, {
                        style: 'currency',
                        currency: transaction.currency || 'USD',
                      })}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
