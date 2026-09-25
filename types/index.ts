export interface Debt {
  id: string
  uid: string
  name: string
  total_amount: number
  current_balance: number
  interest_rate: number
  minimum_payment: number
  due_date: string | null
  debt_type: 'credit_card' | 'auto_loan' | 'mortgage' | 'personal_loan'
  created_at: string
  profile_id: string
  category: string
  property_value: number
  loan_term_months: number
  loan_start_date: string | null
  current_loan_month: number
  vehicle_value: number
  currency: string
  notes: string | null
  interest_accrued: number
  payment_frequency: string | null
  amount_paid: number
  remaining_amount: number
  principal: string | null
}

export interface Transaction {
  id: string
  profile_id: string
  description: string
  amount: number
  category: string
  type: 'income' | 'expense' | 'transfer'
  date: string
  currency: string
  payment_method?: string
  created_at: string
  updated_at?: string
}

export interface Card {
  id: string
  profile_id: string
  name: string
  balance: number
  limit_amount: number
  interest_rate: number
  due_date?: string
  currency: string
  status: 'active' | 'inactive' | 'closed'
  created_at: string
  updated_at?: string
}

export interface Profile {
  id: string
  user_id: string
  name: string
  email: string
  currency: string
  language: 'es' | 'en'
  created_at: string
  updated_at?: string
}

export interface User {
  id: string
  email: string
  created_at: string
}
