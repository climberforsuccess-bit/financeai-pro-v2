import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import '@/app/[locale]/globals.css'

export const metadata: Metadata = {
  title: 'FinanceAI Pro',
  description: 'Tu plataforma de finanzas personales',
}

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }]
}

interface RootLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params

  if (!['es', 'en'].includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
