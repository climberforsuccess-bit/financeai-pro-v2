import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase keys. Add SUPABASE_SERVICE_ROLE_KEY to .env.local' },
        { status: 400 }
      )
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: 'test@example.com',
      password: 'password123',
      email_confirm: true
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    await supabaseAdmin
      .from('profiles')
      .upsert({
        id: data.user.id,
        email: 'test@example.com',
        full_name: 'Test User',
        country: 'CO',
        currency: 'COP'
      })

    return NextResponse.json({
      success: true,
      message: 'Usuario creado exitosamente',
      credentials: {
        email: 'test@example.com',
        password: 'password123'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
