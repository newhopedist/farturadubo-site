import { CheckCircle2, XCircle, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function Comparison() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-fartura-green-600 tracking-wide uppercase">
            Não jogue dinheiro fora
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A Evolução da Ureia Agrícola
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Entenda por que produtores de todo o Brasil estão trocando a ureia convencional pela tecnologia da Fartureia.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Card Ureia Comum (O Problema) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 relative opacity-90 hover:opacity-100 transition-opacity">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 text-gray-600 px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide">
                Ureia Convencional
              </div>
              <h3 className="text-2xl font-bold text-gray-700 text-center mt-4 mb-2">O Passado</h3>
              <p className="text-center text-gray-500 mb-8">Tecnologia antiga com altas perdas</p>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium text-gray-900">Alta Volatilização</p>
                    <p className="text-gray-500">Grande parte do Nitrogênio evapora e se perde no ar antes da planta absorver.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium text-gray-900">Apenas Nitrogênio (46%)</p>
                    <p className="text-gray-500">Fornece apenas um nutriente, limitando o potencial produtivo.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium text-gray-900">Dependência Climática</p>
                    <p className="text-gray-500">Precisa de chuva imediata ou incorporação mecânica para funcionar bem.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Card Fartureia (A Solução) */}
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
              
              <h3 className="text-2xl font-bold text-fartura-green-700 text-center mt-4 mb-2">O Futuro</h3>
              <p className="text-center text-fartura-green-600 mb-8 font-medium">Alta Performance e Máxima Absorção</p>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-bold text-gray-900">Nitrogênio + Enxofre (41% + 4%)</p>
                    <p className="text-gray-600">Sinergia perfeita: o Enxofre potencializa a absorção do Nitrogênio pela planta.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <ShieldCheck className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-bold text-gray-900">Perdas Reduzidas</p>
                    <p className="text-gray-600">Tecnologia que reduz drasticamente a volatilização. O adubo fica no solo, não no ar.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-bold text-gray-900">Mais Vigor e Proteína</p>
                    <p className="text-gray-600">O Enxofre é essencial para formar proteínas e clorofila, deixando a lavoura mais verde e forte.</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10">
                <Link 
                  href="/produtos" 
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-md text-white bg-fartura-green-600 hover:bg-fartura-green-700 md:text-lg md:px-10 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Quero Mais Produtividade
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