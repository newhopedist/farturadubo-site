'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const products = [
    {
      id: 301,
      name: "Ureia 5 kg",
      category: "ureia",
      imageSrc: "/5KG.webp",
      description: "Embalagem ideal para pequenas propriedades e testes em áreas reduzidas.",
      price: "Sob Consulta",
      use: "Cobertura vegetativa e hortas",
      presentations: ["Saco 5 kg"],
      efficiency: 5,
    },
    {
      id: 302,
      name: "Ureia 25 kg",
      category: "ureia",
      imageSrc: "/25KG.webp",
      description: "Tamanho perfeito para médios produtores e áreas de cultivo regulares.",
      price: "Sob Consulta",
      use: "Lavouras de médio porte",
      presentations: ["Saco 25 kg"],
      efficiency: 5,
    },
    {
      id: 303,
      name: "Ureia 500 kg",
      category: "ureia",
      imageSrc: "/BIGBAG 500KG.webp",
      description: "Big bag para grandes propriedades e distribuidores regionais.",
      price: "Sob Consulta",
      use: "Grandes áreas de cultivo",
      presentations: ["Big Bag 500 kg"],
      efficiency: 5,
    },
    {
      id: 304,
      name: "Ureia 1.000 kg",
      category: "ureia",
      imageSrc: "/BIGBAG 1000KG.webp",
      description: "Embalagem industrial para operações em larga escala e cooperativas.",
      price: "Sob Consulta",
      use: "Lavouras extensivas e industriais",
      presentations: ["Big Bag 1.000 kg"],
      efficiency: 5,
    },
  ]

  const categories = [
    { id: 'todos', name: 'Todos os Produtos' },
    { id: 'ureia', name: 'Ureia' }
  ]

  const filteredProducts = selectedCategory === 'todos' ? products : products.filter(product => product.category === selectedCategory)

  const setCategory = (id: string) => {
    setSelectedCategory(id)
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
            Apresentamos <strong>ureia de alta qualidade</strong> em diferentes embalagens para atender todas as
            necessidades de manejo, com eficiência nutricional e alto rendimento.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-fartura-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-fartura-green-50 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-white flex items-center justify-center">
                <div className="w-40 h-28 relative">
                  <Image
                    src={product.imageSrc}
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
                
                <div className="mb-3">
                  <span className="text-sm font-semibold text-fartura-green-800">Indicação:</span>
                  <p className="text-sm text-gray-600">{product.use}</p>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-semibold text-fartura-green-800">Preço:</span>
                  <p className="text-lg font-bold text-fartura-green-600">{product.price}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.presentations[0]}</span>
                  <button onClick={() => setSelectedProduct(product)} className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedProduct(null)} />
          <div role="dialog" aria-modal="true" className="relative bg-white rounded-2xl shadow-2xl w-[95%] max-w-2xl">
            <button onClick={() => setSelectedProduct(null)} aria-label="Fechar" className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>
            <div className="p-6">
              <div className="flex items-start gap-6">
                <div className="w-40 h-28 relative flex-shrink-0">
                  <Image 
                    src={selectedProduct.imageSrc} 
                    alt={selectedProduct.name} 
                    fill 
                    sizes="160px" 
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fartura-green-800 mb-2">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{selectedProduct.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-fartura-green-800 mb-2">Informações do Produto</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Indicação:</span>
                    <p className="text-sm text-gray-800">{selectedProduct.use}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Embalagem:</span>
                    <p className="text-sm text-gray-800">{selectedProduct.presentations?.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Preço:</span>
                    <p className="text-lg font-bold text-fartura-green-600">{selectedProduct.price}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Composição:</span>
                    <p className="text-sm text-gray-800">Nitrogênio (N) 45%</p>
                  </div>
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
