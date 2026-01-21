import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Clock, Ruler, Package } from 'lucide-react'
import { productContents } from '@/lib/product-content'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import ProductBuyingSection from '@/components/ProductBuyingSection'
import PortfolioDownloadModal from '@/components/PortfolioDownloadModal'

// Função auxiliar para mapear slugs para imagens (já que as imagens não estão no arquivo de conteúdo)
const getProductImage = (slug: string) => {
  if (slug.includes('5kg')) return '/fartureia-5kg.png'
  if (slug.includes('25kg')) return '/fartureia-25kg.png'
  if (slug.includes('500kg')) return '/bigbag-500kg.webp'
  if (slug.includes('1000kg')) return '/bigbag-1000kg.webp'
  return '/fartureia-25kg.png'
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
          
          {/* Título no Mobile (Visível apenas em telas pequenas, acima da imagem) */}
          <div className="block lg:hidden p-6 pb-0">
            <span className="inline-block bg-fartura-green-100 text-fartura-green-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide mb-2 w-fit">
              {content.targetAudience}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">
              {content.title}
            </h1>
            <p className="text-sm text-gray-500 font-light">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Coluna da Esquerda: Imagem e Specs */}
            <div className="bg-gray-100 p-6 lg:p-12 flex flex-col items-center justify-center relative">
              <div className="relative w-full h-[280px] sm:h-[350px] lg:h-[500px] mb-6 lg:mb-8">
                <Image
                  src={productImage}
                  alt={content.title}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-500"
                  priority
                />
                {/* Destaque do Grânulo */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-fartura-green-500 shadow-xl overflow-hidden bg-white z-10 group cursor-zoom-in">
                  <div className="relative w-full h-full">
                    <Image
                      src="/img-produto-ureia.webp"
                      alt="Detalhe do Grânulo Fartureia"
                      fill
                      className="object-cover scale-150 group-hover:scale-[2.0] transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-0 right-0 text-center bg-black/60 text-white text-[8px] md:text-[10px] font-bold py-1 backdrop-blur-sm">
                      TECNOLOGIA N+S
                    </div>
                  </div>
                </div>
              </div>

              {/* Especificações Rápidas */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-md">
                <div className="bg-white p-2 md:p-4 rounded-xl shadow-sm text-center">
                  <Ruler className="w-4 h-4 md:w-6 md:h-6 text-fartura-green-600 mx-auto mb-1 md:mb-2" />
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">Peso</p>
                  <p className="font-bold text-gray-900 text-xs md:text-base">{content.specs.weight}</p>
                </div>
                <div className="bg-white p-2 md:p-4 rounded-xl shadow-sm text-center">
                  <Package className="w-4 h-4 md:w-6 md:h-6 text-fartura-green-600 mx-auto mb-1 md:mb-2" />
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">Tipo</p>
                  <p className="font-bold text-gray-900 text-[10px] md:text-sm">{content.specs.type}</p>
                </div>
                <div className="bg-white p-2 md:p-4 rounded-xl shadow-sm text-center">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 text-fartura-green-600 mx-auto mb-1 md:mb-2" />
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">Resultado</p>
                  <p className="font-bold text-gray-900 text-xs md:text-base">{content.results.days > 0 ? `${content.results.days} dias` : 'Imediato'}</p>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: Conteúdo */}
            <div className="p-6 lg:p-12 flex flex-col">
              <PortfolioDownloadModal
                productTitle={content.title}
                productPortfolioUrl={content.portfolioUrl}
              />
              {/* Título no Desktop (Escondido no Mobile) */}
              <div className="hidden lg:block">
                <span className="inline-block bg-fartura-green-100 text-fartura-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 w-fit">
                  {content.targetAudience}
                </span>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {content.title}
                </h1>
                <p className="text-xl text-gray-500 mb-8 font-light">
                  {content.subtitle}
                </p>
              </div>

              <div className="prose prose-green max-w-none mb-8 text-sm md:text-base text-gray-600 leading-relaxed">
                {content.description}
              </div>

              {/* Benefícios */}
              <div className="mb-8">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 border-l-4 border-fartura-green-500 pl-4">
                  Por que escolher?
                </h3>
                <div className="space-y-4">
                  {content.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-fartura-green-50 p-2 md:p-3 rounded-lg mr-3 flex-shrink-0">
                        <benefit.icon className="w-4 h-4 md:w-6 md:h-6 text-fartura-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm md:text-base">{benefit.title}</h4>
                        <p className="text-xs md:text-sm text-gray-600">{benefit.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seção de Compra Interativa (Agora apenas Aviso + Contato) */}
              <ProductBuyingSection 
                product={{
                  slug: content.slug,
                  title: content.title,
                  price: content.price,
                  cta: content.cta
                }} 
              />

            </div>
          </div>
          
          {/* Seção Inferior: Guia e Resultados */}
          <div className="bg-fartura-green-900 text-white p-6 lg:p-16">
            {/* ... mantém o conteúdo anterior ... */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
              
              {/* Como Aplicar */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                  <span className="bg-fartura-green-700 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                  Como Aplicar
                </h3>
                <div className="space-y-3">
                  {content.applicationGuide.steps.map((step, index) => (
                    <div key={index} className="flex items-start bg-fartura-green-800/50 p-3 md:p-4 rounded-xl border border-fartura-green-700">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-400 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-200 text-sm md:text-base">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resultado Antes e Depois */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                  <span className="bg-fartura-green-700 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Resultado Esperado
                </h3>
                
                <div className="bg-white rounded-2xl p-4 md:p-6 text-gray-900">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-2 md:p-4 bg-gray-100 rounded-xl">
                      <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1">Antes</p>
                      <p className="text-xs md:text-sm text-gray-600 leading-tight">{content.results.before}</p>
                    </div>
                    <div className="text-center p-2 md:p-4 bg-green-50 rounded-xl border border-green-200">
                      <p className="text-[10px] md:text-xs font-bold text-green-600 uppercase mb-1">Depois ({content.results.days > 0 ? `${content.results.days}d` : 'Já'})</p>
                      <p className="text-xs md:text-sm text-gray-800 font-medium leading-tight">{content.results.after}</p>
                    </div>
                  </div>
                  
                  {/* Componente Slider Interativo */}
                  <BeforeAfterSlider 
                    beforeImage="/panta com ureia.webp"
                    afterImage="/panta com ureia.webp"
                    alt="Resultado na planta"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
