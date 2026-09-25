'use client'

import { useAuth } from '@/hooks/useAuth'
import { useDebts } from '@/hooks/useDebts'
import { DashboardHeader } from '../components/DashboardHeader'

export default function DebtsPage() {
  const { user } = useAuth()
  const { debts, loading } = useDebts(user?.id)

  if (loading) {
    return <div className="p-4">Cargando deudas...</div>
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      <div className="px-6">
        <h2 className="text-xl font-semibold mb-4">Mis Deudas</h2>
        
        {debts.length === 0 ? (
          <div className="text-gray-500">No hay deudas registradas</div>
        ) : (
          <div className="space-y-4">
            {debts.map((debt) => (
              <div key={debt.id} className="bg-white p-4 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{debt.name}</h3>
                    <p className="text-sm text-gray-500">{debt.debt_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {debt.current_balance.toLocaleString(undefined, {
                        style: 'currency',
                        currency: debt.currency || 'USD',
                      })}
                    </p>
                    <p className="text-sm text-gray-500">{debt.interest_rate}% interés</p>
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
