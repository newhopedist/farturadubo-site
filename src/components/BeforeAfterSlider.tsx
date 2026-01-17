'use client'

import Image from 'next/image'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  alt: string
}

export default function BeforeAfterSlider({ beforeImage, afterImage, alt }: BeforeAfterSliderProps) {
  // Posição fixa em 50%
  const sliderPosition = 50

  return (
    <div 
      className="relative h-64 w-full rounded-xl overflow-hidden select-none group"
    >
      {/* Imagem DEPOIS (Fundo) */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={afterImage}
          alt={`Depois - ${alt}`}
          fill
          className="object-cover"
          draggable={false}
        />
        <div className="absolute bottom-4 right-4 bg-green-600/80 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm z-10">
          DEPOIS
        </div>
      </div>

      {/* Imagem ANTES (Sobreposta com Clip Path) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="relative w-full h-full">
          <Image 
            src={beforeImage} // Na prática vamos usar a mesma imagem com filtro CSS
            alt={`Antes - ${alt}`}
            fill
            className="object-cover"
            draggable={false}
          />
          {/* Filtro de "Planta Doente" aplicado via CSS */}
          <div className="absolute inset-0 bg-yellow-900/30 mix-blend-multiply backdrop-sepia-[.6] backdrop-brightness-90" />
          
          <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm z-10">
            ANTES
          </div>
        </div>
      </div>

      {/* Linha Divisória (Estática) */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
        style={{ left: `${sliderPosition}%` }}
      />
    </div>
  )
}
