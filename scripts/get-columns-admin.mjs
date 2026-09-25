import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const tables = ['profiles', 'debts', 'transactions', 'cards', 'goals', 'subscriptions']

console.log('📋 ESQUEMA DE TABLAS (con Service Role):\n')

for (const table of tables) {
  const { data, error } = await supabaseAdmin
    .from(table)
    .select('*')
    .limit(1)

  if (error) {
    console.log(`❌ ${table}: ${error.message}`)
  } else {
    console.log(`✅ ${table}`)
    if (data && data.length > 0) {
      console.log(`   Columnas: ${Object.keys(data[0]).join(', ')}\n`)
    } else {
      console.log(`   (vacía - no hay datos)\n`)
    }
  }
}
