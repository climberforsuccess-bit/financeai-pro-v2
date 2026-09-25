import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkTables() {
  try {
    const tables = ['profiles', 'debts', 'transactions', 'cards']
    
    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      if (error) {
        console.error(`✗ ${table}: ${error.message}`)
      } else {
        console.log(`✓ ${table} exists`)
      }
    }
  } catch (err: any) {
    console.error('Error:', err.message)
  }
}

checkTables()
