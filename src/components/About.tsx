import Image from 'next/image'
import { brand } from '@/lib/brand'

export default function About() {
  return (
    <section id="about" className="py-20 bg-white scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-fartura-green-900 mb-6">
              Quem Somos
            </h2>
            <div className="w-20 h-1 bg-fartura-green-600 mb-8"></div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              A FARTURADUBO é uma empresa especializada no desenvolvimento e comercialização de 
              fertilizantes de alta qualidade, comprometida com a sustentabilidade e a produtividade 
              agrícola brasileira.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Com foco em inovação e qualidade, desenvolvemos produtos que atendem às necessidades 
              específicas de cada cultura, maximizando o potencial produtivo e garantindo resultados 
              excepcionais para nossos clientes.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-fartura-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-fartura-green-600 mb-1">+500</div>
                <div className="text-sm text-gray-600">Clientes Satisfeitos</div>
              </div>
              <div className="bg-fartura-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-fartura-green-600 mb-1">15+</div>
                <div className="text-sm text-gray-600">Anos de Experiência</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 h-[28rem] flex items-center justify-center">
              <div className="w-[28rem] h-64 md:w-[36rem] md:h-80 relative">
                <Image
                  src={brand.heroPackSrc}
                  alt="Embalagens FARTURADUBO"
                  fill
                  sizes="(min-width: 768px) 576px, 448px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 border border-fartura-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-fartura-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-fartura-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-fartura-green-800">Qualidade Garantida</div>
                  <div className="text-sm text-gray-600">Testado e aprovado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
