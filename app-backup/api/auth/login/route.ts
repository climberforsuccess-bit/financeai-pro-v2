import { supabase } from '@/lib/supabase'
import { signToken } from '@/lib/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y password requeridos' },
        { status: 400 }
      )
    }

    // Usar autenticación de Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (authError || !authData?.user) {
      return NextResponse.json(
        { error: authError?.message || 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Obtener datos del perfil
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    const token = signToken({
      id: authData.user.id,
      email: authData.user.email,
      name: profile?.full_name
    })

    const response = NextResponse.json(
      {
        message: 'Login exitoso',
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name: profile?.full_name
        },
        token
      },
      { status: 200 }
    )

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}
