'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { Card } from '@/types'

interface UseCardsReturn {
  cards: Card[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useCards(): UseCardsReturn {
  const { user } = useUser()
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCards = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: supabaseError } = await supabase
        .from('cards')
        .select('*')
        .order('created_at', { ascending: false })

      if (supabaseError) throw supabaseError
      setCards((data as Card[]) || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCards()
  }, [user?.id])

  return {
    cards,
    loading,
    error,
    refetch: fetchCards,
  }
}
