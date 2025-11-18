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
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-fartura-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-fartura-green-600 mb-1">90%</div>
                <div className="text-sm text-gray-600">Pureza da Ureia na FARTUREIA</div>
              </div>
              <div className="bg-fartura-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-fartura-green-600 mb-1">5-1000</div>
                <div className="text-sm text-gray-600">kg - Variedade de Embalagens</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-fartura-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-fartura-green-600 mb-1">N-S</div>
                <div className="text-sm text-gray-600">Fórmula Especializada</div>
              </div>
              <div className="bg-fartura-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-fartura-green-600 mb-1">10%</div>
                <div className="text-sm text-gray-600">Sulfato de Amônio</div>
              </div>
            </div>

            {/* Certifications and Technical Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-fartura-green-900 mb-4">Certificações e Padrões de Qualidade</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-fartura-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-fartura-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-fartura-green-800 mb-1">Qualidade Garantida</h4>
                  <p className="text-xs text-gray-600">Processos rigorosos de controle de qualidade</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-fartura-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-fartura-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-fartura-green-800 mb-1">Tecnologia Avançada</h4>
                  <p className="text-xs text-gray-600">Formulações modernas e eficientes</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-fartura-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-fartura-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-fartura-green-800 mb-1">Sustentabilidade</h4>
                  <p className="text-xs text-gray-600">Compromisso com o meio ambiente</p>
                </div>
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
