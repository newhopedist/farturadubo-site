'use client'

import { useState } from 'react'

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('todos')

  const products = [
    {
      id: 1,
      name: "FARTURAMAX NPK 20-10-10",
      category: "npk",
      description: "Fertilizante NPK premium com 20% de Nitrogênio, 10% de Fósforo e 10% de Potássio, enriquecido com micronutrientes essenciais.",
      benefits: ["Alta solubilidade", "Absorção rápida", "Resultados comprovados"],
      application: "Ideal para culturas de alta demanda nutricional",
      efficiency: 5
    },
    {
      id: 2,
      name: "FARTURAMAX NPK 15-15-15",
      category: "npk",
      description: "Fertilizante balanceado com igual proporção de NPK, perfeito para manutenção da nutrição das plantas.",
      benefits: ["Fórmula balanceada", "Crescimento uniforme", "Versátil"],
      application: "Adequado para diversas culturas",
      efficiency: 5
    },
    {
      id: 3,
      name: "FARTUREIA Foliar Plus",
      category: "foliar",
      description: "Fertilizante foliar de alta concentração com NPK e micronutrientes quelatizados para aplicação via foliar.",
      benefits: ["Absorção rápida", "Ação imediata", "Alta concentração"],
      application: "Aplicação foliar para correção rápida de deficiências",
      efficiency: 4
    },
    {
      id: 4,
      name: "FARTUREIA Micro Mix",
      category: "micronutrientes",
      description: "Mistura de micronutrientes essenciais (Zn, Fe, Mn, Cu, B, Mo) em forma quelatizada para máxima eficiência.",
      benefits: ["Micronutrientes quelatizados", "Prevenção de deficiências", "Alta disponibilidade"],
      application: "Essencial para culturas com alta demanda de micronutrientes",
      efficiency: 5
    },
    {
      id: 5,
      name: "FARTURAMAX Nitro 46",
      category: "nitrogenio",
      description: "Fertilizante nitrogenado de alta pureza com 46% de Nitrogênio, ideal para fases iniciais do desenvolvimento.",
      benefits: ["Alta concentração", "Rapidez na absorção", "Crescimento vegetativo"],
      application: "Perfeito para fase de crescimento vegetativo",
      efficiency: 4
    },
    {
      id: 6,
      name: "FARTUREIA Potássio 60",
      category: "potassio",
      description: "Fertilizante potássico com 60% de K₂O, essencial para formação de frutos e qualidade final da produção.",
      benefits: ["Alta concentração de K", "Formação de frutos", "Qualidade superior"],
      application: "Ideal para fase de frutificação",
      efficiency: 5
    }
  ]

  const categories = [
    { id: 'todos', name: 'Todos os Produtos' },
    { id: 'npk', name: 'Fertilizantes NPK' },
    { id: 'foliar', name: 'Foliares' },
    { id: 'micronutrientes', name: 'Micronutrientes' },
    { id: 'nitrogenio', name: 'Nitrogênio' },
    { id: 'potassio', name: 'Potássio' }
  ]

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-fartura-green-900 mb-4">
            Nossos Produtos
          </h2>
          <div className="w-20 h-1 bg-fartura-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Conheça nossa linha completa de fertilizantes de alta performance, 
            desenvolvidos para maximizar a produtividade da sua lavoura.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
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
              <div className="h-48 bg-fartura-green-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-fartura-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-2xl">F</span>
                  </div>
                  <h3 className="text-xl font-bold text-fartura-green-800">{product.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                
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
                  <button className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Saiba Mais
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}