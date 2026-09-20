import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

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
    } catch (err: any) {
      console.log(`❌ ${table}: ${err.message}`)
    }
  }
  
  console.log('\n')
}

checkTables()
