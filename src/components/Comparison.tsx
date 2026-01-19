import { CheckCircle2, ArrowRight, TrendingUp, ShieldCheck, Info } from 'lucide-react'
import Link from 'next/link'

export default function Comparison() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <span className="text-fartura-green-600 font-bold tracking-wider uppercase text-[10px] md:text-sm mb-1 md:mb-2 block">Inovação no Campo</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-fartura-green-900 mb-4 md:mb-6">
            A Ciência da Produtividade
          </h2>
          <div className="w-12 md:w-24 h-1 md:h-1.5 bg-gradient-to-r from-fartura-green-400 to-fartura-green-600 mx-auto mb-4 md:mb-8 rounded-full"></div>
          <p className="max-w-3xl text-xs sm:text-sm md:text-lg text-gray-600 mx-auto leading-relaxed">
            Entenda como a evolução tecnológica dos fertilizantes nitrogenados transforma o resultado da sua lavoura.
          </p>
        </div>

        {/* Forçando layout lado a lado mesmo no mobile (grid-cols-2) */}
        <div className="grid grid-cols-2 gap-3 md:gap-20 items-start">
          
          {/* Lado Esquerdo: O Contexto Tradicional */}
          <div className="relative group">
            <div className="absolute -left-2 md:-left-4 top-0 w-0.5 md:w-1 h-full bg-gray-200 rounded-full group-hover:bg-gray-300 transition-colors"></div>
            <div className="pl-3 md:pl-8 transition-all duration-300 hover:pl-4 md:hover:pl-10">
              <h3 className="text-sm md:text-2xl font-bold text-gray-800 mb-2 md:mb-4 flex items-center">
                <span className="bg-gray-200 text-gray-700 w-5 h-5 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-base mr-1.5 md:mr-4 shadow-sm font-bold flex-shrink-0">1</span>
                Ureia Convencional
              </h3>
              <p className="text-gray-600 mb-3 md:mb-8 italic text-[10px] md:text-base leading-tight">
                A fonte nitrogenada mais utilizada na agricultura mundial.
              </p>
              
              <div className="space-y-3 md:space-y-8">
                <div>
                  <h4 className="font-semibold text-gray-900 text-xs md:text-lg mb-0.5 md:mb-2 leading-tight">Alta Concentração de N</h4>
                  <p className="text-[10px] md:text-base text-gray-600 leading-tight">
                    Com 46% de N, é eficiente e concentrada.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 text-xs md:text-lg mb-0.5 md:mb-2 leading-tight">Desafios de Manejo</h4>
                  <p className="text-[10px] md:text-base text-gray-600 leading-tight">
                    Alta volatilidade exige aplicação estratégica para evitar perdas.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-xs md:text-lg mb-0.5 md:mb-2 leading-tight">Limitação Nutricional</h4>
                  <p className="text-[10px] md:text-base text-gray-600 leading-tight">
                    Só fornece Nitrogênio, exige complementação de Enxofre.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: A Evolução Tecnológica */}
          <div className="relative group mt-0">
            <div className="absolute -left-2 md:-left-4 top-0 w-0.5 md:w-1 h-full bg-gradient-to-b from-fartura-green-400 to-fartura-green-600 rounded-full shadow-lg shadow-fartura-green-200/50"></div>
            <div className="pl-3 md:pl-8 transition-all duration-300 hover:pl-4 md:hover:pl-10">
              <h3 className="text-sm md:text-2xl font-bold text-fartura-green-700 mb-2 md:mb-4 flex items-center">
                <span className="bg-fartura-green-600 text-white w-5 h-5 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-base mr-1.5 md:mr-4 shadow-md font-bold flex-shrink-0">2</span>
                Tecnologia Fartureia
              </h3>
              <p className="text-fartura-green-800 mb-3 md:mb-8 font-medium text-[10px] md:text-lg border-l-2 md:border-l-4 border-fartura-green-200 pl-2 md:pl-4 py-1 md:py-2 bg-fartura-green-50 rounded-r-lg leading-tight">
                Eficiência e nutrição balanceada.
              </p>
              
              <div className="space-y-3 md:space-y-8 bg-white p-2 md:p-6 rounded-xl shadow-xl border border-fartura-green-100 transform transition-transform hover:-translate-y-1 duration-300">
                <div>
                  <h4 className="font-semibold text-fartura-green-900 text-xs md:text-lg mb-1 md:mb-2 flex items-center leading-tight">
                    <div className="bg-fartura-green-100 p-1 md:p-2 rounded-lg mr-1.5 md:mr-3 flex-shrink-0">
                      <TrendingUp className="w-3 h-3 md:w-5 md:h-5 text-fartura-green-600" />
                    </div>
                    Sinergia N + S
                  </h4>
                  <p className="text-[10px] md:text-base text-gray-600 leading-tight pl-6 md:pl-12">
                    41% de N + 4% de S: O Enxofre potencializa a absorção do Nitrogênio.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-fartura-green-900 text-xs md:text-lg mb-1 md:mb-2 flex items-center leading-tight">
                    <div className="bg-fartura-green-100 p-1 md:p-2 rounded-lg mr-1.5 md:mr-3 flex-shrink-0">
                      <ShieldCheck className="w-3 h-3 md:w-5 md:h-5 text-fartura-green-600" />
                    </div>
                    Estabilidade
                  </h4>
                  <p className="text-[10px] md:text-base text-gray-600 leading-tight pl-6 md:pl-12">
                    Garante que o produto fique por mais tempo no solo.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-fartura-green-900 text-xs md:text-lg mb-1 md:mb-2 flex items-center leading-tight">
                    <div className="bg-fartura-green-100 p-1 md:p-2 rounded-lg mr-1.5 md:mr-3 flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 md:w-5 md:h-5 text-fartura-green-600" />
                    </div>
                    Fisiologia
                  </h4>
                  <p className="text-[10px] md:text-base text-gray-600 leading-tight pl-6 md:pl-12">
                    Plantas com maior vigor, mais verdes e maior potencial produtivo.
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