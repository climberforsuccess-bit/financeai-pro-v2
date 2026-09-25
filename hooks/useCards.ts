'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Card } from '@/types'

interface UseCardsReturn {
  cards: Card[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useCards(profileId?: string): UseCardsReturn {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCards = async () => {
    if (!profileId) {
      setCards([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('cards')
        .select('*')
        .eq('profile_id', profileId)

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
  }

  useEffect(() => {
    fetchCards()
  }, [profileId])

  return {
    cards,
    loading,
    error,
    refetch: fetchCards,
  }
}
