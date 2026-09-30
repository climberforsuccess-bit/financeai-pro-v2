import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
})

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/es', request.url))
  }

  const publicRoutes = [
    '/es/auth/login',
    '/es/auth/signup',
    '/es/auth/callback',
    '/en/auth/login',
    '/en/auth/signup',
    '/en/auth/callback',
    '/es',
    '/en',
  ]

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  if (isPublicRoute) {
    return intlMiddleware(request)
  }

  // Busca cualquier cookie de sesión de Supabase
  const hasSessionCookie = Array.from(request.cookies.entries()).some(
    ([key]) => key.includes('auth-token') || key.includes('auth_session')
  )

  if (!hasSessionCookie) {
    return NextResponse.redirect(new URL('/es/auth/login', request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(es|en)/:path*'],
}
