'use client'

import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-fartura-green-50 to-fartura-green-100 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-fartura-green-900 mb-6">
              Fertilizantes de
              <span className="text-fartura-green-600 block">Alta Performance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Maximize sua produtividade agrícola com nossa linha premium de fertilizantes. 
              FARTURAMAX e FARTUREIA: tecnologia avançada para resultados excepcionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
                Conheça Nossos Produtos
              </button>
              <button className="border-2 border-fartura-green-600 text-fartura-green-600 hover:bg-fartura-green-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Fale com um Especialista
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-xl p-6 border border-fartura-green-200">
                <div className="h-48 bg-fartura-green-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-fartura-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xl">F</span>
                    </div>
                    <h3 className="text-xl font-bold text-fartura-green-800 mb-2">FARTURAMAX</h3>
                    <p className="text-sm text-gray-600">Fertilizante NPK premium com micronutrientes</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-fartura-green-600 font-semibold">Alta eficiência</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-fartura-green-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-fartura-green-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-fartura-green-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-fartura-green-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-fartura-green-600 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-xl p-6 border border-fartura-green-200">
                <div className="h-48 bg-fartura-green-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-fartura-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xl">F</span>
                    </div>
                    <h3 className="text-xl font-bold text-fartura-green-800 mb-2">FARTUREIA</h3>
                    <p className="text-sm text-gray-600">Fertilizante foliar de alta concentração</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-fartura-green-600 font-semibold">Absorção rápida</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-fartura-green-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-fartura-green-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-fartura-green-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-fartura-green-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-fartura-green-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-12 text-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current"></path>
        </svg>
      </div>
    </section>
  )
}