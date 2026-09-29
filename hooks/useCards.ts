'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Card } from '@/types'

interface UseCardsReturn {
  cards: Card[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  addCard: (card: Omit<Card, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  updateCard: (id: string, card: Partial<Card>) => Promise<void>
  deleteCard: (id: string) => Promise<void>
  getTotalLimit: () => number
  getTotalBalance: () => number
}

export function useCards(profileId?: string): UseCardsReturn {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      // If no profileId provided, get from auth
      let id = profileId
      if (!id) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setCards([])
          setLoading(false)
          return
        }
        id = user.id
      }

      const { data, error: fetchError } = await supabase
        .from('cards')
        .select('*')
        .eq('profile_id', id)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setCards((data as Card[]) || [])
      setError(null)
    } catch (err: any) {
      console.error('Error fetching cards:', err)
      setError(err)
      setCards([])
    } finally {
      setLoading(false)
    }
  }, [profileId])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  const addCard = async (card: Omit<Card, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error: insertError } = await supabase
        .from('cards')
        .insert([
          {
            ...card,
            profile_id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])

      if (insertError) throw insertError
      await fetchCards()
    } catch (err: any) {
      console.error('Error adding card:', err)
      throw err
    }
  }

  const updateCard = async (id: string, card: Partial<Card>) => {
    try {
      const supabase = createClient()
      const { error: updateError } = await supabase
        .from('cards')
        .update({
          ...card,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (updateError) throw updateError
      await fetchCards()
    } catch (err: any) {
      console.error('Error updating card:', err)
      throw err
    }
  }

  const deleteCard = async (id: string) => {
    try {
      const supabase = createClient()
      const { error: deleteError } = await supabase
        .from('cards')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      await fetchCards()
    } catch (err: any) {
      console.error('Error deleting card:', err)
      throw err
    }
  }

  const getTotalLimit = (): number => {
    return cards.reduce((sum, card) => sum + (card.limit || 0), 0)
  }

  const getTotalBalance = (): number => {
    return cards.reduce((sum, card) => sum + (card.balance || 0), 0)
  }

  return {
    cards,
    loading,
    error,
    refetch: fetchCards,
    addCard,
    updateCard,
    deleteCard,
    getTotalLimit,
    getTotalBalance,
  }
}
