import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { CardsOverview } from '@/components/dashboard/CardsOverview'
import { DebtsOverview } from '@/components/dashboard/DebtsOverview'
import { TransactionsOverview } from '@/components/dashboard/TransactionsOverview'
import { DashboardClient } from '@/components/dashboard/DashboardClient'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  return <DashboardClient />
}
