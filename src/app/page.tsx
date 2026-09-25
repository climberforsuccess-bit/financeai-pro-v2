'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600">FinanceAI Pro</h1>
        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block px-6 py-2 text-gray-700 hover:text-gray-900"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Get started
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Take Control of Your Finances
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          FinanceAI Pro is a premium personal finance management platform designed to help you
          manage debt, track transactions, and achieve your financial goals.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
        >
          Start Free Trial
        </Link>
      </div>
    </div>
  )
}
