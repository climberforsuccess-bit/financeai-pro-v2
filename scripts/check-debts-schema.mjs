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
    const { data: columns } = await supabase
      .from('debts')
      .select('*')
      .limit(1)

    console.log('Debts columns:', Object.keys(columns?.[0] || {}))
  } catch (err) {
    console.error('Error:', err.message)
  }
}

checkSchema()
