import type { Debt, Transaction } from '@/types'

/**
 * Calcula el balance total de deudas
 */
export function calculateTotalDebt(debts: Debt[]): number {
  return debts.reduce((sum, debt) => sum + (debt.current_balance || 0), 0)
}

/**
 * Calcula el interés mensual estimado
 */
export function calculateMonthlyInterest(debts: Debt[]): number {
  return debts.reduce((sum, debt) => {
    const rate = debt.interest_rate || 0
    const balance = debt.current_balance || 0
    return sum + (balance * rate) / 100 / 12
  }, 0)
}

/**
 * Calcula el pago mínimo total
 */
export function calculateMinimumPayment(debts: Debt[]): number {
  return debts.reduce((sum, debt) => sum + (debt.minimum_payment || 0), 0)
}

/**
 * Calcula ingresos totales
 */
export function calculateTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
}

/**
 * Calcula gastos totales
 */
export function calculateTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
}

/**
 * Calcula el balance (ingresos - gastos)
 */
export function calculateBalance(transactions: Transaction[]): number {
  const income = calculateTotalIncome(transactions)
  const expenses = calculateTotalExpenses(transactions)
  return income - expenses
}

/**
 * Calcula gastos por categoría
 */
export function calculateExpensesByCategory(transactions: Transaction[]): Record<string, number> {
  return transactions
    .filter(t => t.type === 'expense' && t.category)
    .reduce((acc, t) => {
      const category = t.category || 'Other'
      acc[category] = (acc[category] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)
}

/**
 * Calcula la tasa de ahorro
 */
export function calculateSavingsRate(transactions: Transaction[]): number {
  const income = calculateTotalIncome(transactions)
  const balance = calculateBalance(transactions)
  return income > 0 ? (balance / income) * 100 : 0
}

/**
 * Calcula el debt-to-income ratio
 */
export function calculateDebtToIncomeRatio(debts: Debt[], transactions: Transaction[]): number {
  const totalDebt = calculateTotalDebt(debts)
  const monthlyIncome = calculateTotalIncome(transactions) / 12 // Asume ingresos mensuales
  return monthlyIncome > 0 ? (totalDebt / monthlyIncome) * 100 : 0
}

/**
 * Estima cuántos meses para pagar una deuda
 */
export function estimateDebtPayoffMonths(debt: Debt): number {
  if (!debt.minimum_payment || debt.minimum_payment <= 0) return Infinity
  return Math.ceil((debt.current_balance || 0) / debt.minimum_payment)
}
