import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testIntegration() {
  try {
    console.log('Testing Supabase integration...')

    const { error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)

    if (profilesError) {
      console.error('✗ Profiles:', profilesError.message)
    } else {
      console.log('✓ Profiles table accessible')
    }

    const { error: debtsError } = await supabase
      .from('debts')
      .select('*')
      .limit(1)

    if (debtsError) {
      console.error('✗ Debts:', debtsError.message)
    } else {
      console.log('✓ Debts table accessible')
    }

    const { error: transError } = await supabase
      .from('transactions')
      .select('*')
      .limit(1)

    if (transError) {
      console.error('✗ Transactions:', transError.message)
    } else {
      console.log('✓ Transactions table accessible')
    }

    console.log('Integration test complete')
  } catch (err: any) {
    console.error('Error:', err.message)
  }
}

testIntegration()
