import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('❌ Falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local')
  process.exit(1)
}

console.log('✅ Conectando a Supabase...')
const supabase = createClient(url, key)

const commonTables = ['users', 'debts', 'transactions', 'cards', 'goals', 'subscriptions', 'profiles']
const existing = []

for (const table of commonTables) {
  const { error } = await supabase.from(table).select('*').limit(1)
  if (!error || error.code !== 'PGRST116') {
    existing.push(table)
  }
}

if (existing.length > 0) {
  console.log('✅ Tablas detectadas:')
  existing.forEach(t => console.log(`   - ${t}`))
} else {
  console.log('⚠️  No se detectaron tablas comunes')
}
