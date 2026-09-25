import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

async function inspectSchema() {
  try {
    const tables = ['profiles', 'debts', 'transactions', 'cards', 'goals']

    for (const table of tables) {
      console.log(`\n📊 Table: ${table}`)
      const { data, error } = await supabase.from(table).select('*').limit(0)
      
      if (error) {
        console.error(`  ❌ Error:`, error.message)
        continue
      }

      // Intenta obtener info de columnas via REST
      const { data: columns, error: colError } = await supabase
        .rpc('get_table_columns', { table_name: table })
        .catch(() => ({ data: null, error: new Error('RPC not available') }))

      if (columns) {
        console.log('  Columns:', columns)
      } else {
        console.log('  (Schema inspection via RPC not available)')
      }
    }
  } catch (err) {
    console.error('Error:', err.message)
  }
}

inspectSchema()
