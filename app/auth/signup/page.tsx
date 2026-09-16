'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al crear cuenta')
        return
      }

      router.push('/dashboard')
    } catch (err) {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg border border-slate-700">
        <h1 className="text-3xl font-bold mb-2 text-center">FinanceAI Pro</h1>
        <p className="text-slate-400 text-center mb-8">Crea una nueva cuenta</p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nombre completo</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900 border border-red-700 rounded text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 rounded font-semibold transition"
          >
            {loading ? 'Cargando...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  )
}
