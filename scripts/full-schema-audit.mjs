import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Intenta hacer un SELECT en auth.users (tabla interna de Supabase)
console.log('🔍 Buscando tablas de autenticación...\n')

// Intenta acceder a tablas comunes
const testTables = [
  'auth.users',
  'public.users',
  'public.profiles',
  'public.debts',
  'public.transactions'
]

for (const fullTable of testTables) {
  const [schema, table] = fullTable.split('.')
  
  try {
    const { data, error, status } = await supabase
      .from(table)
      .select('*')
      .limit(1)
    
    if (error) {
      console.log(`❌ ${fullTable}: ${error.message}`)
    } else {
      console.log(`✅ ${fullTable} - Existe`)
      if (data && data.length > 0) {
        console.log(`   Columnas: ${Object.keys(data[0]).join(', ')}`)
      }
    }
  } catch (e) {
    console.log(`❌ ${fullTable}: ${e.message}`)
  }
}

// Ahora intenta obtener columnas de las tablas que SÍ existen
console.log('\n📊 Columnas de tablas que funcionan:\n')

const workingTables = ['debts', 'transactions', 'cards', 'goals', 'subscriptions', 'profiles']

for (const table of workingTables) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .limit(1)
  
  if (data && data.length > 0) {
    console.log(`${table}:`)
    console.log(`  ${Object.keys(data[0]).join(', ')}\n`)
  } else if (!error) {
    console.log(`${table}: (vacía, no hay filas para inspeccionar)\n`)
  }
}
