import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card } from '@/types'
import { useAuth } from './useAuth'

export function useCards() {
  const { user } = useAuth()
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchCards = async () => {
      try {
        const { data, error: err } = await supabase
          .from('cards')
          .select('*')
          .eq('user_id', user.id)

        if (err) throw err

        // ✅ CALCULAR utilization_ratio automáticamente
        const cardsWithRatio = (data || []).map((card: Card) => {
          const ratio =
            card.limit_amount > 0
              ? Math.round((card.balance / card.limit_amount) * 100)
              : 0

          return {
            ...card,
            utilization_ratio: Math.min(100, Math.max(0, ratio)),
          }
        })

        setCards(cardsWithRatio)
        setError(null)
      } catch (err) {
        console.error('Error fetching cards:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [user])

  return { cards, loading, error }
}
