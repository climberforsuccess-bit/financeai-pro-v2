'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Transaction } from '@/types'

interface UseTransactionsReturn {
  transactions: Transaction[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  addTransaction: (transaction: Omit<Transaction, 'id' | 'created_at'>) => Promise<void>
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  getByCategory: (category: string) => Transaction[]
  getByDateRange: (startDate: string, endDate: string) => Transaction[]
}

export function useTransactions(profileId?: string): UseTransactionsReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      // Get user if profileId not provided
      let id = profileId
      if (!id) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setTransactions([])
          setLoading(false)
          return
        }
        id = user.id
      }

      // Only fetch if we have a valid ID
      if (!id) {
        setTransactions([])
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .eq('profile_id', id)
        .order('date', { ascending: false })

      if (fetchError) throw fetchError

      setTransactions((data as Transaction[]) || [])
      setError(null)
    } catch (err: any) {
      console.error('Error fetching transactions:', err)
      setError(err)
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }, [profileId])

  useEffect(() => {
    // Only fetch if we have a profileId or it's explicitly undefined (meaning use auth)
    if (profileId || profileId === undefined) {
      fetchTransactions()
    }
  }, [fetchTransactions, profileId])

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error: insertError } = await supabase
        .from('transactions')
        .insert([
          {
            ...transaction,
            profile_id: user.id,
            created_at: new Date().toISOString(),
          },
        ])

      if (insertError) throw insertError
      await fetchTransactions()
    } catch (err: any) {
      console.error('Error adding transaction:', err)
      throw err
    }
  }

  const updateTransaction = async (id: string, transaction: Partial<Transaction>) => {
    try {
      const supabase = createClient()
      const { error: updateError } = await supabase
        .from('transactions')
        .update({
          ...transaction,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (updateError) throw updateError
      await fetchTransactions()
    } catch (err: any) {
      console.error('Error updating transaction:', err)
      throw err
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      const supabase = createClient()
      const { error: deleteError } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      await fetchTransactions()
    } catch (err: any) {
      console.error('Error deleting transaction:', err)
      throw err
    }
  }

  const getByCategory = (category: string): Transaction[] => {
    return transactions.filter((t) => t.category?.toLowerCase() === category.toLowerCase())
  }

  const getByDateRange = (startDate: string, endDate: string): Transaction[] => {
    return transactions.filter((t) => {
      const date = new Date(t.date)
      return date >= new Date(startDate) && date <= new Date(endDate)
    })
  }

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getByCategory,
    getByDateRange,
  }
}
