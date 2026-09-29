'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface DashboardStats {
  totalIncome: number
  totalExpenses: number
  balance: number
  totalDebts: number
}

export default function DashboardPage() {
  const t = useTranslations()
  const [stats, setStats] = useState<DashboardStats>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    totalDebts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        // Fetch transactions
        const { data: transactions } = await supabase
          .from('transactions')
          .select('amount, type')
          .eq('profile_id', user.id)

        // Fetch debts
        const { data: debts } = await supabase
          .from('debts')
          .select('remaining_balance')
          .eq('profile_id', user.id)

        let totalIncome = 0
        let totalExpenses = 0

        if (transactions) {
          transactions.forEach((t) => {
            if (t.type === 'income') {
              totalIncome += t.amount || 0
            } else if (t.type === 'expense') {
              totalExpenses += t.amount || 0
            }
          })
        }

        const totalDebts = debts?.reduce((sum, d) => sum + (d.remaining_balance || 0), 0) || 0
        const balance = totalIncome - totalExpenses - totalDebts

        setStats({
          totalIncome,
          totalExpenses,
          balance,
          totalDebts,
        })
      } catch (err) {
        console.error('Error fetching dashboard stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {t('dashboard.summary')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Income Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('dashboard.income')}
          </p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {loading ? '-' : `$${stats.totalIncome.toFixed(2)}`}
          </p>
        </div>

        {/* Expenses Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('dashboard.expenses')}
          </p>
          <p className="text-2xl font-bold text-red-600 mt-2">
            {loading ? '-' : `$${stats.totalExpenses.toFixed(2)}`}
          </p>
        </div>

        {/* Total Debts Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('dashboard.totalDebts')}
          </p>
          <p className="text-2xl font-bold text-orange-600 mt-2">
            {loading ? '-' : `$${stats.totalDebts.toFixed(2)}`}
          </p>
        </div>

        {/* Balance Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('dashboard.balance')}
          </p>
          <p className={`text-2xl font-bold mt-2 ${stats.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {loading ? '-' : `$${stats.balance.toFixed(2)}`}
          </p>
        </div>
      </div>
    </div>
  )
}
