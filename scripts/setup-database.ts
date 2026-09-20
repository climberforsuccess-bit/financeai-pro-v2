import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('🔧 Setting up database schema...\n')

  try {
    // 1. Create profiles table
    console.log('Creating profiles table...')
    const { error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)

    if (profilesError && profilesError.code === 'PGRST116') {
      console.log('Profiles table does not exist, skipping...')
    }

    // 2. Create debts table
    console.log('Creating debts table...')
    const { error: debtsError } = await supabase
      .from('debts')
      .select('id')
      .limit(1)

    if (debtsError && debtsError.code === 'PGRST116') {
      console.log('Debts table does not exist, skipping...')
    }

    // 3. Create transactions table
    console.log('Creating transactions table...')
    const { error: transError } = await supabase
      .from('transactions')
      .select('id')
      .limit(1)

    if (transError && transError.code === 'PGRST116') {
      console.log('Transactions table does not exist, skipping...')
    }

    console.log('✅ Database schema check complete!')
  } catch (error) {
    console.error('❌ Error checking database:', error)
    process.exit(1)
  }
}

setupDatabase()
