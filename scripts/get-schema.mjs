import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const tables = ['profiles', 'debts', 'transactions', 'cards', 'goals']

for (const table of tables) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .limit(0)
  
  if (error) console.error(`❌ ${table}:`, error.message)
  else console.log(`✅ ${table}:`, JSON.stringify(data, null, 2))
}
