import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const tables = ['profiles', 'debts', 'transactions', 'cards', 'goals', 'subscriptions']

console.log('📋 ESQUEMA DE TABLAS:\n')

for (const table of tables) {
  // Inserta un registro dummy para ver columnas
  const { data, error } = await supabase
    .from(table)
    .insert({})
    .select()

  if (error && error.message.includes('violate')) {
    console.log(`${table}:`)
    console.log(`  Error (probablemente falta PK o campo requerido): ${error.message}\n`)
  } else if (error) {
    console.log(`${table}:`)
    console.log(`  Error: ${error.message}\n`)
  } else {
    console.log(`${table}:`)
    console.log(`  Columnas: ${Object.keys(data[0] || {}).join(', ')}\n`)
    // Rollback
    if (data && data[0]) {
      await supabase.from(table).delete().eq('id', data[0].id)
    }
  }
}
