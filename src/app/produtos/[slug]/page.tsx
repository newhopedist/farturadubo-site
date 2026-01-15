import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle2, ShoppingCart, MessageCircle, Clock, Ruler, Package } from 'lucide-react'
import { productContents } from '@/lib/product-content'

// Função auxiliar para mapear slugs para imagens (já que as imagens não estão no arquivo de conteúdo)
const getProductImage = (slug: string) => {
  if (slug.includes('5kg')) return '/5kg.webp'
  if (slug.includes('25kg')) return '/25kg.webp'
  if (slug.includes('500kg')) return '/bigbag-500kg.webp'
  if (slug.includes('1000kg')) return '/bigbag-1000kg.webp'
  return '/25kg.webp'
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const content = productContents[params.slug]

  if (!content) {
    return notFound()
  }

  const productImage = getProductImage(content.slug)

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      {/* Navegação Voltar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link href="/#products" className="inline-flex items-center text-fartura-green-600 hover:text-fartura-green-800 font-medium transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Produtos
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Coluna da Esquerda: Imagem e Specs */}
            <div className="bg-gray-100 p-8 lg:p-12 flex flex-col items-center justify-center relative">
              <div className="relative w-full h-[400px] lg:h-[500px] mb-8">
                <Image
                  src={productImage}
                  alt={content.title}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Especificações Rápidas */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <Ruler className="w-6 h-6 text-fartura-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 uppercase font-bold">Peso</p>
                  <p className="font-bold text-gray-900">{content.specs.weight}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <Package className="w-6 h-6 text-fartura-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 uppercase font-bold">Tipo</p>
                  <p className="font-bold text-gray-900 text-sm">{content.specs.type}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <Clock className="w-6 h-6 text-fartura-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 uppercase font-bold">Resultado</p>
                  <p className="font-bold text-gray-900">{content.results.days > 0 ? `${content.results.days} dias` : 'Imediato'}</p>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: Conteúdo */}
            <div className="p-8 lg:p-12 flex flex-col">
              <span className="inline-block bg-fartura-green-100 text-fartura-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 w-fit">
                {content.targetAudience}
              </span>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {content.title}
              </h1>
              <p className="text-xl text-gray-500 mb-8 font-light">
                {content.subtitle}
              </p>

              <div className="prose prose-green max-w-none mb-10 text-gray-600 leading-relaxed">
                {content.description}
              </div>

              {/* Benefícios */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-6 border-l-4 border-fartura-green-500 pl-4">
                  Por que escolher?
                </h3>
                <div className="space-y-6">
                  {content.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-fartura-green-50 p-3 rounded-lg mr-4 flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-fartura-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão de Ação (Sticky em mobile se quisesse, mas vamos deixar simples) */}
              <div className="mt-auto pt-8 border-t border-gray-100">
                <a
                  href={content.cta.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center ${
                    content.cta.type === 'mercadolivre'
                      ? 'bg-yellow-400 text-fartura-green-900 hover:bg-yellow-500'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {content.cta.type === 'mercadolivre' ? (
                    <ShoppingCart className="w-6 h-6 mr-3" />
                  ) : (
                    <MessageCircle className="w-6 h-6 mr-3" />
                  )}
                  {content.cta.text}
                </a>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Compra segura e entrega garantida para todo o Brasil.
                </p>
              </div>

            </div>
          </div>

          {/* Seção Inferior: Guia e Resultados */}
          <div className="bg-fartura-green-900 text-white p-8 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              
              {/* Como Aplicar */}
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <span className="bg-fartura-green-700 w-10 h-10 rounded-full flex items-center justify-center mr-4 text-sm">1</span>
                  Como Aplicar
                </h3>
                <div className="space-y-4">
                  {content.applicationGuide.steps.map((step, index) => (
                    <div key={index} className="flex items-start bg-fartura-green-800/50 p-4 rounded-xl border border-fartura-green-700">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-200">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resultado Antes e Depois */}
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <span className="bg-fartura-green-700 w-10 h-10 rounded-full flex items-center justify-center mr-4 text-sm">2</span>
                  Resultado Esperado
                </h3>
                
                <div className="bg-white rounded-2xl p-6 text-gray-900">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-100 rounded-xl">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">Antes</p>
                      <p className="text-sm text-gray-600">{content.results.before}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <p className="text-xs font-bold text-green-600 uppercase mb-2">Depois ({content.results.days > 0 ? `${content.results.days} dias` : 'Imediato'})</p>
                      <p className="text-sm text-gray-800 font-medium">{content.results.after}</p>
                    </div>
                  </div>
                  
                  {/* Imagem de Exemplo (Placeholder visual) */}
                  <div className="relative h-48 w-full rounded-xl overflow-hidden">
                    <Image 
                      src="/panta com ureia.webp" // Usando a imagem que temos
                      alt="Resultado na planta"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <p className="text-white font-medium text-sm">
                        * Imagem ilustrativa de resultado real em campo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
