'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { Debt } from '@/types'

interface UseDebtsReturn {
  debts: Debt[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useDebts(): UseDebtsReturn {
  const { user } = useUser()
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchDebts = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: supabaseError } = await supabase
        .from('debts')
        .select('*')
        .order('due_date', { ascending: true })

      if (supabaseError) throw supabaseError
      setDebts((data as Debt[]) || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDebts()
  }, [user?.id])

  return {
    debts,
    loading,
    error,
    refetch: fetchDebts,
  }
}
