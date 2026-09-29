'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Profile {
  id: string
  full_name: string
  country: string
}

export function DashboardHeader() {
  const t = useTranslations()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('id, full_name, country')
            .eq('id', user.id)
            .single()

          if (!error && data) {
            setProfile(data)
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.title')}
          </h1>
          {!loading && profile && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('dashboard.welcome')}, {profile.full_name}
            </p>
          )}
        </div>
        {profile?.country && (
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {t('dashboard.selectCountry')}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {profile.country}
            </p>
          </div>
        )}
      </div>
    </header>
  )
}
