import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from './useAuth'
import { Transaction } from '@/types'

interface UseTransactionsReturn {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  addTransaction: (tx: Omit<Transaction, 'id' | 'created_at'>) => Promise<Transaction | null>
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<Transaction | null>
  deleteTransaction: (id: string) => Promise<boolean>
  refetch: () => Promise<void>
}

export function useTransactions(): UseTransactionsReturn {
  const { user, authenticated } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = async () => {
    if (!authenticated || !user) {
      setTransactions([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })

      if (err) throw err
      setTransactions((data as Transaction[]) || [])
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [authenticated, user])

  const addTransaction = async (
    tx: Omit<Transaction, 'id' | 'created_at'>
  ): Promise<Transaction | null> => {
    if (!user) {
      setError('User not authenticated')
      return null
    }

    try {
      const { data, error: err } = await supabase
        .from('transactions')
        .insert([{ ...tx, user_id: user.id }])
        .select()
        .single()

      if (err) throw err
      setTransactions([data as Transaction, ...transactions])
      return data as Transaction
    } catch (err: any) {
      setError(err.message)
      return null
    }
  }

  const updateTransaction = async (
    id: string,
    updates: Partial<Transaction>
  ): Promise<Transaction | null> => {
    try {
      const { data, error: err } = await supabase
        .from('transactions')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (err) throw err
      setTransactions(transactions.map((t) => (t.id === id ? (data as Transaction) : t)))
      return data as Transaction
    } catch (err: any) {
      setError(err.message)
      return null
    }
  }

  const deleteTransaction = async (id: string): Promise<boolean> => {
    try {
      const { error: err } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)

      if (err) throw err
      setTransactions(transactions.filter((t) => t.id !== id))
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    }
  }

  const refetch = fetchTransactions

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refetch,
  }
}
