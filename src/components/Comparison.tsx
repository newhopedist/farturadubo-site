import { CheckCircle2, ArrowRight, TrendingUp, ShieldCheck, Info } from 'lucide-react'
import Link from 'next/link'

export default function Comparison() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            A Ciência da Produtividade
          </h2>
          <div className="w-24 h-1 bg-fartura-green-500 mx-auto mb-8"></div>
          <p className="max-w-3xl text-xl text-gray-600 mx-auto leading-relaxed">
            Entenda como a evolução tecnológica dos fertilizantes nitrogenados transforma o resultado da sua lavoura.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Lado Esquerdo: O Contexto Tradicional */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gray-200 rounded-full"></div>
            <div className="pl-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                Ureia Convencional
              </h3>
              <p className="text-gray-600 mb-6 md:mb-8 italic text-sm md:text-base">
                A fonte nitrogenada mais utilizada na agricultura mundial.
              </p>
              
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h4 className="font-semibold text-gray-900 text-base md:text-lg mb-1 md:mb-2">Alta Concentração de Nitrogênio</h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Com 46% de Nitrogênio, é uma fonte concentrada e eficiente para o fornecimento deste nutriente essencial.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 text-base md:text-lg mb-1 md:mb-2">Desafios de Manejo</h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Devido à sua alta solubilidade e volatilidade, requer aplicação estratégica (previsão de chuvas ou incorporação) para evitar perdas significativas para a atmosfera.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-base md:text-lg mb-1 md:mb-2">Limitação Nutricional</h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Fornece exclusivamente Nitrogênio, exigindo complementação com outras fontes para suprir a necessidade de Enxofre.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: A Evolução Tecnológica */}
          <div className="relative group mt-8 lg:mt-0">
            <div className="absolute -left-3 md:-left-4 top-0 w-0.5 md:w-1 h-full bg-gradient-to-b from-fartura-green-400 to-fartura-green-600 rounded-full shadow-lg shadow-fartura-green-200/50"></div>
            <div className="pl-6 md:pl-8 transition-all duration-300 hover:pl-8 md:hover:pl-10">
              <h3 className="text-xl md:text-2xl font-bold text-fartura-green-700 mb-4 flex items-center">
                <span className="bg-fartura-green-600 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base mr-3 md:mr-4 shadow-md font-bold flex-shrink-0">2</span>
                Tecnologia Fartureia
              </h3>
              <p className="text-fartura-green-800 mb-6 md:mb-8 font-medium text-base md:text-lg border-l-4 border-fartura-green-200 pl-4 py-2 bg-fartura-green-50 rounded-r-lg">
                A evolução que integra eficiência e nutrição balanceada.
              </p>
              
              <div className="space-y-6 md:space-y-8 bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-fartura-green-100 transform transition-transform hover:-translate-y-1 duration-300">
                <div>
                  <h4 className="font-semibold text-fartura-green-900 text-base md:text-lg mb-2 flex items-center">
                    <div className="bg-fartura-green-100 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3 flex-shrink-0">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-fartura-green-600" />
                    </div>
                    Sinergia N + S
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-10 md:pl-12">
                    A combinação de 41% de Nitrogênio com 4% de Enxofre cria uma interação positiva onde o Enxofre potencializa a absorção do Nitrogênio pela planta, resultando em maior aproveitamento.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-fartura-green-900 text-base md:text-lg mb-2 flex items-center">
                    <div className="bg-fartura-green-100 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3 flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-fartura-green-600" />
                    </div>
                    Estabilidade e Segurança
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-10 md:pl-12">
                    Garante que o produto fique por mais tempo no solo.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-fartura-green-900 text-base md:text-lg mb-2 flex items-center">
                    <div className="bg-fartura-green-100 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-fartura-green-600" />
                    </div>
                    Fisiologia da Planta
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-10 md:pl-12">
                    O Enxofre é fundamental para a síntese de aminoácidos e proteínas. Plantas bem nutridas com N+S apresentam maior vigor, folhas mais verdes e maior potencial produtivo.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}