'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export default function ScannerPage() {
  const { user, loading, logout } = useAuth()

  if (loading) {
    return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Cargando...</div>
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Receipt Scanner</h1>
          <div className="space-x-4">
            <Link href="/dashboard" className="text-slate-400 hover:text-white">Volver</Link>
            <button 
              onClick={logout}
              className="text-slate-400 hover:text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 text-center">
          <div className="mb-6">
            <div className="inline-block p-6 bg-slate-700 rounded-full">
              <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Escanear Recibo</h2>
          <p className="text-slate-400 mb-6">Sube una imagen de tu recibo para extraer automáticamente los datos</p>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            id="receipt-upload"
          />
          <label 
            htmlFor="receipt-upload"
            className="inline-block bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded font-semibold cursor-pointer"
          >
            Seleccionar Imagen
          </label>
        </div>

        <div className="mt-8 bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-xl font-bold mb-4">Recibos Escaneados</h3>
          <p className="text-slate-400">No hay recibos escaneados aún</p>
        </div>
      </div>
    </main>
  )
}
