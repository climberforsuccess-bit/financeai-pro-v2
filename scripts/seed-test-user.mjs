import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Faltan variables de entorno')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedTestUser() {
  try {
    console.log('🌱 Iniciando seed...')

    const testEmail = 'test@financeai.local'
    const testPassword = 'Test123456!'

    console.log(`📧 Buscando usuario: ${testEmail}`)

    const { data: users, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) throw listError

    let userId
    const existingUser = users.users.find(u => u.email === testEmail)

    if (existingUser) {
      console.log(`✅ Usuario encontrado: ${existingUser.id}`)
      userId = existingUser.id
    } else {
      console.log(`📧 Creando nuevo usuario: ${testEmail}`)
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: testEmail,
        password: testPassword,
        email_confirm: true,
      })

      if (authError) throw authError
      userId = authUser.user.id
      console.log(`✅ Usuario creado: ${userId}`)
    }

    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()

    if (!existingProfile) {
      console.log(`👤 Creando perfil...`)
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            name: 'Juan Pérez',
            email: testEmail,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])

      if (profileError) throw profileError
      console.log(`✅ Perfil creado`)
    } else {
      console.log(`⚠️  Perfil ya existe`)
    }

    console.log(`💳 Vinculando deudas al usuario...`)

    const { data: updatedDebts, error: updateError } = await supabase
      .from('debts')
      .update({ profile_id: userId })
      .is('profile_id', null)
      .select()

    if (updateError) throw updateError
    console.log(`✅ ${updatedDebts?.length || 0} deudas vinculadas`)

    console.log(`💰 Creando transacciones de prueba...`)

    const transactions = [
      {
        profile_id: userId,
        amount: 1500.0,
        type: 'income',
        category: 'salary',
        description: 'Salario mensual',
        date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      {
        profile_id: userId,
        amount: 250.5,
        type: 'expense',
        category: 'groceries',
        description: 'Compras en supermercado',
        date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      {
        profile_id: userId,
        amount: 500.0,
        type: 'expense',
        category: 'utilities',
        description: 'Servicios (luz, agua, internet)',
        date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ]

    const { data: createdTransactions, error: transError } = await supabase
      .from('transactions')
      .insert(transactions)
      .select()

    if (transError) throw transError
    console.log(`✅ ${createdTransactions?.length || 0} transacciones creadas`)

    console.log('\n✨ Seed completado exitosamente')
    console.log('\n📋 Credenciales de prueba:')
    console.log(`   Email: ${testEmail}`)
    console.log(`   Password: ${testPassword}`)
    console.log(`   User ID: ${userId}`)
  } catch (error) {
    console.error('❌ Error en seed:', error.message)
    process.exit(1)
  }
}

seedTestUser()
