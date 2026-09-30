'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Obtén la sesión después del callback de OAuth
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error || !session) {
          router.push('/es/auth/login?error=callback_failed')
          return
        }

        // Redirige al dashboard
        router.push('/es/dashboard')
      } catch (err) {
        console.error('Auth callback error:', err)
        router.push('/es/auth/login?error=unknown')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Autenticando...</p>
    </div>
  )
}
