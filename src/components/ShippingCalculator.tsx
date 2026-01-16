'use client'

import { useState } from 'react'
import { Truck, Search, AlertCircle } from 'lucide-react'

interface ShippingOption {
  name: string
  price: number
  days: number
  logo?: string
  currency?: string
}

interface ShippingCalculatorProps {
  productSlug: string
  onSelectShipping?: (option: ShippingOption) => void
  selectedShipping?: ShippingOption | null
}

export default function ShippingCalculator({ productSlug, onSelectShipping, selectedShipping }: ShippingCalculatorProps) {
  const [cep, setCep] = useState('')
  const [loading, setLoading] = useState(false)
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
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
    } catch (err: any) {
      console.error('Erro detalhado:', err)
      setError(err.message || 'Erro ao calcular frete. Verifique o CEP e tente novamente.')
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
            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent outline-none transition-all"
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
          <p className="text-sm font-bold text-gray-700 mb-2">Selecione o frete:</p>
          {shippingOptions.map((option, index) => (
            <div 
              key={index} 
              onClick={() => onSelectShipping && onSelectShipping(option)}
              className={`flex justify-between items-center bg-white p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedShipping?.name === option.name 
                  ? 'border-fartura-green-600 ring-2 ring-fartura-green-100 bg-green-50' 
                  : 'border-gray-100 hover:border-fartura-green-200'
              }`}
            >
              <div className="flex items-center">
                {/* Radio button visual */}
                <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                  selectedShipping?.name === option.name ? 'border-fartura-green-600' : 'border-gray-300'
                }`}>
                  {selectedShipping?.name === option.name && (
                    <div className="w-2 h-2 rounded-full bg-fartura-green-600" />
                  )}
                </div>

                {option.logo && (
                  <img 
                    src={option.logo} 
                    alt={option.name} 
                    className="h-8 w-auto mr-3 object-contain"
                  />
                )}
                <div>
                  <p className="font-bold text-gray-800 text-sm">{option.name}</p>
                  <p className="text-xs text-gray-500">Chega em até {option.days} dias úteis</p>
                </div>
              </div>
              <p className="font-bold text-fartura-green-700 text-lg">
                R$ {option.price.toFixed(2).replace('.', ',')}
              </p>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex flex-col items-center gap-2">
        <p className="text-[10px] text-gray-400">
          Cotação em tempo real via Melhor Envio
        </p>
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
