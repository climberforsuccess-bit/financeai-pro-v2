import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import '../globals.css'

const locales = ['es', 'en']

export const metadata: Metadata = {
  title: 'FinanceAI Pro',
  description: 'Gestiona tus finanzas inteligentemente',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  let messages
  try {
    messages = await getMessages({ locale })
  } catch {
    messages = {}
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
