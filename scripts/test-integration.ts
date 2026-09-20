import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function runTests() {
  console.log('🧪 Starting integration tests...\n')

  // Test 1: Connection
  console.log('1️⃣ Testing Supabase connection...')
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    console.log('✅ Supabase connection OK\n')
  } catch (err: any) {
    console.error('❌ Connection failed:', err.message)
    process.exit(1)
  }

  // Test 2: Check profiles table
  console.log('2️⃣ Checking profiles table...')
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)

    if (error) {
      console.error('❌ Error:', error.message)
      console.error('Code:', error.code)
      console.error('Details:', error.details)
    } else {
      console.log('✅ profiles table OK')
      console.log('Sample data:', data)
    }
  } catch (err: any) {
    console.error('❌ Exception:', err.message)
  }

  // Test 3: Check debts table
  console.log('\n3️⃣ Checking debts table...')
  try {
    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .limit(1)

    if (error) {
      console.error('❌ Error:', error.message)
    } else {
      console.log('✅ debts table OK')
    }
  } catch (err: any) {
    console.error('❌ Exception:', err.message)
  }

  // Test 4: Check transactions table
  console.log('\n4️⃣ Checking transactions table...')
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .limit(1)

    if (error) {
      console.error('❌ Error:', error.message)
    } else {
      console.log('✅ transactions table OK')
    }
  } catch (err: any) {
    console.error('❌ Exception:', err.message)
  }
}

runTests()
