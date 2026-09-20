import { Debt } from '@/types'

export interface PayoffPlan {
  debts: DebtWithPlan[]
  totalMonths: number
  totalInterestPaid: number
}

export interface DebtWithPlan extends Debt {
  payoffMonth: number
  totalInterestOnDebt: number
  monthlyPayment: number
}

export interface StrategyComparison {
  avalanche: PayoffPlan & { strategy: string }
  snowball: PayoffPlan & { strategy: string }
  consolidation: PayoffPlan & { strategy: string }
  hybrid: PayoffPlan & { strategy: string }
  all: Array<PayoffPlan & { strategy: string }>
  best: PayoffPlan & { strategy: string }
}

export function calculateAvalancheStrategy(
  debts: Debt[],
  monthlyPayment: number
): PayoffPlan {
  const sortedDebts = [...debts].sort(
    (a, b) => (b.interest_rate || 0) - (a.interest_rate || 0)
  )

  const debtsWithPlan: DebtWithPlan[] = sortedDebts.map((debt) => ({
    ...debt,
    payoffMonth: 0,
    totalInterestOnDebt: 0,
    monthlyPayment: debt.minimum_payment || 0,
  }))

  let totalInterestPaid = 0
  let month = 0

  for (const debt of debtsWithPlan) {
    let balance = debt.current_balance
    let interestPaid = 0
    const monthlyRate = (debt.interest_rate || 0) / 100 / 12

    while (balance > 0) {
      month++
      const interest = balance * monthlyRate
      interestPaid += interest
      balance = Math.max(0, balance + interest - monthlyPayment)
    }

    debt.payoffMonth = month
    debt.totalInterestOnDebt = interestPaid
    totalInterestPaid += interestPaid
  }

  return {
    debts: debtsWithPlan,
    totalMonths: month,
    totalInterestPaid,
  }
}

export function calculateSnowballStrategy(
  debts: Debt[],
  monthlyPayment: number
): PayoffPlan {
  const sortedDebts = [...debts].sort(
    (a, b) => a.current_balance - b.current_balance
  )

  const debtsWithPlan: DebtWithPlan[] = sortedDebts.map((debt) => ({
    ...debt,
    payoffMonth: 0,
    totalInterestOnDebt: 0,
    monthlyPayment: debt.minimum_payment || 0,
  }))

  let totalInterestPaid = 0
  let month = 0

  for (const debt of debtsWithPlan) {
    let balance = debt.current_balance
    let interestPaid = 0
    const monthlyRate = (debt.interest_rate || 0) / 100 / 12

    while (balance > 0) {
      month++
      const interest = balance * monthlyRate
      interestPaid += interest
      balance = Math.max(0, balance + interest - monthlyPayment)
    }

    debt.payoffMonth = month
    debt.totalInterestOnDebt = interestPaid
    totalInterestPaid += interestPaid
  }

  return {
    debts: debtsWithPlan,
    totalMonths: month,
    totalInterestPaid,
  }
}

export function calculateConsolidationStrategy(
  debts: Debt[],
  monthlyPayment: number
): PayoffPlan {
  const totalBalance = debts.reduce((sum, d) => sum + d.current_balance, 0)
  const avgInterestRate =
    debts.reduce((sum, d) => sum + (d.interest_rate || 0), 0) / debts.length

  const debtsWithPlan: DebtWithPlan[] = debts.map((debt) => ({
    ...debt,
    payoffMonth: 0,
    totalInterestOnDebt: 0,
    monthlyPayment: monthlyPayment,
  }))

  let balance = totalBalance
  let interestPaid = 0
  let month = 0
  const monthlyRate = avgInterestRate / 100 / 12

  while (balance > 0) {
    month++
    const interest = balance * monthlyRate
    interestPaid += interest
    balance = Math.max(0, balance + interest - monthlyPayment)
  }

  for (const debt of debtsWithPlan) {
    debt.payoffMonth = month
    debt.totalInterestOnDebt = (interestPaid * debt.current_balance) / totalBalance
  }

  return {
    debts: debtsWithPlan,
    totalMonths: month,
    totalInterestPaid: interestPaid,
  }
}

export function calculateHybridStrategy(
  debts: Debt[],
  monthlyPayment: number
): PayoffPlan {
  const highInterestDebts = debts.filter((d) => (d.interest_rate || 0) > 15)
  const otherDebts = debts.filter((d) => (d.interest_rate || 0) <= 15)

  const allDebts = [
    ...highInterestDebts.sort((a, b) => (b.interest_rate || 0) - (a.interest_rate || 0)),
    ...otherDebts.sort((a, b) => a.current_balance - b.current_balance),
  ]

  const debtsWithPlan: DebtWithPlan[] = allDebts.map((debt) => ({
    ...debt,
    payoffMonth: 0,
    totalInterestOnDebt: 0,
    monthlyPayment: debt.minimum_payment || 0,
  }))

  let totalInterestPaid = 0
  let month = 0

  for (const debt of debtsWithPlan) {
    let balance = debt.current_balance
    let interestPaid = 0
    const monthlyRate = (debt.interest_rate || 0) / 100 / 12

    while (balance > 0) {
      month++
      const interest = balance * monthlyRate
      interestPaid += interest
      balance = Math.max(0, balance + interest - monthlyPayment)
    }

    debt.payoffMonth = month
    debt.totalInterestOnDebt = interestPaid
    totalInterestPaid += interestPaid
  }

  return {
    debts: debtsWithPlan,
    totalMonths: month,
    totalInterestPaid,
  }
}

export function compareStrategies(
  debts: Debt[],
  monthlyPayment: number
): StrategyComparison {
  const avalanche = calculateAvalancheStrategy(debts, monthlyPayment)
  const snowball = calculateSnowballStrategy(debts, monthlyPayment)
  const consolidation = calculateConsolidationStrategy(debts, monthlyPayment)
  const hybrid = calculateHybridStrategy(debts, monthlyPayment)

  const strategies = [
    { ...avalanche, strategy: 'avalanche' },
    { ...snowball, strategy: 'snowball' },
    { ...consolidation, strategy: 'consolidation' },
    { ...hybrid, strategy: 'hybrid' },
  ]

  const best = strategies.reduce((prev, curr) =>
    curr.totalInterestPaid < prev.totalInterestPaid ? curr : prev
  )

  return {
    avalanche: { ...avalanche, strategy: 'avalanche' },
    snowball: { ...snowball, strategy: 'snowball' },
    consolidation: { ...consolidation, strategy: 'consolidation' },
    hybrid: { ...hybrid, strategy: 'hybrid' },
    all: strategies,
    best,
  }
}
