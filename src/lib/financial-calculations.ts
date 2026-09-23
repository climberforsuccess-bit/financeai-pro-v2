import { Debt } from '@/types'

export function calculateTotalDebt(debts: Debt[]): number {
  return debts.reduce((sum, debt) => sum + debt.current_balance, 0)
}

export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  const monthlyRate = annualRate / 100 / 12
  if (monthlyRate === 0) return principal / months
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
         (Math.pow(1 + monthlyRate, months) - 1)
}

export function calculateInterestCharged(
  principal: number,
  monthlyPayment: number,
  months: number
): number {
  return monthlyPayment * months - principal
}
