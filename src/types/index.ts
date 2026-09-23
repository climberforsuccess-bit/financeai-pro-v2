export interface Profile {
  id: string
  email: string
  full_name: string
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

export interface Debt {
  id: string
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
  currency: string
  notes: string | null
  interest_accrued: number
  payment_frequency: string | null
  amount_paid: number
  remaining_amount: number | null
  principal: number | null
}

export interface Transaction {
  id: string
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
  currency: string
  payment_method: string | null
  notes: string | null
  is_recurring: boolean
  recurring_id: string | null
  recurring_frequency: string | null
  recurring_end_date: string | null
  split_id: string | null
}

export interface Card {
  id: string
  name: string
  last_four: string
  card_type: string
  balance: number
  limit_amount: number
  due_date: number | null
  color: string
  created_at: string
  apr: number
  owner_type: string
  bank: string | null
  profile_id: string | null
  utilization_ratio: number
  payment_status: string
  payment_method: string | null
}
