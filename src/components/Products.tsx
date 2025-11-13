'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const products = [
    {
      id: 301,
      name: "FARTUREIA 5 kg",
      category: "fartureia",
      imageSrc: "/Packs.png",
      description:
        "Fertilizante mineral misto Nitrogênio-Enxofre (N–S) de alta eficiência, formulado para garantir melhor aproveitamento do nitrogênio e absorção equilibrada de nutrientes pelas plantas. Combina 90% de ureia e 10% de sulfato de amônio, proporcionando nutrição completa e estável em diversas culturas.",
      composition: ["Ureia (90%)", "Sulfato de amônio (10%)"],
      benefits: [
        "Alta eficiência nutricional",
        "Reduz perdas por volatilização",
        "Liberação equilibrada de nitrogênio",
        "Melhora o crescimento e o vigor das plantas",
        "Excelente custo-benefício",
      ],
      application:
        "Indicado para culturas de alta exigência em nitrogênio, como milho, algodão, cana-de-açúcar, feijão, arroz e hortifrúti. Pode ser utilizado em cobertura ou incorporado ao solo.",
      presentations: ["Saco 5 kg"],
      efficiency: 5,
    },
    {
      id: 302,
      name: "FARTUREIA 25 kg",
      category: "fartureia",
      imageSrc: "/Packs.png",
      description:
        "Fertilizante mineral de alta performance, desenvolvido com tecnologia que combina nitrogênio e enxofre em forma de grânulos homogêneos, garantindo maior estabilidade e melhor aproveitamento do nutriente.",
      composition: ["Ureia (90%)", "Sulfato de amônio (10%)"],
      benefits: [
        "Alta eficiência nutricional",
        "Liberação gradual de nitrogênio",
        "Aumento da produtividade",
        "Excelente solubilidade",
        "Rendimento superior por hectare",
      ],
      application:
        "Recomendado para grandes lavouras e cultivos de média a alta escala. Ideal para cobertura e manutenção de solo fértil.",
      presentations: ["Saco 25 kg"],
      efficiency: 5,
    },
    {
      id: 303,
      name: "FARTUREIA 50 kg",
      category: "fartureia",
      imageSrc: "/Packs.png",
      description:
        "Fertilizante de uso agrícola para aplicação em larga escala, ideal para produtores que buscam maior rendimento e uniformidade nutricional em campo. Oferece melhor aproveitamento do nitrogênio e enxofre com efeito prolongado.",
      composition: ["Ureia (90%)", "Sulfato de amônio (10%)"],
      benefits: [
        "Eficiência comprovada em laboratório e campo",
        "Estabilidade química e física",
        "Alta pureza e baixo teor de umidade",
        "Aumenta a produtividade das culturas",
        "Compatível com outros insumos",
      ],
      application:
        "Cultivos extensivos e de alta demanda nutricional (milho, cana, algodão e cereais). Pode ser aplicado a lanço, em linhas ou misturado ao solo.",
      presentations: ["Saco 50 kg"],
      efficiency: 5,
    },
    {
      id: 304,
      name: "FARTUREIA Big Bag 500 kg",
      category: "fartureia",
      imageSrc: "/Packs.png",
      description:
        "Soluções para grandes propriedades e distribuidores, oferecendo a mesma eficiência da linha em embalagens industriais. Ideal para operações logísticas otimizadas e para abastecimento direto no campo.",
      composition: ["Ureia (90%)", "Sulfato de amônio (10%)"],
      benefits: [
        "Logística facilitada e menor custo por tonelada",
        "Homogeneidade do produto em larga escala",
        "Redução de perdas e manuseio seguro",
        "Alta pureza e estabilidade durante o armazenamento",
      ],
      application: "Grandes lavouras e centros de distribuição com operações em larga escala.",
      presentations: ["Big Bag 500 kg"],
      efficiency: 5,
    },
    {
      id: 305,
      name: "FARTUREIA Big Bag 1.000 kg",
      category: "fartureia",
      imageSrc: "/Packs.png",
      description:
        "Soluções para grandes propriedades e distribuidores, oferecendo a mesma eficiência da linha em embalagens industriais. Ideal para operações logísticas otimizadas e para abastecimento direto no campo.",
      composition: ["Ureia (90%)", "Sulfato de amônio (10%)"],
      benefits: [
        "Logística facilitada e menor custo por tonelada",
        "Homogeneidade do produto em larga escala",
        "Redução de perdas e manuseio seguro",
        "Alta pureza e estabilidade durante o armazenamento",
      ],
      application: "Grandes lavouras e centros de distribuição com operações em larga escala.",
      presentations: ["Big Bag 1.000 kg"],
      efficiency: 5,
    },
  ]

  const categories = [
    { id: 'todos', name: 'Todos os Produtos' },
    { id: 'fartureia', name: 'FARTUREIA' }
  ]

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const setCategory = (id: string) => {
    setSelectedCategory(id)
    const params = new URLSearchParams(window.location.search)
    if (id === 'todos') {
      params.delete('categoria')
    } else {
      params.set('categoria', id)
    }
    const q = params.toString()
    const url = q ? `?${q}` : window.location.pathname
    window.history.replaceState({}, '', url)
  }

  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('categoria')
    const valid = ['todos','fartureia']
    if (cat && valid.includes(cat) && cat !== selectedCategory) {
      setSelectedCategory(cat)
    }
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
            Apresentamos a linha <strong>FARTUREIA</strong> em diferentes embalagens para atender todas as
            necessidades de manejo, com eficiência nutricional e alto rendimento.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
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
                  />
                </div>
              </div>
              <div className="px-6 pt-4">
                <h3 className="text-xl font-bold text-fartura-green-800">{product.name}</h3>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                
                {product.composition && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-fartura-green-800 mb-2">Composição:</h4>
                    <ul className="space-y-1">
                      {product.composition.map((item: string, index: number) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-fartura-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="font-semibold text-fartura-green-800 mb-2">Benefícios:</h4>
                  <ul className="space-y-1">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-fartura-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-fartura-green-800 mb-2">Aplicação:</h4>
                  <p className="text-sm text-gray-600">{product.application}</p>
                </div>

                {product.presentations && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-fartura-green-800 mb-2">Apresentações:</h4>
                    <p className="text-sm text-gray-600">{product.presentations.join(' • ')}</p>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Eficiência:</span>
                    <div className="flex space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i < product.efficiency ? 'bg-fartura-green-600' : 'bg-gray-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setSelectedProduct(product)} className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
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
                  <Image src={selectedProduct.imageSrc} alt={selectedProduct.name} fill sizes="160px" className="object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fartura-green-800 mb-2">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{selectedProduct.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold text-fartura-green-800 mb-2">Benefícios</h4>
                  <ul className="space-y-1">
                    {selectedProduct.benefits.map((b: string, i: number) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-fartura-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-fartura-green-800 mb-2">Aplicação</h4>
                  <p className="text-sm text-gray-600">{selectedProduct.application}</p>
                </div>
              </div>
              {selectedProduct.composition && (
                <div className="mt-4">
                  <h4 className="font-semibold text-fartura-green-800 mb-2">Composição</h4>
                  <ul className="space-y-1">
                    {selectedProduct.composition.map((c: string, i: number) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-fartura-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedProduct.presentations && (
                <div className="mt-4">
                  <h4 className="font-semibold text-fartura-green-800 mb-2">Apresentações</h4>
                  <p className="text-sm text-gray-600">{selectedProduct.presentations.join(' • ')}</p>
                </div>
              )}
              {selectedProduct.dosage && (
                <div className="mt-4">
                  <h4 className="font-semibold text-fartura-green-800 mb-2">Dosagem</h4>
                  <p className="text-sm text-gray-600">{selectedProduct.dosage}</p>
                </div>
              )}
              {selectedProduct.safety && (
                <div className="mt-4">
                  <h4 className="font-semibold text-fartura-green-800 mb-2">Segurança</h4>
                  <p className="text-sm text-gray-600">{selectedProduct.safety}</p>
                </div>
              )}
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
