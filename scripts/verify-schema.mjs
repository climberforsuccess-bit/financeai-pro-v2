import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function verifySchema() {
  console.log('📋 Verificando esquema de tablas...\n')

  const tables = ['profiles', 'debts', 'transactions', 'cards', 'goals']

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select()
        .limit(0)

      if (error) {
        console.log(`❌ ${table}: ${error.message}`)
        continue
      }

      console.log(`✅ ${table}:`)
      if (data && data.length === 0) {
        console.log('   (tabla vacía - sin datos de ejemplo)')
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`)
    }
  }

  console.log('\n✅ Verificación completada')
}

verifySchema()
