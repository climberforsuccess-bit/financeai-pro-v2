import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkSchema() {
  try {
    const { error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Profiles table error:', error.message)
    } else {
      console.log('✓ Profiles table exists')
    }

    const { error: debtsError } = await supabase
      .from('debts')
      .select('*')
      .limit(1)

    if (debtsError) {
      console.error('Debts table error:', debtsError.message)
    } else {
      console.log('✓ Debts table exists')
    }

    const { error: transError } = await supabase
      .from('transactions')
      .select('*')
      .limit(1)

    if (transError) {
      console.error('Transactions table error:', transError.message)
    } else {
      console.log('✓ Transactions table exists')
    }
  } catch (err: any) {
    console.error('Error:', err.message)
  }
}

checkSchema()
