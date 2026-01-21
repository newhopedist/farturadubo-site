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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [selectedType, setSelectedType] = useState<'product' | 'generic'>('generic')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const selectedUrl = selectedType === 'product' && productPortfolioUrl ? productPortfolioUrl : genericUrl
  const selectedFilename =
    selectedType === 'product' && productTitle
      ? `${productTitle.replace(/\s+/g, '-').toLowerCase()}-portfolio.pdf`
      : 'farturadubo-portfolio.pdf'

  async function handleSubmit() {
    setError(null)
    if (!name.trim() || !email.trim() || !whatsapp.trim()) {
      setError('Preencha nome, e-mail e WhatsApp')
      return
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) {
      setError('E-mail inválido')
      return
    }
    setSubmitting(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          page: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
        }),
      })
      const a = document.createElement('a')
      a.href = selectedUrl
      a.download = selectedFilename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setOpen(false)
    } catch {
      setError('Não foi possível enviar. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-fartura-green-500"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-fartura-green-500"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-fartura-green-500"
                />
              </div>
              <div className="space-y-3">
                {productPortfolioUrl && (
                  <label className={`flex items-center justify-between w-full rounded-xl border px-4 py-3 cursor-pointer ${selectedType === 'product' ? 'border-fartura-green-400 bg-fartura-green-50' : 'border-fartura-green-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="portfolio"
                        checked={selectedType === 'product'}
                        onChange={() => setSelectedType('product')}
                      />
                      <span className="font-bold text-gray-900">
                        {`Portfólio de ${productTitle || 'produto'}`}
                      </span>
                    </div>
                    <div className="rounded-xl bg-fartura-green-100 text-fartura-green-700 p-2">
                      <FileDown className="w-5 h-5" />
                    </div>
                  </label>
                )}
                <label className={`flex items-center justify-between w-full rounded-xl border px-4 py-3 cursor-pointer ${selectedType === 'generic' ? 'border-blue-400 bg-blue-50' : 'border-blue-200 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="portfolio"
                      checked={selectedType === 'generic'}
                      onChange={() => setSelectedType('generic')}
                    />
                    <span className="font-bold text-gray-900">
                      Baixe nosso portfólio
                    </span>
                  </div>
                  <div className="rounded-xl bg-blue-100 text-blue-700 p-2">
                    <FileDown className="w-5 h-5" />
                  </div>
                </label>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

            <div className="mt-5 flex items-center justify-center">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-fartura-green-600 to-fartura-green-700 text-white shadow-lg hover:shadow-xl hover:from-fartura-green-700 hover:to-fartura-green-800 transition-all disabled:opacity-60"
              >
                <FileDown className="w-5 h-5" />
                {submitting ? 'Baixando...' : 'Baixar portfólio'}
              </button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              <img src={brand.heroPackSrc} alt="Produtos FARTURADUBO" className="h-12 w-auto" />
            </div>
            <p className="mt-3 text-[11px] text-gray-500 text-center">
              Ao clicar em baixar, seus dados são registrados e o download inicia.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
