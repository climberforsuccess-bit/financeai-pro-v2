'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/types'

interface UseProfileReturn {
  profile: Profile | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useProfile(): UseProfileReturn {
  const { user } = useUser()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProfile = async () => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: supabaseError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (supabaseError) throw supabaseError
      setProfile((data as Profile) || null)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [user?.id])

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
  }
}
