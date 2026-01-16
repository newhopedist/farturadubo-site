'use client'

import { useState } from 'react'
import { Truck, Search, AlertCircle } from 'lucide-react'

export default function ShippingCalculator({ productSlug }: { productSlug: string }) {
  const [cep, setCep] = useState('')
  const [loading, setLoading] = useState(false)
  const [shippingOptions, setShippingOptions] = useState<any[]>([])
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cep.length < 8) {
      setError('Digite um CEP válido')
      return
    }

    setLoading(true)
    setError('')
    setShippingOptions([])

    try {
      const response = await fetch('/api/shipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cep: cep.replace(/\D/g, ''),
          productSlug
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao calcular frete')
      }

      setShippingOptions(data.options || [])
    } catch (err) {
      setError('Erro ao calcular frete. Verifique o CEP e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const formatCep = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substr(0, 9)
  }

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6">
      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
        <Truck className="w-5 h-5 mr-2 text-fartura-green-600" />
        Calcular Frete e Prazo
      </h4>

      <form onSubmit={handleCalculate} className="flex gap-2 mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(formatCep(e.target.value))}
            placeholder="00000-000"
            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent outline-none transition-all"
            maxLength={9}
          />
        </div>
        <button
          type="submit"
          disabled={loading || cep.length < 9}
          className="bg-fartura-green-600 hover:bg-fartura-green-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
      </form>

      {error && (
        <div className="flex items-center text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}

      {shippingOptions.length > 0 && (
        <div className="space-y-3 animate-fadeIn">
          {shippingOptions.map((option, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <div>
                <p className="font-bold text-gray-800 text-sm">{option.name}</p>
                <p className="text-xs text-gray-500">Chega em até {option.days} dias úteis</p>
              </div>
              <p className="font-bold text-fartura-green-700">
                R$ {option.price.toFixed(2).replace('.', ',')}
              </p>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 text-center">
        <a 
          href="https://buscacepinter.correios.com.br/app/endereco/index.php" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-fartura-green-600 underline"
        >
          Não sei meu CEP
        </a>
      </div>
    </div>
  )
}
