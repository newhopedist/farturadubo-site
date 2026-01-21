'use client'

import { useEffect, useState } from 'react'
import { FileDown, X } from 'lucide-react'
import { brand } from '@/lib/brand'

interface PortfolioDownloadModalProps {
  productTitle?: string
  productPortfolioUrl?: string
  genericPortfolioUrl?: string
}

export default function PortfolioDownloadModal({
  productTitle,
  productPortfolioUrl,
  genericPortfolioUrl,
}: PortfolioDownloadModalProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const key = 'portfolio_prompt_shown'
    const shown = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
    if (!shown) {
      const timer = setTimeout(() => {
        setOpen(true)
        setTimeout(() => setMounted(true), 20)
        try {
          window.localStorage.setItem(key, '1')
        } catch {}
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const genericUrl =
    genericPortfolioUrl ||
    process.env.NEXT_PUBLIC_PORTFOLIO_URL ||
    '/DOCS UREIA/Apresentação Fartureia.pdf'

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-black/50 via-black/40 to-fartura-green-800/40 backdrop-blur-sm`}
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-title"
        className={`relative z-10 w-[92%] max-w-xl transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
      >
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative p-6 bg-gradient-to-br from-fartura-green-700 via-fartura-green-600 to-fartura-green-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={brand.heroLogoSrc} alt={brand.alt} className="h-8 w-auto rounded-md bg-white/10 p-1" />
                <h3 id="portfolio-title" className="text-white font-bold text-lg">
                  Baixe nosso portfólio
                </h3>
              </div>
              <button
                aria-label="Fechar"
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="mt-2 text-white/80 text-sm">
              Materiais oficiais com especificações, aplicações e diferenciais.
            </p>
          </div>

          <div className="bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productPortfolioUrl && (
                <a
                  href={productPortfolioUrl}
                  download={productTitle ? `${productTitle.replace(/\s+/g, '-').toLowerCase()}-portfolio.pdf` : 'portfolio.pdf'}
                  className="group rounded-2xl border border-fartura-green-200 bg-gradient-to-br from-fartura-green-50 to-white p-4 flex flex-col gap-3 hover:shadow-lg hover:border-fartura-green-400 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-fartura-green-100 text-fartura-green-700 p-2">
                        <FileDown className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-gray-900">
                        {`Portfólio de ${productTitle || 'produto'}`}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-fartura-green-700 bg-fartura-green-100 px-2 py-1 rounded-full">
                      PDF
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">
                    Especificações técnicas, aplicações e benefícios.
                  </span>
                </a>
              )}

              <a
                href={genericUrl}
                download="farturadubo-portfolio.pdf"
                className="group rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4 flex flex-col gap-3 hover:shadow-lg hover:border-blue-400 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-100 text-blue-700 p-2">
                      <FileDown className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-900">
                      Baixe nosso portfólio
                    </span>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                    PDF
                  </span>
                </div>
                <span className="text-xs text-gray-600">
                  Visão geral da linha e da marca.
                </span>
              </a>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              <img src={brand.heroPackSrc} alt="Produtos FARTURADUBO" className="h-12 w-auto" />
            </div>
            <p className="mt-3 text-[11px] text-gray-500 text-center">
              Arquivo PDF. Abrirá em nova aba.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
