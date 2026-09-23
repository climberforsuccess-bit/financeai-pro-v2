'use client'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { CardsOverview } from '@/components/dashboard/CardsOverview'
import { DebtsOverview } from '@/components/dashboard/DebtsOverview'
import { TransactionsOverview } from '@/components/dashboard/TransactionsOverview'
import { useAuth } from '@/hooks/useAuth'

export function DashboardClient() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <p className="text-gray-600">Cargando...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CardsOverview />
          </div>
          <div>
            <DebtsOverview />
          </div>
        </div>

        <div className="mt-8">
          <TransactionsOverview />
        </div>
      </div>
    </div>
  )
}
