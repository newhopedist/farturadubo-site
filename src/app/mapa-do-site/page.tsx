import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mapa do Site | FARTURADUBO',
  description: 'Mapa do Site FARTURADUBO com navegação rápida para todas as seções e páginas.',
}

const links = [
  { name: 'Início', href: '/#home' },
  { name: 'Quem Somos', href: '/#about' },
  { name: 'Benefícios', href: '/#benefits' },
  { name: 'Produtos', href: '/#products' },
  { name: 'Contato', href: '/#contact' },
  { name: 'Política de Privacidade', href: '/politica-de-privacidade' },
  { name: 'Termos de Uso', href: '/termos-de-uso' },
]

export default function MapaDoSitePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-fartura-green-900 mb-6">Mapa do Site</h1>
          <p className="text-gray-700 mb-8">Navegue rapidamente por todas as seções e páginas disponíveis.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((l) => (
              <Link key={l.name} href={l.href} className="block border border-fartura-green-200 rounded-lg p-4 hover:border-fartura-green-400 hover:bg-fartura-green-50 transition-colors">
                <span className="text-fartura-green-800 font-semibold">{l.name}</span>
                <div className="text-gray-500 text-sm">{l.href}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

