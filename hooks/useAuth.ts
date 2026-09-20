import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Profile } from '@/types'

interface UseAuthReturn {
  user: any | null
  profile: Profile | null
  loading: boolean
  error: string | null
  authenticated: boolean
  logout: () => Promise<void>
  refetch: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (err) throw err
      setProfile(data as Profile)
    } catch (err: any) {
      setError(err.message)
      setProfile(null)
    }
  }

  const refetch = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error: err } = await supabase.auth.getSession()
        if (err) throw err

        if (data.session?.user) {
          setUser(data.session.user)
          await fetchProfile(data.session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
      } catch (err: any) {
        setError(err.message)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
      }
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    try {
      const { error: err } = await supabase.auth.signOut()
      if (err) throw err
      setUser(null)
      setProfile(null)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return {
    user,
    profile,
    loading,
    error,
    authenticated: !!user,
    logout,
    refetch,
  }
}
