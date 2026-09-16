import { supabase } from '@/lib/supabase'
import { signToken } from '@/lib/jwt'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, fullName } = body

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password y nombre requeridos' },
        { status: 400 }
      )
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 400 }
      )
    }

    const passwordHash = await bcryptjs.hash(password, 10)

    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: passwordHash,
          full_name: fullName,
          country: 'CO',
          currency: 'COP'
        }
      ])
      .select()
      .single()

    if (error || !newUser) {
      return NextResponse.json(
        { error: 'Error al crear usuario' },
        { status: 500 }
      )
    }

    const token = signToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.full_name
    })

    const response = NextResponse.json(
      {
        message: 'Usuario creado exitosamente',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.full_name
        },
        token
      },
      { status: 201 }
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
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}
