import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function inspectTable() {
  try {
    // Intenta obtener info de la tabla directamente
    const { data, error } = await supabase
      .from('debts')
      .select()
      .limit(0)

    if (error) {
      console.error('Error accessing debts table:', error.message)
      return
    }

    console.log('Debts table exists ✓')
    
    // Intenta obtener una fila para ver estructura
    const { data: rows, error: rowError } = await supabase
      .from('debts')
      .select('*')
      .limit(1)

    if (rowError) {
      console.error('Error fetching rows:', rowError.message)
      return
    }

    if (rows && rows.length > 0) {
      console.log('Debts table structure:', Object.keys(rows[0]))
    } else {
      console.log('Debts table is empty, cannot infer structure')
      console.log('Insert a test debt or check table manually in Supabase dashboard')
    }
  } catch (err) {
    console.error('Unexpected error:', err.message)
  }
}

inspectTable()
