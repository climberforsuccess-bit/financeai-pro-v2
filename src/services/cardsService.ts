import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Card = Database['public']['Tables']['cards']['Row']
type CardInsert = Database['public']['Tables']['cards']['Insert']
type CardUpdate = Database['public']['Tables']['cards']['Update']

export const cardsService = {
  async getCards(profileId: string): Promise<Card[]> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(`Failed to fetch cards: ${error.message}`)
    return data || []
  },

  async getCardById(id: string): Promise<Card | null> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch card: ${error.message}`)
    return data || null
  },

  async createCard(card: CardInsert): Promise<Card> {
    const { data, error } = await supabase
      .from('cards')
      .insert([card])
      .select()
      .single()

    if (error) throw new Error(`Failed to create card: ${error.message}`)
    return data
  },

  async updateCard(id: string, card: CardUpdate): Promise<Card> {
    const { data, error } = await supabase
      .from('cards')
      .update(card)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(`Failed to update card: ${error.message}`)
    return data
  },

  async deleteCard(id: string): Promise<void> {
    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id)

    if (error) throw new Error(`Failed to delete card: ${error.message}`)
  },

  async getTotalBalance(profileId: string): Promise<number> {
    const { data, error } = await supabase
      .from('cards')
      .select('balance')
      .eq('profile_id', profileId)

    if (error) throw new Error(`Failed to calculate total balance: ${error.message}`)
    return (data || []).reduce((sum, c) => sum + (c.balance || 0), 0)
  },

  async getTotalLimit(profileId: string): Promise<number> {
    const { data, error } = await supabase
      .from('cards')
      .select('limit_amount')
      .eq('profile_id', profileId)

    if (error) throw new Error(`Failed to calculate total limit: ${error.message}`)
    return (data || []).reduce((sum, c) => sum + (c.limit_amount || 0), 0)
  },

  async getUtilizationRatio(profileId: string): Promise<number> {
    const totalBalance = await this.getTotalBalance(profileId)
    const totalLimit = await this.getTotalLimit(profileId)
    return totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0
  },
}
