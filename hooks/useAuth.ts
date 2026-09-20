'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types'

interface UseAuthReturn {
  user: User | null
  profile: Profile | null
  authenticated: boolean
  loading: boolean
  error: string | null
  logout: () => Promise<void>
  refetch: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const fetchUser = async () => {
    try {
      setLoading(true)
      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) throw userError

      if (!currentUser) {
        setUser(null)
        setProfile(null)
        setAuthenticated(false)
        setError(null)
        setLoading(false)
        return
      }

      setUser(currentUser)
      setAuthenticated(true)

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError
      }

      setProfile((profileData as Profile) || null)
      setError(null)
    } catch (err: any) {
      console.error('Auth error:', err)
      setError(err.message)
      setUser(null)
      setProfile(null)
      setAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
        setAuthenticated(false)
      } else if (session) {
        await fetchUser()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      setAuthenticated(false)
      router.push('/auth/login')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const refetch = fetchUser

  return {
    user,
    profile,
    authenticated,
    loading,
    error,
    logout,
    refetch,
  }
}
