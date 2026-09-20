import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Supabase URL:', supabaseUrl ? '✅ Loaded' : '❌ Missing')
console.log('🔍 Anon Key:', supabaseAnonKey ? '✅ Loaded' : '❌ Missing')

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkTables() {
  const tables = ['profiles', 'debts', 'transactions', 'cards', 'goals']
  
  console.log('\n📊 Verificando tablas en Supabase...\n')
  
  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`)
      } else {
        console.log(`✅ ${table}: EXISTS (${count} registros)`)
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`)
    }
  }
  
  console.log('\n')
}

checkTables()
