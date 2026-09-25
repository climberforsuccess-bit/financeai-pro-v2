'use client'

import { useTranslations } from 'next-intl'

export default function DashboardPage() {
  const t = useTranslations()

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {t('dashboard.title') || 'Dashboard'}
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        {t('dashboard.welcome') || 'Bienvenido a FinanceAI Pro'}
      </p>
    </div>
  )
}
