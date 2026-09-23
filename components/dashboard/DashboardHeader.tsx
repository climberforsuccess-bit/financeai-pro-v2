'use client'

import { useProfile } from '@/hooks/useProfile'
import { useUser } from '@clerk/nextjs'

export function DashboardHeader() {
  const { user } = useUser()
  const { profile, loading } = useProfile()

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <p className="text-gray-600">Cargando...</p>
      </div>
    )
  }

  const displayName = profile?.display_name || profile?.full_name || user?.firstName || 'Usuario'
  const email = user?.emailAddresses?.[0]?.emailAddress || profile?.email || 'No disponible'

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow p-8 mb-8 text-white">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">Bienvenido, {displayName}</h1>
          <p className="text-blue-100 mt-2">{email}</p>
          {profile && (
            <p className="text-blue-100 mt-1">
              Plan: <span className="font-semibold capitalize">{profile.plan}</span>
            </p>
          )}
        </div>
        <div className="text-right">
          {profile && (
            <>
              <p className="text-blue-100 text-sm">Score Financiero</p>
              <p className="text-4xl font-bold">{profile.financial_score}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
