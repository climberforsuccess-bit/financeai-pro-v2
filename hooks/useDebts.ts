'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Debt } from '@/types'

interface UseDebtsReturn {
  debts: Debt[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useDebts(profileId?: string): UseDebtsReturn {
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchDebts = async () => {
    if (!profileId) {
      setDebts([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('debts')
        .select('*')
        .eq('profile_id', profileId)

      if (fetchError) throw fetchError

      setDebts((data as Debt[]) || [])
      setError(null)
    } catch (err: any) {
      console.error('Error fetching debts:', err)
      setError(err)
      setDebts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDebts()
  }, [profileId])

  return {
    debts,
    loading,
    error,
    refetch: fetchDebts,
  }
}
