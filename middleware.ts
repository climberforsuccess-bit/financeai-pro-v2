import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rutas públicas
  const publicRoutes = ['/', '/auth/login', '/auth/signup']
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Rutas protegidas
  if (pathname.startsWith('/dashboard')) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      {
        auth: {
          persistSession: false,
        },
      }
    )

    const token = request.cookies.get('sb-token')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser(token)
      if (!user) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
