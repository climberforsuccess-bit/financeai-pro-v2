import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const tables = ['profiles', 'debts', 'transactions', 'cards']

async function checkSchema() {
  for (const table of tables) {
    console.log(`\n=== ${table.toUpperCase()} ===`)
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1)

    if (error) {
      console.error(`Error querying ${table}:`, error.message)
      continue
    }

    if (data && data.length > 0) {
      const row = data[0]
      console.log('Fields:', Object.keys(row).join(', '))
      console.log('Sample:', JSON.stringify(row, null, 2))
    } else {
      console.log('Table is empty, checking schema from information_schema...')
      const { data: schema, error: schemaError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type')
        .eq('table_name', table)

      if (schemaError) {
        console.error(`Could not fetch schema: ${schemaError.message}`)
      } else {
        console.log('Columns:', schema.map(c => `${c.column_name} (${c.data_type})`).join(', '))
      }
    }
  }
}

checkSchema()
