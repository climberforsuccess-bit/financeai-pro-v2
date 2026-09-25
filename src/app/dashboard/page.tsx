'use client'

import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import {
  DebtsCard,
  TransactionsCard,
  CardsOverview,
  SubscriptionsOverview,
  GoalsOverview,
} from '@/components/dashboard'

export default function DashboardPage() {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login')
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.user_metadata?.full_name || 'User'}
          </h1>
          <p className="mt-2 text-gray-600">
            Here's your financial overview
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DebtsCard />
          <TransactionsCard />
          <CardsOverview />
          <SubscriptionsOverview />
        </div>

        {/* Additional Section */}
        <GoalsOverview />
      </div>
    </div>
  )
}
