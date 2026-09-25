import { DashboardHeader } from './components/DashboardHeader'

export const dynamic = 'force-dynamic'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardHeader />
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}
