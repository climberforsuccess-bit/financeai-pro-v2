'use client'

import { useCards } from '@/hooks/useCards'
import { Card } from '@/types'

export function CardsOverview() {
  const { cards, loading, error } = useCards()

  if (loading) return <div className="text-gray-400">Cargando tarjetas...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>
  if (!cards.length) return <div className="text-gray-400">Sin tarjetas</div>

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Mis Tarjetas</h2>
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <p className="text-sm text-gray-400 mb-2">Balance Total</p>
        <p className="text-3xl font-bold text-green-400">${totalBalance.toFixed(2)}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card: Card) => (
          <div key={card.id} className="rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-400">Tarjeta</p>
                <p className="text-lg font-bold text-white">{card.name}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-900 text-blue-200">
                {card.card_type}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Balance</p>
              <p className="text-2xl font-bold text-green-400">${card.balance.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Límite</span>
                <p className="text-white">${card.limit_amount.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-gray-400">Usado</span>
                <p className="text-white">
                  {((card.limit_amount - card.balance) / card.limit_amount * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
