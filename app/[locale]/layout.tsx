import type { Metadata, ReactNode } from 'next'

export const metadata: Metadata = {
  title: 'FinanceAI Pro',
  description: 'Platform de finanzas personales con IA',
}

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
