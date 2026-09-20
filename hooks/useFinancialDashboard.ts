'use client'

import { useMemo } from 'react'
import { useAuth } from './useAuth'
import { useDebts } from './useDebts'
import { useTransactions } from './useTransactions'
import {
  calculateTotalDebt,
  calculateMonthlyInterest,
  calculateMinimumPayment,
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  calculateExpensesByCategory,
  calculateSavingsRate,
  calculateDebtToIncomeRatio,
} from '@/lib/financial-calculations'
import { compareStrategies } from '@/lib/debt-strategies'

export function useFinancialDashboard() {
  const { user, profile } = useAuth()
  const { debts, loading: debtsLoading } = useDebts()
  const { transactions, loading: transactionsLoading } = useTransactions()

  const summary = useMemo(() => {
    if (!debts.length || !transactions.length) {
      return {
        totalDebt: 0,
        monthlyInterest: 0,
        minimumPayment: 0,
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        savingsRate: 0,
        debtToIncomeRatio: 0,
        expensesByCategory: {},
      }
    }

    return {
      totalDebt: calculateTotalDebt(debts),
      monthlyInterest: calculateMonthlyInterest(debts),
      minimumPayment: calculateMinimumPayment(debts),
      totalIncome: calculateTotalIncome(transactions),
      totalExpenses: calculateTotalExpenses(transactions),
      balance: calculateBalance(transactions),
      savingsRate: calculateSavingsRate(transactions),
      debtToIncomeRatio: calculateDebtToIncomeRatio(debts, transactions),
      expensesByCategory: calculateExpensesByCategory(transactions),
    }
  }, [debts, transactions])

  const strategies = useMemo(() => {
    if (!debts.length) return null
    const monthlyPayment = summary.minimumPayment * 1.5 // 50% más que el mínimo
    return compareStrategies(debts, monthlyPayment)
  }, [debts, summary.minimumPayment])

  return {
    user,
    profile,
    debts,
    transactions,
    loading: debtsLoading || transactionsLoading,
    summary,
    strategies,
  }
}
