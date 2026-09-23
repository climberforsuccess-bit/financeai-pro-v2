'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { Transaction } from '@/types'

interface UseTransactionsReturn {
  transactions: Transaction[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useTransactions(): UseTransactionsReturn {
  const { user } = useUser()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTransactions = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: supabaseError } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
        .limit(100)

      if (supabaseError) throw supabaseError
      setTransactions((data as Transaction[]) || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [user?.id])

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
  }
}
