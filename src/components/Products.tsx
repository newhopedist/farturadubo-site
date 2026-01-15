'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProducts } from '@/services/products'
import { ProductWithPrices } from '@/types/ecommerce'
import { Package, Eye } from 'lucide-react'

export default function Products() {
  const [products, setProducts] = useState<ProductWithPrices[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<ProductWithPrices | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      // Pegar apenas os 3 primeiros produtos para destaque
      setProducts(data.slice(0, 3))
    } catch (err) {
      console.error('Erro ao carregar produtos:', err)
    } finally {
      setLoading(false)
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

  if (loading) {
    return (
      <section id="products" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-fartura-green-900 mb-4">
              Nossos Produtos
            </h2>
            <div className="w-20 h-1 bg-fartura-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Carregando produtos...
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="py-20 bg-gray-50 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-fartura-green-900 mb-4">
            Nossos Produtos
          </h2>
          <div className="w-20 h-1 bg-fartura-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Apresentamos <strong>fertilizantes de alta qualidade</strong> em diferentes embalagens para atender todas as
            necessidades de manejo, com eficiência nutricional e alto rendimento.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Link
            href="/produtos"
            className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
          >
            <Package className="w-5 h-5 mr-2" />
            Ver Todos os Produtos
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto disponível</h3>
            <p className="text-gray-600">Em breve teremos novos produtos em estoque.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-white flex items-center justify-center">
                  <div className="w-40 h-28 relative">
                    <Image
                      src={getProductImage(product.prices[0]?.peso || '25kg')}
                      alt={product.name}
                      fill
                      sizes="(min-width:1024px) 160px, 160px"
                      className="object-contain"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDE2MCAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTEyIiBmaWxsPSIjZjBmOWZmIi8+Cjx0ZXh0IHg9IjgwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjQ3NDhiIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GQVJUVVJBRFVCTzwvdGV4dD4KPC9zdmc+"
                    />
                  </div>
                </div>
                <div className="px-6 pt-4">
                  <h3 className="text-xl font-bold text-fartura-green-800">{product.name}</h3>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-fartura-green-800">Tamanhos disponíveis:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.prices.map((price) => (
                        <span
                          key={price.id}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getWeightBadgeColor(price.peso)}`}
                        >
                          {price.peso} - R$ {price.preco.toFixed(2)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/produtos`}
                      className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Detalhes do Produto */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedProduct(null)} />
          <div role="dialog" aria-modal="true" className="relative bg-white rounded-2xl shadow-2xl w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedProduct(null)} aria-label="Fechar" className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>
            <div className="p-6">
              <div className="flex items-start gap-6">
                <div className="w-40 h-28 relative flex-shrink-0">
                  <Image 
                    src={getProductImage(selectedProduct.prices[0]?.peso || '25kg')}
                    alt={selectedProduct.name} 
                    fill 
                    sizes="160px" 
                    className="object-contain"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDE2MCAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTEyIiBmaWxsPSIjZjBmOWZmIi8+Cjx0ZXh0IHg9IjgwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjQ3NDhiIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GQVJUVVJBRFVCTzwvdGV4dD4KPC9zdmc+"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fartura-green-800 mb-2">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{selectedProduct.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-fartura-green-800 mb-2">Preços por tamanho:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProduct.prices.map((price) => (
                    <div key={price.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWeightBadgeColor(price.peso)}`}>
                        {price.peso}
                      </span>
                      <span className="font-bold text-fartura-green-600">R$ {price.preco.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <a
                  href={`https://wa.me/5585991289449?text=${encodeURIComponent(`Olá, quero saber mais sobre o produto ${selectedProduct.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-fartura-green-600 text-fartura-green-600 hover:bg-fartura-green-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Falar no WhatsApp
                </a>
                <button onClick={() => setSelectedProduct(null)} className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}