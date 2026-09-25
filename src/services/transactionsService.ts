import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Transaction = Database['public']['Tables']['transactions']['Row']
type TransactionInsert = Database['public']['Tables']['transactions']['Insert']
type TransactionUpdate = Database['public']['Tables']['transactions']['Update']

export const transactionsService = {
  async getTransactions(profileId: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', profileId)
      .order('date', { ascending: false })

    if (error) throw new Error(`Failed to fetch transactions: ${error.message}`)
    return data || []
  },

  async getTransactionById(id: string): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch transaction: ${error.message}`)
    return data || null
  },

  async createTransaction(transaction: TransactionInsert): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single()

    if (error) throw new Error(`Failed to create transaction: ${error.message}`)
    return data
  },

  async updateTransaction(id: string, transaction: TransactionUpdate): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .update(transaction)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(`Failed to update transaction: ${error.message}`)
    return data
  },

  async deleteTransaction(id: string): Promise<void> {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)

    if (error) throw new Error(`Failed to delete transaction: ${error.message}`)
  },

  async getTotalExpenses(profileId: string): Promise<number> {
    const { data, error } = await supabase
      .from('transactions')
      .select('amount')
      .eq('profile_id', profileId)
      .eq('type', 'expense')

    if (error) throw new Error(`Failed to calculate total expenses: ${error.message}`)
    return (data || []).reduce((sum, t) => sum + (t.amount || 0), 0)
  },

  async getTotalIncome(profileId: string): Promise<number> {
    const { data, error } = await supabase
      .from('transactions')
      .select('amount')
      .eq('profile_id', profileId)
      .eq('type', 'income')

    if (error) throw new Error(`Failed to calculate total income: ${error.message}`)
    return (data || []).reduce((sum, t) => sum + (t.amount || 0), 0)
  },

  async getTransactionsByCategory(profileId: string, category: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', profileId)
      .eq('category', category)
      .order('date', { ascending: false })

    if (error) throw new Error(`Failed to fetch transactions by category: ${error.message}`)
    return data || []
  },

  async getTransactionsByDateRange(profileId: string, startDate: string, endDate: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', profileId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false })

    if (error) throw new Error(`Failed to fetch transactions by date range: ${error.message}`)
    return data || []
  },
}
