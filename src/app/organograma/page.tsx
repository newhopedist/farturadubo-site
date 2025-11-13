import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Organograma do Site | FARTURADUBO',
  description: 'Visão geral em organograma da estrutura do site FARTURADUBO para apresentação ao cliente.',
}

export default function OrganogramaPage() {
  const sections = [
    { name: 'Início', href: '/#home' },
    { name: 'Quem Somos', href: '/#about' },
    { name: 'Benefícios', href: '/#benefits' },
    { name: 'Produtos', href: '/#products' },
    { name: 'Contato', href: '/#contact' },
  ]

  const pages = [
    { name: 'Política de Privacidade', href: '/politica-de-privacidade' },
    { name: 'Termos de Uso', href: '/termos-de-uso' },
    { name: 'Mapa do Site', href: '/mapa-do-site' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-fartura-green-900 mb-2">Organograma do Site</h1>
          <p className="text-gray-700 mb-8">Estrutura visual do site para apresentação e navegação rápida.</p>

          <div className="flex flex-col items-center">
            <Link href="/" className="block bg-fartura-green-50 border border-fartura-green-200 rounded-xl px-6 py-4 text-fartura-green-800 font-semibold shadow-sm hover:bg-fartura-green-100 transition-colors">Home (/)</Link>

            <div className="w-px h-8 bg-fartura-green-200 my-2" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="bg-white border border-fartura-green-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-fartura-green-100 text-fartura-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2zm5-7h6v5H10v-5z"/></svg>
                  </div>
                  <h2 className="text-lg font-semibold text-fartura-green-800">Seções da Home</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sections.map((s) => (
                    <Link key={s.name} href={s.href} className="block border border-fartura-green-200 rounded-lg p-3 hover:border-fartura-green-400 hover:bg-fartura-green-50 transition-colors">
                      <span className="text-fartura-green-800 font-medium">{s.name}</span>
                      <div className="text-gray-500 text-xs">{s.href}</div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-fartura-green-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-fartura-green-100 text-fartura-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <h2 className="text-lg font-semibold text-fartura-green-800">Páginas</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pages.map((p) => (
                    <Link key={p.name} href={p.href} className="block border border-fartura-green-200 rounded-lg p-3 hover:border-fartura-green-400 hover:bg-fartura-green-50 transition-colors">
                      <span className="text-fartura-green-800 font-medium">{p.name}</span>
                      <div className="text-gray-500 text-xs">{p.href}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

