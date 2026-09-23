'use client'

import { useCards } from '@/hooks/useCards'

export function CardsOverview() {
  const { cards, loading, error } = useCards()

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Cargando tarjetas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    )
  }

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0)
  const totalLimit = cards.reduce((sum, card) => sum + card.limit_amount, 0)
  const avgUtilization = cards.length > 0 ? (totalBalance / totalLimit) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-semibold">Saldo Total</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${totalBalance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-semibold">Límite Total</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${totalLimit.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-semibold">Utilización Promedio</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{avgUtilization.toFixed(1)}%</p>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {cards.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No tienes tarjetas registradas.</p>
          </div>
        ) : (
          cards.map((card) => {
            const utilization = (card.balance / card.limit_amount) * 100
            return (
              <div key={card.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
                    <p className="text-sm text-gray-600">{card.card_type} • {card.last_four}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {card.payment_status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Saldo</p>
                    <p className="font-semibold text-gray-900">
                      ${card.balance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Límite</p>
                    <p className="font-semibold text-gray-900">
                      ${card.limit_amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">APR</p>
                    <p className="font-semibold text-gray-900">{card.apr}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Disponible</p>
                    <p className="font-semibold text-gray-900">
                      ${(card.limit_amount - card.balance).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                {/* Utilization Bar */}
                <div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        utilization > 80 ? 'bg-red-600' : utilization > 50 ? 'bg-yellow-600' : 'bg-green-600'
                      }`}
                      style={{ width: `${Math.min(utilization, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Utilización: {utilization.toFixed(1)}%</p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
