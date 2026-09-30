'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { supabase } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()
  const locale = useLocale()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Espera a que Supabase procese la sesión
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error('Auth error:', error)
          router.push(`/${locale}/auth/login?error=callback_failed`)
          return
        }

        if (!session) {
          router.push(`/${locale}/auth/login?error=no_session`)
          return
        }

        // Verifica o crea el perfil
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', session.user.id)
          .single()

        if (profileError && profileError.code === 'PGRST116') {
          // No existe, créalo
          await supabase.from('profiles').insert([
            {
              user_id: session.user.id,
              email: session.user.email,
              created_at: new Date(),
            },
          ])
        }

        // Redirige al dashboard
        router.push(`/${locale}/dashboard`)
      } catch (err) {
        console.error('Auth callback error:', err)
        router.push(`/${locale}/auth/login?error=unknown`)
      }
    }

    handleCallback()
  }, [router, locale])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Autenticando...</p>
    </div>
  )
}
