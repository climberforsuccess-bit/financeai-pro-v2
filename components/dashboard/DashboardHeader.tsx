'use client'

import { useAuth } from '@/hooks/useAuth'

export function DashboardHeader() {
  const { user } = useAuth()

  return (
    <div className="border-b border-gray-700 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Bienvenido, {user?.email}</p>
      </div>
    </div>
  )
}
