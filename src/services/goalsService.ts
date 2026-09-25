import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Goal = Database['public']['Tables']['goals']['Row']
type GoalInsert = Database['public']['Tables']['goals']['Insert']
type GoalUpdate = Database['public']['Tables']['goals']['Update']

export const goalsService = {
  async getGoals(profileId: string): Promise<Goal[]> {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new Error(`Failed to fetch goals: ${error.message}`)
    return data || []
  },

  async getGoalById(id: string): Promise<Goal | null> {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch goal: ${error.message}`)
    return data || null
  },

  async createGoal(goal: GoalInsert): Promise<Goal> {
    const { data, error } = await supabase
      .from('goals')
      .insert([goal])
      .select()
      .single()

    if (error) throw new Error(`Failed to create goal: ${error.message}`)
    return data
  },

  async updateGoal(id: string, goal: GoalUpdate): Promise<Goal> {
    const { data, error } = await supabase
      .from('goals')
      .update(goal)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(`Failed to update goal: ${error.message}`)
    return data
  },

  async deleteGoal(id: string): Promise<void> {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id)

    if (error) throw new Error(`Failed to delete goal: ${error.message}`)
  },

  async getTotalTarget(profileId: string): Promise<number> {
    const { data, error } = await supabase
      .from('goals')
      .select('target_amount')

    if (error) throw new Error(`Failed to calculate total target: ${error.message}`)
    return (data || []).reduce((sum, g) => sum + (g.target_amount || 0), 0)
  },

  async getTotalSaved(profileId: string): Promise<number> {
    const { data, error } = await supabase
      .from('goals')
      .select('current_amount')

    if (error) throw new Error(`Failed to calculate total saved: ${error.message}`)
    return (data || []).reduce((sum, g) => sum + (g.current_amount || 0), 0)
  },

  async getOverallProgress(profileId: string): Promise<number> {
    const totalTarget = await this.getTotalTarget(profileId)
    const totalSaved = await this.getTotalSaved(profileId)
    return totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0
  },
}
