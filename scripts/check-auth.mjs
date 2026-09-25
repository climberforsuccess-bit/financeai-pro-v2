import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAuth() {
  try {
    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) {
      console.error('Error:', error.message)
      return
    }

    console.log(`Total users: ${data.users.length}`)
    if (data.users.length > 0) {
      console.log('Sample user:', {
        id: data.users[0].id,
        email: data.users[0].email,
        providers: data.users[0].identities?.map(i => i.provider) || [],
      })
    }
  } catch (err) {
    console.error('Error:', err.message)
  }
}

checkAuth()
