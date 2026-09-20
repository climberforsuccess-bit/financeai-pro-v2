import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from './useAuth'
import { Debt } from '@/types'

interface UseDebtsReturn {
  debts: Debt[]
  loading: boolean
  error: string | null
  addDebt: (debt: Omit<Debt, 'id' | 'created_at'>) => Promise<Debt | null>
  updateDebt: (id: string, updates: Partial<Debt>) => Promise<Debt | null>
  deleteDebt: (id: string) => Promise<boolean>
  refetch: () => Promise<void>
}

export function useDebts(): UseDebtsReturn {
  const { user, authenticated } = useAuth()
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDebts = async () => {
    if (!authenticated || !user) {
      setDebts([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('debts')
        .select('*')
        .eq('user_id', user.id)

      if (err) throw err
      setDebts((data as Debt[]) || [])
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setDebts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDebts()
  }, [authenticated, user])

  const addDebt = async (debt: Omit<Debt, 'id' | 'created_at'>): Promise<Debt | null> => {
    if (!user) {
      setError('User not authenticated')
      return null
    }

    try {
      const { data, error: err } = await supabase
        .from('debts')
        .insert([{ ...debt, user_id: user.id }])
        .select()
        .single()

      if (err) throw err
      setDebts([...debts, data as Debt])
      return data as Debt
    } catch (err: any) {
      setError(err.message)
      return null
    }
  }

  const updateDebt = async (id: string, updates: Partial<Debt>): Promise<Debt | null> => {
    try {
      const { data, error: err } = await supabase
        .from('debts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (err) throw err
      setDebts(debts.map((d) => (d.id === id ? (data as Debt) : d)))
      return data as Debt
    } catch (err: any) {
      setError(err.message)
      return null
    }
  }

  const deleteDebt = async (id: string): Promise<boolean> => {
    try {
      const { error: err } = await supabase
        .from('debts')
        .delete()
        .eq('id', id)

      if (err) throw err
      setDebts(debts.filter((d) => d.id !== id))
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    }
  }

  const refetch = fetchDebts

  return {
    debts,
    loading,
    error,
    addDebt,
    updateDebt,
    deleteDebt,
    refetch,
  }
}
