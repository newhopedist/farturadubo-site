'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react'

export default function CarrinhoPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const handleQuantityChange = async (productId: number, priceId: string, newQuantity: number) => {
    setIsUpdating(`${productId}-${priceId}`)
    try {
      updateQuantity(productId, priceId, newQuantity)
    } finally {
      setIsUpdating(null)
    }
  }

  const handleRemove = async (productId: number, priceId: string) => {
    setIsUpdating(`${productId}-${priceId}`)
    try {
      removeFromCart(productId, priceId)
    } finally {
      setIsUpdating(null)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Carrinho Vazio</h2>
          <p className="text-gray-600 mb-6">Seu carrinho está vazio. Adicione alguns produtos para continuar.</p>
          <Link
            href="/produtos"
            className="inline-flex items-center bg-fartura-green-500 hover:bg-fartura-green-600 text-white px-6 py-3 rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ver Produtos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Carrinho de Compras</h1>
            <Link
              href="/produtos"
              className="inline-flex items-center text-fartura-green-600 hover:text-fartura-green-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Produtos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Produtos ({cart.items.length})</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <div key={`${item.product.id}-${item.price.id}`} className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Imagem do Produto */}
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.category === 'fertilizante' ? '/25KG.webp' : '/Packs.webp'}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Informações do Produto */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.price.peso} - R$ {item.price.preco.toFixed(2)} cada
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Estoque: {item.price.estoque}
                        </p>
                      </div>

                      {/* Controles de Quantidade */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.price.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || isUpdating === `${item.product.id}-${item.price.id}`}
                          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-medium min-w-[2rem] text-center">
                          {isUpdating === `${item.product.id}-${item.price.id}` ? '...' : item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.price.id, item.quantity + 1)}
                          disabled={item.quantity >= item.price.estoque || isUpdating === `${item.product.id}-${item.price.id}`}
                          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Preço Total do Item */}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          R$ {item.subtotal.toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemove(item.product.id, item.price.id)}
                          disabled={isUpdating === `${item.product.id}-${item.price.id}`}
                          className="text-red-500 hover:text-red-700 text-sm mt-1 disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4 inline mr-1" />
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cart.items.reduce((sum, item) => sum + item.quantity, 0)} itens)</span>
                  <span className="font-medium">R$ {cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frete</span>
                  <span className="text-gray-500">Calcular no checkout</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold text-fartura-green-600">
                      R$ {cart.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-fartura-green-500 hover:bg-fartura-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Continuar para Pagamento
              </Link>

              <div className="mt-4 text-center">
                <Link
                  href="/produtos"
                  className="text-sm text-fartura-green-600 hover:text-fartura-green-700"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}