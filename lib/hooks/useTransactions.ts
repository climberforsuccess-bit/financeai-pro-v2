'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Transaction {
  id: string
  profile_id: string
  amount: number
  type: 'income' | 'expense'
  category: string
  description: string
  date: string
  receipt_url?: string
  created_at: string
  updated_at: string
}

export function useTransactions(profileId?: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        // If no profileId provided, get from auth
        let id = profileId
        if (!id) {
          const { data: { user } } = await supabase.auth.getUser()
          if (!user) {
            setError('Not authenticated')
            setLoading(false)
            return
          }
          id = user.id
        }

        const { data, error: supabaseError } = await supabase
          .from('transactions')
          .select('*')
          .eq('profile_id', id)
          .order('date', { ascending: false })

        if (supabaseError) {
          throw supabaseError
        }

        setTransactions(data || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching transactions:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch transactions')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [profileId])

  return { transactions, loading, error }
}
