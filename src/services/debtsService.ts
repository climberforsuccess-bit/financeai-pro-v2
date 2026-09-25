import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Debt = Database['public']['Tables']['debts']['Row']
type DebtInsert = Database['public']['Tables']['debts']['Insert']
type DebtUpdate = Database['public']['Tables']['debts']['Update']

export const debtsService = {
  async getDebts(profileId: string): Promise<Debt[]> {
    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(`Failed to fetch debts: ${error.message}`)
    return data || []
  },

  async getDebtById(id: string): Promise<Debt | null> {
    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch debt: ${error.message}`)
    return data || null
  },

  async createDebt(debt: DebtInsert): Promise<Debt> {
    const { data, error } = await supabase
      .from('debts')
      .insert([debt])
      .select()
      .single()

    if (error) throw new Error(`Failed to create debt: ${error.message}`)
    return data
  },

  async updateDebt(id: string, debt: DebtUpdate): Promise<Debt> {
    const { data, error } = await supabase
      .from('debts')
      .update(debt)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(`Failed to update debt: ${error.message}`)
    return data
  },

  async deleteDebt(id: string): Promise<void> {
    const { error } = await supabase
      .from('debts')
      .delete()
      .eq('id', id)

    if (error) throw new Error(`Failed to delete debt: ${error.message}`)
  },

  async calculateTotalDebt(profileId: string): Promise<number> {
    const { data, error } = await supabase
      .from('debts')
      .select('current_balance')
      .eq('profile_id', profileId)

    if (error) throw new Error(`Failed to calculate total debt: ${error.message}`)
    return (data || []).reduce((sum, d) => sum + (d.current_balance || 0), 0)
  },

  async calculateAverageInterestRate(profileId: string): Promise<number> {
    const { data, error } = await supabase
      .from('debts')
      .select('interest_rate')
      .eq('profile_id', profileId)

    if (error) throw new Error(`Failed to calculate average interest rate: ${error.message}`)
    const rates = (data || []).filter(d => d.interest_rate !== null)
    if (rates.length === 0) return 0
    return rates.reduce((sum, d) => sum + (d.interest_rate || 0), 0) / rates.length
  },
}
