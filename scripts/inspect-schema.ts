import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function inspectSchema() {
  console.log('🔍 Inspecting database schema...\n')

  const tables = ['profiles', 'debts', 'transactions']

  for (const table of tables) {
    console.log(`\n📊 ${table}:`)
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      if (error) {
        console.log(`  ❌ Error: ${error.message}`)
      } else {
        if (data && data.length > 0) {
          const columns = Object.keys(data[0])
          console.log(`  ✅ Columns: ${columns.join(', ')}`)
          console.log(`  Sample:`, JSON.stringify(data[0], null, 2))
        } else {
          console.log(`  ✅ Table exists (empty)`)
        }
      }
    } catch (err: any) {
      console.log(`  ❌ Exception: ${err.message}`)
    }
  }
}

inspectSchema()
