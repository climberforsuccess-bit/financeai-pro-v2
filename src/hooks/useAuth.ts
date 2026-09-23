'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useAuth() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [loading, setLoading] = useState(!isLoaded)

  useEffect(() => {
    setLoading(!isLoaded)
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [isLoaded, user, router])

  const logout = async () => {
    await signOut()
    router.push('/sign-in')
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
  }
}
