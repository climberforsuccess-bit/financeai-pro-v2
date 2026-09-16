import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

export async function GET() {
  try {
    // Elimina usuario anterior
    await supabase
      .from('users')
      .delete()
      .eq('email', 'test@example.com')

    // Crea contraseña hasheada
    const passwordHash = await bcryptjs.hash('password123', 10)

    // Inserta nuevo usuario
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          email: 'test@example.com',
          password_hash: passwordHash,
          full_name: 'Test User',
          country: 'CO',
          currency: 'COP'
        }
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Usuario creado',
      email: 'test@example.com',
      password: 'password123'
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
