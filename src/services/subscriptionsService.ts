import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Subscription = Database['public']['Tables']['subscriptions']['Row']
type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert']
type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update']

export const subscriptionsService = {
  async getSubscriptions(profileId: string): Promise<Subscription[]> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('profile_id', profileId)
      .order('next_billing_date', { ascending: true })

    if (error) throw new Error(`Failed to fetch subscriptions: ${error.message}`)
    return data || []
  },

  async getSubscriptionById(id: string): Promise<Subscription | null> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch subscription: ${error.message}`)
    return data || null
  },

  async createSubscription(subscription: SubscriptionInsert): Promise<Subscription> {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([subscription])
      .select()
      .single()

    if (error) throw new Error(`Failed to create subscription: ${error.message}`)
    return data
  },

  async updateSubscription(id: string, subscription: SubscriptionUpdate): Promise<Subscription> {
    const { data, error } = await supabase
      .from('subscriptions')
      .update(subscription)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(`Failed to update subscription: ${error.message}`)
    return data
  },

  async deleteSubscription(id: string): Promise<void> {
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id)

    if (error) throw new Error(`Failed to delete subscription: ${error.message}`)
  },

  async getMonthlySpend(profileId: string): Promise<number> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('amount')
      .eq('profile_id', profileId)
      .eq('status', 'active')

    if (error) throw new Error(`Failed to calculate monthly spend: ${error.message}`)
    return (data || []).reduce((sum, s) => sum + (s.amount || 0), 0)
  },

  async getActiveSubscriptions(profileId: string): Promise<Subscription[]> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('profile_id', profileId)
      .eq('status', 'active')

    if (error) throw new Error(`Failed to fetch active subscriptions: ${error.message}`)
    return data || []
  },

  async getActiveCount(profileId: string): Promise<number> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('id', { count: 'exact' })
      .eq('profile_id', profileId)
      .eq('status', 'active')

    if (error) throw new Error(`Failed to count active subscriptions: ${error.message}`)
    return data?.length || 0
  },
}
