'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Debt } from '@/types'

interface UseDebtsReturn {
  debts: Debt[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  addDebt: (debt: Omit<Debt, 'id' | 'created_at'>) => Promise<void>
  updateDebt: (id: string, debt: Partial<Debt>) => Promise<void>
  deleteDebt: (id: string) => Promise<void>
  getTotalDebt: () => number
  getTotalBalance: () => number
}

export function useDebts(profileId?: string): UseDebtsReturn {
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchDebts = useCallback(async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      // If no profileId provided, get from auth
      let id = profileId
      if (!id) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setDebts([])
          setLoading(false)
          return
        }
        id = user.id
      }

      const { data, error: fetchError } = await supabase
        .from('debts')
        .select('*')
        .eq('profile_id', id)
        .order('created_at', { ascending: false })

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
  }, [profileId])

  useEffect(() => {
    fetchDebts()
  }, [fetchDebts])

  const addDebt = async (debt: Omit<Debt, 'id' | 'created_at'>) => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error: insertError } = await supabase
        .from('debts')
        .insert([
          {
            ...debt,
            profile_id: user.id,
            uid: user.id,
            created_at: new Date().toISOString(),
          },
        ])

      if (insertError) throw insertError
      await fetchDebts()
    } catch (err: any) {
      console.error('Error adding debt:', err)
      throw err
    }
  }

  const updateDebt = async (id: string, debt: Partial<Debt>) => {
    try {
      const supabase = createClient()
      const { error: updateError } = await supabase
        .from('debts')
        .update(debt)
        .eq('id', id)

      if (updateError) throw updateError
      await fetchDebts()
    } catch (err: any) {
      console.error('Error updating debt:', err)
      throw err
    }
  }

  const deleteDebt = async (id: string) => {
    try {
      const supabase = createClient()
      const { error: deleteError } = await supabase
        .from('debts')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      await fetchDebts()
    } catch (err: any) {
      console.error('Error deleting debt:', err)
      throw err
    }
  }

  const getTotalDebt = (): number => {
    return debts.reduce((sum, debt) => sum + (debt.total_amount || 0), 0)
  }

  const getTotalBalance = (): number => {
    return debts.reduce((sum, debt) => sum + (debt.current_balance || 0), 0)
  }

  return {
    debts,
    loading,
    error,
    refetch: fetchDebts,
    addDebt,
    updateDebt,
    deleteDebt,
    getTotalDebt,
    getTotalBalance,
  }
}
