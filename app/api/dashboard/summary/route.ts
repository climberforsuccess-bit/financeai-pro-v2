import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import {
  calculateTotalDebt,
  calculateMonthlyInterest,
  calculateMinimumPayment,
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  calculateSavingsRate,
  calculateDebtToIncomeRatio,
} from '@/lib/financial-calculations'
import { compareStrategies } from '@/lib/debt-strategies'
import type { Debt, Transaction } from '@/types'

const supabase = createClient()

export async function GET() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch debts
    const { data: debts, error: debtsError } = await supabase
      .from('debts')
      .select('*')
      .eq('user_id', user.id)

    if (debtsError) throw debtsError

    // Fetch transactions
    const { data: transactions, error: transError } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('transaction_date', { ascending: false })

    if (transError) throw transError

    const debtsList = (debts || []) as Debt[]
    const txList = (transactions || []) as Transaction[]

    const summary = {
      totalDebt: calculateTotalDebt(debtsList),
      monthlyInterest: calculateMonthlyInterest(debtsList),
      minimumPayment: calculateMinimumPayment(debtsList),
      totalIncome: calculateTotalIncome(txList),
      totalExpenses: calculateTotalExpenses(txList),
      balance: calculateBalance(txList),
      savingsRate: calculateSavingsRate(txList),
      debtToIncomeRatio: calculateDebtToIncomeRatio(debtsList, txList),
    }

    const monthlyPayment = summary.minimumPayment * 1.5
    const strategies = debtsList.length > 0 ? compareStrategies(debtsList, monthlyPayment) : null

    return NextResponse.json({
      summary,
      strategies,
      debtsCount: debtsList.length,
      transactionsCount: txList.length,
    })
  } catch (error) {
    console.error('Dashboard summary error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard summary' },
      { status: 500 }
    )
  }
}
