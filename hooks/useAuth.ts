'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  error: Error | null
  signOut: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error: authError } = await supabase.auth.getUser()
        
        if (authError) {
          setUser(null)
        } else {
          setUser(data.user)
        }
        setError(null)
      } catch (err: any) {
        setError(err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (err: any) {
      setError(err)
    }
  }

  return {
    user,
    loading,
    error,
    signOut,
  }
}
