'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from './useAuth'
import type { Transaction } from '@/types'

interface UseTransactionsReturn {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  addTransaction: (transaction: Omit<Transaction, 'id' | 'created_at'>) => Promise<void>
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  getByCategory: (category: string) => Transaction[]
  getByDateRange: (startDate: string, endDate: string) => Transaction[]
}

export function useTransactions(): UseTransactionsReturn {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = async () => {
    if (!user) {
      setTransactions([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })

      if (fetchError) throw fetchError

      setTransactions((data as Transaction[]) || [])
      setError(null)
    } catch (err: any) {
      console.error('Error fetching transactions:', err)
      setError(err.message)
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [user])

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
    try {
      const { error: insertError } = await supabase
        .from('transactions')
        .insert([
          {
            ...transaction,
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
      const { error: updateError } = await supabase
        .from('transactions')
        .update(transaction)
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
    return transactions.filter((t) => t.category.toLowerCase() === category.toLowerCase())
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
