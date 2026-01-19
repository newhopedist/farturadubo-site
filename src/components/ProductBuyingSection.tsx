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
  return (
    <div className="mt-8 border-t border-gray-100 pt-6">
      <div className="bg-fartura-green-50 rounded-xl p-6 border border-fartura-green-100 text-center">
        <h3 className="text-lg font-bold text-fartura-green-900 mb-2 uppercase">Disponível em Breve</h3>
        <p className="text-sm text-gray-600 mb-6">
          Este produto ainda não chegou ao nosso estoque. 
          Entre em contato para ser avisado assim que estiver disponível.
        </p>

        <div className="space-y-3">
          {/* Botão Avise-me (Simulado com WhatsApp por enquanto) */}
          <a
            href="https://wa.me/5585991289449?text=Olá, gostaria de ser avisado quando o produto estiver disponível para compra imediata."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 rounded-lg font-semibold text-fartura-green-700 bg-white border-2 border-fartura-green-600 hover:bg-fartura-green-50 transition-colors flex items-center justify-center shadow-sm"
          >
            <span className="mr-2">🔔</span>
            Avise-me quando chegar
          </a>

          {/* Botão Falar com Especialista (Rola para o formulário) */}
          <a
            href="#contact"
            className="w-full py-4 px-6 rounded-lg font-bold text-white bg-gradient-to-r from-fartura-green-600 to-fartura-green-700 hover:from-fartura-green-700 hover:to-fartura-green-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Falar com um Especialista
          </a>
        </div>
        
        <p className="text-xs text-gray-400 mt-4">
          Atendimento personalizado para sua lavoura.
        </p>
      </div>
    </div>
  )
}
