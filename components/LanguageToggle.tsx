'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const setLanguage = (newLocale: 'es' | 'en') => {
    if (newLocale === locale) return

    const pathWithoutLocale = pathname.replace(`/${locale}`, '')
    router.push(`/${newLocale}${pathWithoutLocale || '/dashboard'}`)
    localStorage.setItem('preferredLocale', newLocale)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        {locale === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 min-w-[150px]">
          <button
            onClick={() => {
              setLanguage('es')
              setIsOpen(false)
            }}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
              locale === 'es' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600' : ''
            }`}
          >
            🇪🇸 Español
          </button>
          <button
            onClick={() => {
              setLanguage('en')
              setIsOpen(false)
            }}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
              locale === 'en' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600' : ''
            }`}
          >
            🇺🇸 English
          </button>
        </div>
      )}
    </div>
  )
}
