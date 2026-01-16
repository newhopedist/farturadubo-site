'use client'

import { useState } from 'react'
import { ShoppingCart, MessageCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import ShippingCalculator from './ShippingCalculator'

// Importação dinâmica para evitar erros de SSR com o SDK do Mercado Pago
const CheckoutBrick = dynamic(() => import('./CheckoutBrick'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fartura-green-600"></div>
    </div>
  )
})

interface ProductBuyingSectionProps {
  product: {
    slug: string
    title: string
    price: number // Precisamos adicionar preço no content
    cta: {
      type: 'mercadolivre' | 'whatsapp'
      link: string
      text: string
    }
  }
}

interface ShippingOption {
  name: string
  price: number
  days: number
  logo?: string
}

export default function ProductBuyingSection({ product }: ProductBuyingSectionProps) {
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)

  const productPrice = product.price
  const totalPrice = productPrice + (selectedShipping?.price || 0)

  // Se for Big Bag (WhatsApp), mantém o comportamento original simples
  if (product.cta.type === 'whatsapp') {
    return (
      <div className="mt-auto pt-8 border-t border-gray-100">
        <a
          href={product.cta.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center bg-green-600 text-white hover:bg-green-700"
        >
          <MessageCircle className="w-6 h-6 mr-3" />
          {product.cta.text}
        </a>
        <p className="text-center text-xs text-gray-400 mt-4">
          Fale direto com um consultor agrônomo.
        </p>
      </div>
    )
  }

  // Se já clicou em comprar e tem frete, mostra o Checkout Transparente
  if (showCheckout && selectedShipping) {
    return (
      <div className="mt-8 animate-fadeIn">
        <div className="bg-gray-50 p-4 rounded-lg mb-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total a pagar</p>
            <p className="text-xl font-bold text-gray-900">R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
          </div>
          <button 
            onClick={() => setShowCheckout(false)}
            className="text-sm text-fartura-green-600 underline"
          >
            Alterar frete
          </button>
        </div>
        
        <CheckoutBrick 
          amount={totalPrice}
          description={`${product.title} + Frete ${selectedShipping.name}`}
          onPaymentComplete={(id) => alert(`Pagamento Processado! ID: ${id}`)}
        />
      </div>
    )
  }

  return (
    <div className="mt-8">
      {/* Calculadora de Frete */}
      <div className="mb-8">
        <ShippingCalculator 
          productSlug={product.slug} 
          onSelectShipping={(option) => setSelectedShipping(option)}
          selectedShipping={selectedShipping}
        />
      </div>

      {/* Resumo do Pedido (se tiver frete selecionado) */}
      {selectedShipping && (
        <div className="bg-fartura-green-50 p-4 rounded-xl mb-6 border border-fartura-green-100">
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Produto</span>
            <span>R$ {productPrice.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Frete ({selectedShipping.name})</span>
            <span>R$ {selectedShipping.price.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="border-t border-fartura-green-200 my-2 pt-2 flex justify-between font-bold text-lg text-fartura-green-900">
            <span>Total</span>
            <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      )}

      {/* Botão de Ação */}
      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={() => {
            if (!selectedShipping) {
              alert('Por favor, calcule e selecione um frete antes de continuar.')
              return
            }
            setShowCheckout(true)
          }}
          className={`w-full py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center ${
            selectedShipping 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!selectedShipping}
        >
          <ShoppingCart className="w-6 h-6 mr-3" />
          {selectedShipping ? 'PAGAR AGORA' : 'Selecione o Frete para Comprar'}
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">
          Ambiente seguro Mercado Pago. Seus dados estão protegidos.
        </p>
      </div>
    </div>
  )
}
