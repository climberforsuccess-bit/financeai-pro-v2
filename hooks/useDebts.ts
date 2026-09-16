import { useState } from 'react'

export function useDebts() {
  const [debts, setDebts] = useState([])
  const [loading, setLoading] = useState(false)

  return { debts, loading, setDebts }
}
