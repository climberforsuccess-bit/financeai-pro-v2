import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('❌ Missing env vars')
  process.exit(1)
}

const supabase = createClient(url, key)

async function listAllTables() {
  try {
    console.log('📋 Intentando obtener todas las tablas...\n')

    // Intenta consultar information_schema directamente
    const { data: tables, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')

    if (error) {
      console.error('❌ Error:', error.message)
      console.log('\n💡 Abre https://app.supabase.com y ve a SQL Editor')
      console.log('   Ejecuta: SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'')
      return
    }

    if (!tables || tables.length === 0) {
      console.log('⚠️  No tables found')
      return
    }

    console.log('✅ All public tables:')
    tables.forEach(t => console.log(`   - ${t.table_name}`))
    console.log(`\n📊 Total: ${tables.length} tables`)
  } catch (err) {
    console.error('Error:', err.message)
    console.log('\n💡 Por favor ve directamente a tu dashboard Supabase y lista las tablas.')
  }
}

listAllTables()
