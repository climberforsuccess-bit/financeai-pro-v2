import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { createServerClient, CookieOptions } from '@supabase/ssr'

const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
})

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Si es raíz, redirige a /es
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/es', request.url))
  }

  // Rutas públicas (no requieren autenticación)
  const publicRoutes = ['/es/auth/login', '/es/auth/signup', '/es/auth/callback', '/en/auth/login', '/en/auth/signup', '/en/auth/callback', '/es', '/en']

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  if (isPublicRoute) {
    return intlMiddleware(request)
  }

  // Para rutas protegidas, verifica la sesión
  let response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response = NextResponse.next()
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response = NextResponse.next()
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/es/auth/login', request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(es|en)/:path*'],
}
