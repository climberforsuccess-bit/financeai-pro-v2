import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logout exitoso' },
    { status: 200 }
  )

  response.cookies.set('auth-token', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/'
  })

  return response
}
