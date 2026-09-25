import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const tables = ['users', 'debts', 'transactions', 'cards', 'goals', 'subscriptions', 'profiles']

for (const table of tables) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .limit(0)

  if (error) {
    console.log(`❌ ${table}: ${error.message}`)
  } else {
    console.log(`✅ ${table}`)
    if (data && data.length === 0) {
      const sample = await supabase.from(table).select('*').limit(1)
      if (sample.data && sample.data[0]) {
        console.log(`   Columnas: ${Object.keys(sample.data[0]).join(', ')}`)
      }
    }
  }
}
