'use client'
import Link from 'next/link'
import Image from 'next/image'
import { brand } from '../lib/brand'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 md:pt-40 pb-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${brand.heroSrc})`, minHeight: '520px' }}
      aria-label="Imagem de destaque FARTURADUBO"
      role="img"
    >
      <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent pointer-events-none" />
      {/* Camada de logo sobre a imagem de fundo */}
      {brand.heroLogoSrc && (
        <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-95">
          <div className="relative h-10 md:h-12 w-40">
            <Image src="/logo-branco.webp" alt="Logomarca" fill sizes="160px" className="object-contain" priority />
          </div>
        </div>
      )}

      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fartura-green-900 mb-4 md:mb-6">
              Fertilizantes de
              <span className="text-fartura-green-600 block">Alta Performance</span>
            </h1>
            <p className="text-base md:text-lg text-white mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Maximize sua produtividade com fertilizantes <strong>FARTURADUBO</strong>. Tecnologia avançada
              para resultados excepcionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Link href="#products" aria-label="Ir para seção de produtos" className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors shadow-lg" onClick={() => {
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
                className="bg-white border-2 border-fartura-green-600 text-fartura-green-600 hover:bg-fartura-green-600 hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors shadow-lg"
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
          
        </div>
      </div>
      
      {/* Spacer to ensure full viewport coverage under fixed header */}
      <div className="h-8" />
    </section>
  )
}
