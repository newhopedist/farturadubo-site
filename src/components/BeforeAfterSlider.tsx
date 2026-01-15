'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronsLeftRight } from 'lucide-react'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  alt: string
}

export default function BeforeAfterSlider({ beforeImage, afterImage, alt }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const x = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX
    const position = ((x - containerRect.left) / containerRect.width) * 100

    setSliderPosition(Math.min(Math.max(position, 0), 100))
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // Adaptando o evento global para a lógica local
        if (!containerRef.current) return
        const containerRect = containerRef.current.getBoundingClientRect()
        const position = ((e.clientX - containerRect.left) / containerRect.width) * 100
        setSliderPosition(Math.min(Math.max(position, 0), 100))
      }
    }
    
    // Touch events
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        if (!containerRef.current) return
        const containerRect = containerRef.current.getBoundingClientRect()
        const position = ((e.touches[0].clientX - containerRect.left) / containerRect.width) * 100
        setSliderPosition(Math.min(Math.max(position, 0), 100))
      }
    }

    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp)
      window.addEventListener('mousemove', handleGlobalMouseMove)
      window.addEventListener('touchend', handleGlobalMouseUp)
      window.addEventListener('touchmove', handleGlobalTouchMove)
    }

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('touchend', handleGlobalMouseUp)
      window.removeEventListener('touchmove', handleGlobalTouchMove)
    }
  }, [isDragging])

  return (
    <div 
      ref={containerRef}
      className="relative h-64 w-full rounded-xl overflow-hidden cursor-ew-resize select-none touch-none group"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      // Adicionamos onMouseMove local também para hover effect se não estiver arrastando
      onMouseMove={(e) => !isDragging && handleMove(e)}
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

      {/* Linha Divisória e Manipulador */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-fartura-green-600">
          <ChevronsLeftRight className="w-5 h-5" />
        </div>
      </div>
      
      {/* Instrução Flutuante (Desaparece ao interagir) */}
      <div className={`absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 text-gray-800 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-30 transition-opacity duration-300 pointer-events-none ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
        ARRASTE PARA COMPARAR
      </div>
    </div>
  )
}
