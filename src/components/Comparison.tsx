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
              <p className="text-gray-600 mb-8 italic">
                A fonte nitrogenada mais utilizada na agricultura mundial.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">Alta Concentração de Nitrogênio</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Com 46% de Nitrogênio, é uma fonte concentrada e eficiente para o fornecimento deste nutriente essencial.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">Desafios de Manejo</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Devido à sua alta solubilidade e volatilidade, requer aplicação estratégica (previsão de chuvas ou incorporação) para evitar perdas significativas para a atmosfera.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">Limitação Nutricional</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Fornece exclusivamente Nitrogênio, exigindo complementação com outras fontes para suprir a necessidade de Enxofre.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: A Evolução Tecnológica */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-fartura-green-500 rounded-full shadow-lg shadow-fartura-green-200"></div>
            <div className="pl-8">
              <h3 className="text-2xl font-bold text-fartura-green-700 mb-4 flex items-center">
                <span className="bg-fartura-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                Tecnologia Fartureia
              </h3>
              <p className="text-fartura-green-800 mb-8 font-medium">
                A evolução que integra eficiência e nutrição balanceada.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-fartura-green-900 text-lg mb-2 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-fartura-green-600" />
                    Sinergia N + S
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    A combinação de 41% de Nitrogênio com 4% de Enxofre cria uma interação positiva onde o Enxofre potencializa a absorção do Nitrogênio pela planta, resultando em maior aproveitamento.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-fartura-green-900 text-lg mb-2 flex items-center">
                    <div className="bg-fartura-green-100 p-2 rounded-lg mr-3">
                      <ShieldCheck className="w-5 h-5 text-fartura-green-600" />
                    </div>
                    Estabilidade e Segurança
                  </h4>
                  <p className="text-gray-600 leading-relaxed pl-12">
                    Garante que o produto fique por mais tempo no solo.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-fartura-green-900 text-lg mb-2 flex items-center">
                    <div className="bg-fartura-green-100 p-2 rounded-lg mr-3">
                      <CheckCircle2 className="w-5 h-5 text-fartura-green-600" />
                    </div>
                    Fisiologia da Planta
                  </h4>
                  <p className="text-gray-600 leading-relaxed pl-12">
                    O Enxofre é fundamental para a síntese de aminoácidos e proteínas. Plantas bem nutridas com N+S apresentam maior vigor, folhas mais verdes e maior potencial produtivo.
                  </p>
                </div>
              </div>

              {/* <div className="mt-12 p-6 bg-fartura-green-50 rounded-lg border border-fartura-green-100">
                <div className="flex items-start">
                  <Info className="w-6 h-6 text-fartura-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-fartura-green-800 mb-2">Resultado no Campo</h5>
                    <p className="text-sm text-gray-700">
                      Produtores que adotam a tecnologia Fartureia relatam não apenas aumento de produtividade, mas também maior sanidade da lavoura devido ao equilíbrio nutricional proporcionado pelo Enxofre.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}