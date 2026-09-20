'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { CardsOverview } from '@/components/dashboard/CardsOverview'
import { DebtsOverview } from '@/components/dashboard/DebtsOverview'
import { TransactionsOverview } from '@/components/dashboard/TransactionsOverview'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400">Cargando...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <DashboardStats />
        <CardsOverview />
        <DebtsOverview />
        <TransactionsOverview />
      </div>
    </div>
  )
}
