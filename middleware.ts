import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
})

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Si es raíz, redirige a /es
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/es', request.url))
  }

  // Rutas públicas (no requieren autenticación)
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

  // Para rutas protegidas, verifica cookies de sesión
  const sessionCookie = request.cookies.get('sb-auth-token')

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/es/auth/login', request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(es|en)/:path*'],
}
