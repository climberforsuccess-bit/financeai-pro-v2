const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'rqrpazkkwolxtpiqtdfu';
const SUPABASE_URL = 'https://rqrpazkkwolxtpiqtdfu.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTM3MjYsImV4cCI6MjA5NjM4OTcyNn0.InLqCdNMOesXm0_WQXypJBFt5bTJrodlfendlu_YT5Q';

async function generateTypes() {
  try {
    console.log('📡 Generating database types...');
    
    const typesDir = path.join(__dirname, '..', 'src', 'types');
    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir, { recursive: true });
    }

    const databaseTypes = `// Auto-generated Supabase types
// Generated from: ${new Date().toISOString()}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          uuid: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          plan: string;
          subscription_status: string;
          currency: string;
          country: string | null;
          created_at: string;
          updated_at: string;
          display_name: string | null;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      cards: {
        Row: {
          id: string;
          uuid: string;
          card_number: string;
          card_holder: string;
          expiry_date: string;
          cvv: string;
          is_primary: boolean;
          name: string | null;
          payment_method: string | null;
          currency: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['cards']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['cards']['Row']>;
      };
      transactions: {
        Row: {
          id: string;
          description: string;
          amount: number;
          type: string;
          category: string;
          expense_type: string | null;
          date: string;
          created_at: string;
          profile_id: string | null;
          card_id: string | null;
          merchant: string | null;
          tags: string[] | null;
          receipt_id: string | null;
          recurring: boolean | null;
          status: string;
          updated_at: string;
          currency: string;
          payment_method: string | null;
          notes: string | null;
          is_recurring: boolean;
          recurring_id: string | null;
          recurring_frequency: string | null;
          recurring_end_date: string | null;
          split_id: string | null;
        };
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['transactions']['Row']>;
      };
      subscriptions: {
        Row: {
          id: string;
          uuid: string;
          name: string;
          amount: number;
          billing_cycle: string;
          category: string;
          next_billing_date: string;
          status: string;
          created_at: string;
          profile_id: string | null;
          card_id: string | null;
          notify_days_before: number | null;
          last_auto_charged: string | null;
          currency: string;
          payment_method: string | null;
          notes: string | null;
          auto_charge: boolean;
          auto_charge_retry_count: number;
          cancellation_reason: string | null;
          billing_day: number | null;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['subscriptions']['Row']>;
      };
      debts: {
        Row: {
          id: string;
          uuid: string;
          description: string;
          amount: number;
          due_date: string;
          status: string;
          created_at: string;
          updated_at: string;
          currency: string;
          notes: string | null;
          interest_rate: number | null;
          interest_accrued: number;
          payment_frequency: string | null;
          amount_paid: number;
          remaining_amount: number | null;
          principal: number | null;
          name: string | null;
          total_amount: number | null;
        };
        Insert: Omit<Database['public']['Tables']['debts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['debts']['Row']>;
      };
      goals: {
        Row: {
          id: string;
          uuid: string;
          name: string;
          target_amount: number;
          current_amount: number;
          deadline: string;
          category: string;
          status: string;
          created_at: string;
          updated_at: string;
          currency: string;
          is_recurring: boolean;
          recurrence_frequency: string | null;
        };
        Insert: Omit<Database['public']['Tables']['goals']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['goals']['Row']>;
      };
      retention_offers: {
        Row: {
          id: string;
          uuid: string;
          reason: string;
          offer_type: string;
          offer_accepted: boolean;
          discount_coupon: string | null;
          ai_message: string;
          created_at: string;
          expires_at: string;
          currency: string;
          notes: string | null;
          discount_type: string | null;
          discount_value: number | null;
          ai_confidence: number | null;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['retention_offers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['retention_offers']['Row']>;
      };
      gift_codes: {
        Row: {
          id: string;
          uuid: string;
          code: string;
          discount: number;
          is_active: boolean;
          created_at: string;
          expires_at: string;
          currency: string;
          discount_type: string | null;
          discount_value: number | null;
          created_by: string | null;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['gift_codes']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['gift_codes']['Row']>;
      };
      scheduled_emails: {
        Row: {
          id: string;
          uuid: string;
          email: string;
          send_at: string;
          type: string;
          metadata: Record<string, any> | null;
          sent: boolean;
          sent_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['scheduled_emails']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['scheduled_emails']['Row']>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};`;

    const outputPath = path.join(typesDir, 'database.ts');
    fs.writeFileSync(outputPath, databaseTypes.trim());
    console.log('✅ Database types generated at: src/types/database.ts');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateTypes();
