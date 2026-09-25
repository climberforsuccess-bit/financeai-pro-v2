'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Debt } from '@/types'

interface UseDebtsReturn {
  debts: Debt[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  addDebt: (debt: Omit<Debt, 'id' | 'created_at'>) => Promise<void>
  updateDebt: (id: string, debt: Partial<Debt>) => Promise<void>
  deleteDebt: (id: string) => Promise<void>
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
        .order('due_date', { ascending: true })

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

  const addDebt = async (debt: Omit<Debt, 'id' | 'created_at'>) => {
    if (!profileId) throw new Error('No profile ID')
    try {
      const { error: insertError } = await supabase
        .from('debts')
        .insert([
          {
            ...debt,
            profile_id: profileId,
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

  return {
    debts,
    loading,
    error,
    refetch: fetchDebts,
    addDebt,
    updateDebt,
    deleteDebt,
  }
}
