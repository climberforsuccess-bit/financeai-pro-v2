// User & Auth
export interface User {
  id: string
  email: string
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  plan: string
  subscription_status: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  billing_period: string
  trial_ends_at: string | null
  subscription_ends_at: string | null
  created_at: string
  updated_at: string
  ai_usage_count: number
  financial_score: number
  days_active: number
  total_saved: number
  retention_offer_used: boolean
  retention_reason: string | null
  retention_discount_id: string | null
  country: string
  currency: string
  display_name: string | null
}

// Debts
export interface Debt {
  id: string
  user_id: string
  name: string
  total_amount: number
  current_balance: number
  interest_rate: number
  minimum_payment: number
  due_date: string | null
  debt_type: string
  created_at: string
  profile_id: string | null
  category: string
  property_value: number
  loan_term_months: number
  loan_start_date: string | null
  current_loan_month: number
  vehicle_value: number
}

// Transactions
export interface Transaction {
  id: string
  user_id: string
  description: string
  amount: number
  type: string
  category: string
  expense_type: string
  date: string
  created_at: string
  profile_id: string | null
  card_id: string | null
  merchant: string | null
  tags: string[]
  receipt_id: string | null
  recurring: boolean
  status: string
}

// Cards
export interface Card {
  id: string
  user_id: string
  name: string
  card_type: string
  last_four: string
  balance: number
  limit: number
  created_at: string
}

// Goals
export interface Goal {
  id: string
  user_id: string
  name: string
  target_amount: number
  current_amount: number
  deadline: string
  category: string
  created_at: string
}

// Subscriptions
export interface Subscription {
  id: string
  user_id: string
  plan: string
  status: string
  started_at: string
  ends_at: string | null
}
