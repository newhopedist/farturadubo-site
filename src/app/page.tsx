import Hero from '@/components/Hero'
import About from '@/components/About'
import Comparison from '@/components/Comparison'
import Benefits from '@/components/Benefits'
import Products from '@/components/Products'
import Contact from '@/components/Contact'
import { FileDown } from 'lucide-react'

export default function Home() {
  const portfolioUrl =
    process.env.NEXT_PUBLIC_PORTFOLIO_URL || '/DOCS UREIA/Apresentação Fartureia.pdf'
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <About />
      <Comparison />
      <Benefits />
      <Products />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center">
          <a
            href={portfolioUrl}
            download="farturadubo-portfolio.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-fartura-green-600 to-fartura-green-700 text-white shadow-lg hover:shadow-xl hover:from-fartura-green-700 hover:to-fartura-green-800 transition-all"
          >
            <FileDown className="w-5 h-5" />
            Baixe nosso portfólio
          </a>
        </div>
      </div>
      <Contact />
    </main>
  )
}
