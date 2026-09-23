import { Debt } from '@/types'

export function snowballStrategy(debts: Debt[]): Debt[] {
  return [...debts].sort((a, b) => a.current_balance - b.current_balance)
}

export function avalancheStrategy(debts: Debt[]): Debt[] {
  return [...debts].sort((a, b) => (b.interest_rate || 0) - (a.interest_rate || 0))
}

export function customStrategy(debts: Debt[], priority: string[]): Debt[] {
  return [...debts].sort((a, b) => {
    const aIndex = priority.indexOf(a.id)
    const bIndex = priority.indexOf(b.id)
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
  })
}
