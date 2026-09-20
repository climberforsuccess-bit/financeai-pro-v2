export interface User {
  id: string
  email: string
  created_at: string
}

export interface Card {
  id: string
  user_id: string
  name: string
  last_four: string
  card_type: 'credit' | 'debit'
  balance: number
  limit_amount: number
  due_date: number
  color: string
  created_at: string
  apr: number
  owner_type: 'personal' | 'shared'
  bank: string
  profile_id: string
  utilization_ratio: number // ✅ NUEVO
  payment_status: 'current' | 'late' | 'paid_off' // ✅ NUEVO
}

export interface Debt {
  id: string
  user_id: string
  name: string
  debt_type: 'credit_card' | 'personal_loan' | 'mortgage' | 'student_loan' | 'auto_loan' | 'other'
  total_amount: number
  current_balance: number
  interest_rate: number
  minimum_payment: number
  due_date: string
  category: string | null
  created_at: string
  profile_id: string
}

export interface Transaction {
  id: string
  user_id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  merchant: string | null
  status: 'completed' | 'pending' | 'reversed'
  tags: string[]
  created_at: string
  profile_id: string
}

export interface Goal {
  id: string
  user_id: string
  name: string
  target_amount: number
  current_amount: number
  deadline: string
  category: string
  created_at: string
  profile_id: string
}

export interface Subscription {
  id: string
  user_id: string
  name: string
  amount: number
  frequency: 'monthly' | 'yearly' | 'weekly'
  next_billing_date: string
  status: 'active' | 'cancelled' | 'paused'
  created_at: string
  profile_id: string
}

export interface Profile {
  id: string
  user_id: string
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  currency: 'ARS' | 'USD' | 'EUR' | 'BRL'
  language: 'es' | 'en' | 'pt'
  created_at: string
}
