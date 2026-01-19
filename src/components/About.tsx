import Image from 'next/image'
import { brand } from '@/lib/brand'

export default function About() {
  return (
    <section id="about" className="py-12 md:py-20 bg-white scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-fartura-green-900 mb-4 md:mb-6">
              Quem Somos
            </h2>
            <div className="w-20 h-1 bg-fartura-green-600 mb-8"></div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Especializada na comercialização de fertilizantes de alta qualidade, 
              comprometida com a sustentabilidade e a produtividade agrícola, oferecendo soluções 
              que maximizam o rendimento das lavouras com tecnologia avançada.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Com foco em inovação e qualidade, desenvolvemos produtos de alta pureza 
              garantindo máxima eficiência nutricional e resultados superiores em produtividade para 
              agricultores que buscam excelência no campo.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-lg border border-fartura-green-200">
                <div className="text-lg font-bold text-fartura-green-600 mb-1">Logística</div>
                <div className="text-sm text-gray-600">Entregas em todo o Brasil</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg border border-fartura-green-200">
                <div className="text-lg font-bold text-fartura-green-600 mb-1">Qualidade</div>
                <div className="text-sm text-gray-600">Produtos Certificados</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-lg border border-fartura-green-200">
                <div className="text-lg font-bold text-fartura-green-600 mb-1">Suporte</div>
                <div className="text-sm text-gray-600">Atendimento Especializado</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg border border-fartura-green-200">
                <div className="text-lg font-bold text-fartura-green-600 mb-1">Parceria</div>
                <div className="text-sm text-gray-600">Compromisso com o Produtor</div>
              </div>
            </div>
          </div>
          
          <div className="relative h-full flex flex-col justify-between">
            <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-500 h-full">
              <div className="relative h-full w-full rounded-xl overflow-hidden min-h-[350px] md:min-h-[500px]">
                <Image
                  src="/fartureia-no-campo.webp"
                  alt="Aplicação de Fartureia no campo"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-bottom"
                  priority
                />
                
                <div className="absolute bottom-6 left-6 text-white drop-shadow-md">
                  <p className="font-bold text-base md:text-lg">Tecnologia em Campo</p>
                  <p className="text-xs md:text-sm opacity-90">Resultados reais para sua lavoura</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-xl shadow-lg p-4 md:p-6 border border-fartura-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-fartura-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-fartura-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-sm md:text-base text-fartura-green-800">Qualidade Garantida</div>
                  <div className="text-xs md:text-sm text-gray-600">Testado e aprovado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
