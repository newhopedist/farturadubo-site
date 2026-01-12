import { CheckCircle2, ArrowRight, TrendingUp, ShieldCheck, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Comparison() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-fartura-green-600 tracking-wide uppercase">
            Compare e Escolha
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Entenda as Diferenças
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Veja as características de cada tecnologia para decidir o melhor para o seu manejo.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Card Ureia Comum */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 relative opacity-90 hover:opacity-100 transition-opacity">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 text-gray-600 px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide border border-gray-200">
                Ureia Convencional
              </div>
              <h3 className="text-2xl font-bold text-gray-700 text-center mt-4 mb-2">Tradicional</h3>
              <p className="text-center text-gray-500 mb-8">A base nitrogenada do mercado</p>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium text-gray-900">Alta Concentração (46% N)</p>
                    <p className="text-gray-500">Excelente fonte de Nitrogênio puro para a lavoura.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium text-gray-900">Volatilização Natural</p>
                    <p className="text-gray-500">Requer cuidados no manejo para evitar perdas por evaporação.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium text-gray-900">Dependência Climática</p>
                    <p className="text-gray-500">Ideal aplicar com previsão de chuva ou possibilidade de incorporação.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Card Fartureia */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-fartura-green-500 p-8 relative transform scale-105 z-10">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-fartura-green-600 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide shadow-lg">
                FARTUREIA
              </div>
              <div className="absolute top-4 right-4">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-fartura-green-700 text-center mt-4 mb-2">Tecnologia Potencializada</h3>
              <p className="text-center text-fartura-green-600 mb-8 font-medium">Nitrogênio + Enxofre Estabilizados</p>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-bold text-gray-900">Sinergia N + S (41% + 4%)</p>
                    <p className="text-gray-600">O Enxofre aumenta a eficiência na absorção do Nitrogênio.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <ShieldCheck className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-bold text-gray-900">Segurança na Aplicação</p>
                    <p className="text-gray-600">Tecnologia que reduz perdas, permitindo maior flexibilidade no manejo.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-bold text-gray-900">Nutrição Mais Completa</p>
                    <p className="text-gray-600">Fornece dois macronutrientes essenciais em um único grânulo.</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10">
                <Link 
                  href="/produtos" 
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-md text-white bg-fartura-green-600 hover:bg-fartura-green-700 md:text-lg md:px-10 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Experimentar Fartureia
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <p className="text-center text-xs text-gray-400 mt-3">Disponível em 25kg e Big Bags</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}