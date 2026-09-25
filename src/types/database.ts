// Auto-generated from Supabase schema
// All 9 tables with complete field definitions

export type Database = {
  public: {
    Tables: {
      cards: {
        Row: {
          id: string
          name: string
          last_four: string | null
          card_type: string | null
          balance: number | null
          limit_amount: number | null
          due_date: number | null
          color: string | null
          created_at: string | null
          apr: number | null
          owner_type: string
          bank: string | null
          profile_id: string | null
          utilization_ratio: number | null
          payment_status: string | null
          payment_method: string | null
        }
        Insert: {
          id?: string
          name: string
          last_four?: string | null
          card_type?: string | null
          balance?: number | null
          limit_amount?: number | null
          due_date?: number | null
          color?: string | null
          created_at?: string | null
          apr?: number | null
          owner_type?: string
          bank?: string | null
          profile_id?: string | null
          utilization_ratio?: number | null
          payment_status?: string | null
          payment_method?: string | null
        }
        Update: {
          id?: string
          name?: string
          last_four?: string | null
          card_type?: string | null
          balance?: number | null
          limit_amount?: number | null
          due_date?: number | null
          color?: string | null
          created_at?: string | null
          apr?: number | null
          owner_type?: string
          bank?: string | null
          profile_id?: string | null
          utilization_ratio?: number | null
          payment_status?: string | null
          payment_method?: string | null
        }
      }

      debts: {
        Row: {
          id: string
          name: string
          total_amount: number | null
          current_balance: number | null
          interest_rate: number | null
          minimum_payment: number | null
          due_date: number | null
          debt_type: string | null
          created_at: string | null
          profile_id: string | null
          category: string | null
          property_value: number | null
          loan_term_months: number | null
          loan_start_date: string | null
          current_loan_month: number | null
          vehicle_value: number | null
          currency: string | null
          notes: string | null
          interest_accrued: number | null
          payment_frequency: string | null
          amount_paid: number | null
          remaining_amount: number | null
          principal: number | null
        }
        Insert: {
          id?: string
          name: string
          total_amount?: number | null
          current_balance?: number | null
          interest_rate?: number | null
          minimum_payment?: number | null
          due_date?: number | null
          debt_type?: string | null
          created_at?: string | null
          profile_id?: string | null
          category?: string | null
          property_value?: number | null
          loan_term_months?: number | null
          loan_start_date?: string | null
          current_loan_month?: number | null
          vehicle_value?: number | null
          currency?: string | null
          notes?: string | null
          interest_accrued?: number | null
          payment_frequency?: string | null
          amount_paid?: number | null
          remaining_amount?: number | null
          principal?: number | null
        }
        Update: {
          id?: string
          name?: string
          total_amount?: number | null
          current_balance?: number | null
          interest_rate?: number | null
          minimum_payment?: number | null
          due_date?: number | null
          debt_type?: string | null
          created_at?: string | null
          profile_id?: string | null
          category?: string | null
          property_value?: number | null
          loan_term_months?: number | null
          loan_start_date?: string | null
          current_loan_month?: number | null
          vehicle_value?: number | null
          currency?: string | null
          notes?: string | null
          interest_accrued?: number | null
          payment_frequency?: string | null
          amount_paid?: number | null
          remaining_amount?: number | null
          principal?: number | null
        }
      }

      gift_codes: {
        Row: {
          id: string
          code: string
          plan: string | null
          billing: string | null
          created_for_email: string | null
          redeemed_by_email: string | null
          used: boolean | null
          created_at: string | null
          expires_at: string | null
          redeemed_at: string | null
          used_by: string | null
          used_at: string | null
          max_uses: number | null
          times_used: number | null
          currency: string | null
          discount_type: string | null
          discount_value: number | null
          created_by: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          code: string
          plan?: string | null
          billing?: string | null
          created_for_email?: string | null
          redeemed_by_email?: string | null
          used?: boolean | null
          created_at?: string | null
          expires_at?: string | null
          redeemed_at?: string | null
          used_by?: string | null
          used_at?: string | null
          max_uses?: number | null
          times_used?: number | null
          currency?: string | null
          discount_type?: string | null
          discount_value?: number | null
          created_by?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          code?: string
          plan?: string | null
          billing?: string | null
          created_for_email?: string | null
          redeemed_by_email?: string | null
          used?: boolean | null
          created_at?: string | null
          expires_at?: string | null
          redeemed_at?: string | null
          used_by?: string | null
          used_at?: string | null
          max_uses?: number | null
          times_used?: number | null
          currency?: string | null
          discount_type?: string | null
          discount_value?: number | null
          created_by?: string | null
          updated_at?: string | null
        }
      }

      goals: {
        Row: {
          id: string
          name: string
          target_amount: number
          current_amount: number
          deadline: string | null
          category: string | null
          status: string | null
          created_at: string | null
          updated_at: string | null
          currency: string | null
          is_recurring: boolean | null
          recurrence_frequency: string | null
        }
        Insert: {
          id?: string
          name: string
          target_amount: number
          current_amount: number
          deadline?: string | null
          category?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
          currency?: string | null
          is_recurring?: boolean | null
          recurrence_frequency?: string | null
        }
        Update: {
          id?: string
          name?: string
          target_amount?: number
          current_amount?: number
          deadline?: string | null
          category?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
          currency?: string | null
          is_recurring?: boolean | null
          recurrence_frequency?: string | null
        }
      }

      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          plan: string | null
          subscription_status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          billing_period: string | null
          trial_ends_at: string | null
          subscription_ends_at: string | null
          created_at: string | null
          updated_at: string | null
          ai_usage_count: number | null
          financial_score: number | null
          days_active: number | null
          total_saved: number | null
          retention_offer_used: boolean | null
          retention_reason: string | null
          retention_discount_id: string | null
          country: string | null
          currency: string | null
          display_name: string | null
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          plan?: string | null
          subscription_status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          billing_period?: string | null
          trial_ends_at?: string | null
          subscription_ends_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          ai_usage_count?: number | null
          financial_score?: number | null
          days_active?: number | null
          total_saved?: number | null
          retention_offer_used?: boolean | null
          retention_reason?: string | null
          retention_discount_id?: string | null
          country?: string | null
          currency?: string | null
          display_name?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          plan?: string | null
          subscription_status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          billing_period?: string | null
          trial_ends_at?: string | null
          subscription_ends_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          ai_usage_count?: number | null
          financial_score?: number | null
          days_active?: number | null
          total_saved?: number | null
          retention_offer_used?: boolean | null
          retention_reason?: string | null
          retention_discount_id?: string | null
          country?: string | null
          currency?: string | null
          display_name?: string | null
        }
      }

      retention_offers: {
        Row: {
          id: string
          reason: string
          offer_type: string
          offer_accepted: boolean | null
          discount_coupon: string | null
          ai_message: string | null
          created_at: string | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          reason: string
          offer_type: string
          offer_accepted?: boolean | null
          discount_coupon?: string | null
          ai_message?: string | null
          created_at?: string | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          reason?: string
          offer_type?: string
          offer_accepted?: boolean | null
          discount_coupon?: string | null
          ai_message?: string | null
          created_at?: string | null
          expires_at?: string | null
        }
      }

      scheduled_emails: {
        Row: {
          id: string
          email: string
          send_at: string
          type: string
          metadata: Record<string, any> | null
          sent: boolean | null
          sent_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          email: string
          send_at: string
          type: string
          metadata?: Record<string, any> | null
          sent?: boolean | null
          sent_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          send_at?: string
          type?: string
          metadata?: Record<string, any> | null
          sent?: boolean | null
          sent_at?: string | null
          created_at?: string | null
        }
      }

      subscriptions: {
        Row: {
          id: string
          name: string
          amount: number
          billing_cycle: string
          category: string
          next_billing_date: string
          status: string
          created_at: string | null
          profile_id: string | null
          card_id: string | null
          notify_days_before: number | null
          last_auto_charged: string | null
          currency: string
          payment: string | null
          payment_method: string
          notes: string | null
          auto_charge: boolean | null
          auto_charge_retry_count: number | null
          cancellation_reason: string | null
          billing_day: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          amount: number
          billing_cycle: string
          category: string
          next_billing_date: string
          status: string
          created_at?: string | null
          profile_id?: string | null
          card_id?: string | null
          notify_days_before?: number | null
          last_auto_charged?: string | null
          currency: string
          payment?: string | null
          payment_method: string
          notes?: string | null
          auto_charge?: boolean | null
          auto_charge_retry_count?: number | null
          cancellation_reason?: string | null
          billing_day?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          amount?: number
          billing_cycle?: string
          category?: string
          next_billing_date?: string
          status?: string
          created_at?: string | null
          profile_id?: string | null
          card_id?: string | null
          notify_days_before?: number | null
          last_auto_charged?: string | null
          currency?: string
          payment?: string | null
          payment_method?: string
          notes?: string | null
          auto_charge?: boolean | null
          auto_charge_retry_count?: number | null
          cancellation_reason?: string | null
          billing_day?: number | null
          updated_at?: string | null
        }
      }

      transactions: {
        Row: {
          id: string
          description: string
          amount: number
          type: string
          category: string
          expense_type: string | null
          date: string
          created_at: string | null
          profile_id: string | null
          card_id: string | null
          merchant: string | null
          tags: string[] | null
          receipt_id: string | null
          recurring: boolean | null
          status: string
          currency: string
          payment_method: string | null
          notes: string | null
          is_recurring: boolean | null
          recurring_id: string | null
          recurring_frequency: string | null
          recurring_end_date: string | null
          split_id: string | null
        }
        Insert: {
          id?: string
          description: string
          amount: number
          type: string
          category: string
          expense_type?: string | null
          date: string
          created_at?: string | null
          profile_id?: string | null
          card_id?: string | null
          merchant?: string | null
          tags?: string[] | null
          receipt_id?: string | null
          recurring?: boolean | null
          status: string
          currency: string
          payment_method?: string | null
          notes?: string | null
          is_recurring?: boolean | null
          recurring_id?: string | null
          recurring_frequency?: string | null
          recurring_end_date?: string | null
          split_id?: string | null
        }
        Update: {
          id?: string
          description?: string
          amount?: number
          type?: string
          category?: string
          expense_type?: string | null
          date?: string
          created_at?: string | null
          profile_id?: string | null
          card_id?: string | null
          merchant?: string | null
          tags?: string[] | null
          receipt_id?: string | null
          recurring?: boolean | null
          status?: string
          currency?: string
          payment_method?: string | null
          notes?: string | null
          is_recurring?: boolean | null
          recurring_id?: string | null
          recurring_frequency?: string | null
          recurring_end_date?: string | null
          split_id?: string | null
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
