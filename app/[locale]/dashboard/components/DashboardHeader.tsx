'use client'

import { LanguageToggle } from '@/components/LanguageToggle'
import { useTranslations } from 'next-intl'
import { signOut } from 'next-auth/react'

export function DashboardHeader() {
  const t = useTranslations()

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FinanceAI Pro</h1>
      
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <button 
          onClick={() => signOut()}
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {t('common.header.logout')}
        </button>
      </div>
    </div>
  )
}
