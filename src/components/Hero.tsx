'use client'
import Link from 'next/link'
import Image from 'next/image'
import { brand } from '../lib/brand'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-20 md:pt-40 pb-12 bg-cover bg-center min-h-[350px] md:min-h-[520px]"
      style={{ backgroundImage: `url(${brand.heroSrc})`, backgroundPosition: 'center 30%' }}
      aria-label="Imagem de destaque FARTURADUBO"
      role="img"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent pointer-events-none" />
      {/* Camada de logo sobre a imagem de fundo - Agora sempre visível e menor no mobile */}
      {brand.heroLogoSrc && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-95">
          <div className="relative h-8 w-28 md:h-12 md:w-40">
            <Image src={`${brand.heroLogoSrc}?v=2`} alt="Logomarca" fill sizes="160px" className="object-contain" priority />
          </div>
        </div>
      )}

      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
        {/* Forçando layout lado a lado mesmo no mobile (grid-cols-2) */}
        <div className="grid grid-cols-2 items-center w-full gap-2 md:gap-8">
          <div className="text-left relative z-10">
            <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-fartura-green-900 mb-2 md:mb-6 leading-tight">
              Fertilizantes de
              <span className="text-fartura-green-600 block">Alta Performance</span>
            </h1>
            <p className="text-[10px] sm:text-sm md:text-lg text-fartura-green-800 mb-3 md:mb-8 leading-relaxed max-w-full font-medium">
              Maximize sua produtividade com fertilizantes <strong>FARTURADUBO</strong>. Tecnologia avançada
              para resultados excepcionais.
            </p>
            <div className="flex flex-col gap-2 justify-start">
              <Link href="#products" aria-label="Ir para seção de produtos" className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-[10px] sm:text-sm md:text-lg transition-colors shadow-lg text-center w-full sm:w-auto" onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'cta_click', { label: 'hero_products' })
                }
              }}>
                Conheça Nossos Produtos
              </Link>
              <a
                href="https://wa.me/5585991289449?text=Olá,%20tenho%20interesse%20nos%20fertilizantes%20FARTURADUBO"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir conversa no WhatsApp"
                className="bg-white border border-fartura-green-600 text-fartura-green-600 hover:bg-fartura-green-600 hover:text-white px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-[10px] sm:text-sm md:text-lg transition-colors shadow-lg text-center w-full sm:w-auto"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'cta_click', { label: 'hero_whatsapp' })
                  }
                }}
              >
                Fale com um Especialista
              </a>
            </div>
          </div>
          {/* Coluna vazia para permitir ver o fundo (homem no campo) */}
          <div className="h-full w-full"></div>
        </div>
      </div>
      
      {/* Spacer to ensure full viewport coverage under fixed header */}
      <div className="h-8" />
    </section>
  )
}
