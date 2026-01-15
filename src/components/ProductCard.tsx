'use client'

import { useState } from 'react'
import { ProductWithPrices } from '@/types/ecommerce'
import { useCart } from '@/hooks/useCart'
import { ShoppingCart, Plus, Minus, MessageCircle } from 'lucide-react'

interface ProductCardProps {
  product: ProductWithPrices
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [selectedPrice, setSelectedPrice] = useState(product.prices[0])
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const isComingSoon = product.slug === 'farturamax' || selectedPrice.preco === 0

  const handleAddToCart = async () => {
    if (!selectedPrice) return
    
    setIsAddingToCart(true)
    try {
      addToCart(product, selectedPrice, quantity)
      // Reset quantity after adding to cart
      setQuantity(1)
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const incrementQuantity = () => {
    if (quantity < selectedPrice.estoque) {
      setQuantity(prev => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const getWeightBadgeColor = (peso: string) => {
    switch (peso) {
      case '5kg': return 'bg-blue-100 text-blue-800'
      case '25kg': return 'bg-green-100 text-green-800'
      case '500kg': return 'bg-orange-100 text-orange-800'
      case '1000kg': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProductImage = (peso: string) => {
    switch (peso) {
      case '5kg': return '/5kg.webp'
      case '25kg': return '/25kg.webp'
      case '500kg': return '/bigbag-500kg.webp'
      case '1000kg': return '/bigbag-1000kg.webp'
      default: return '/25kg.webp'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Imagem do Produto */}
      <div className="relative h-64 bg-white p-4">
        <img
          src={getProductImage(selectedPrice.peso)}
          alt={`${product.name} ${selectedPrice.peso}`}
          className="w-full h-full object-contain"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWeightBadgeColor(selectedPrice.peso)}`}>
            {selectedPrice.peso}
          </span>
        </div>
      </div>

      {/* Informações do Produto */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Seletor de Peso */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tamanho da Embalagem:</label>
          <div className="grid grid-cols-2 gap-2">
            {product.prices.map((price) => (
              <button
                key={price.id}
                onClick={() => {
                  setSelectedPrice(price)
                  setQuantity(1) // Reset quantity when changing weight
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPrice.id === price.id
                    ? 'bg-fartura-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {price.peso}
              </button>
            ))}
          </div>
        </div>

        {/* Preço e Estoque */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-2xl font-bold ${isComingSoon ? 'text-gray-500' : 'text-fartura-green-600'}`}>
              {isComingSoon ? 'EM BREVE' : selectedPrice.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            {!isComingSoon && (
              <span className="text-sm text-gray-500">
                Estoque: {selectedPrice.estoque}
              </span>
            )}
          </div>
        </div>

        {/* Seletor de Quantidade (Temporariamente desativado) */}
        {/* {!isComingSoon && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade:</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                disabled={quantity >= selectedPrice.estoque}
                className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )} */}

        {/* Botão Adicionar ao Carrinho (Temporariamente desativado) */}
        {/* <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || selectedPrice.estoque === 0 || isComingSoon}
          className={`w-full font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2 ${
            isComingSoon 
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'bg-fartura-green-500 hover:bg-fartura-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white'
          }`}
        >
          {isComingSoon ? (
            <span>Aguarde Lançamento</span>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>{isAddingToCart ? 'Adicionando...' : 'Adicionar ao Carrinho'}</span>
            </>
          )}
        </button> */}

        {/* Botão Falar no WhatsApp */}
        <a
          href={`https://wa.me/5585991289449?text=Olá, tenho interesse no produto ${product.name} (${selectedPrice.peso})`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2 ${
            isComingSoon 
              ? 'bg-gray-300 cursor-not-allowed text-gray-500 pointer-events-none'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isComingSoon ? (
            <span>Aguarde Lançamento</span>
          ) : (
            <>
              <MessageCircle className="w-5 h-5" />
              <span>Falar com Consultor</span>
            </>
          )}
        </a>

        {selectedPrice.estoque === 0 && (
          <p className="text-red-500 text-sm mt-2 text-center">Produto indisponível</p>
        )}
      </div>
    </div>
  )
}