import { useState } from 'react'

export function useTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  return { transactions, loading, setTransactions }
}
