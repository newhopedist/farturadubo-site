import Hero from '@/components/Hero'
import About from '@/components/About'
import Comparison from '@/components/Comparison'
import Benefits from '@/components/Benefits'
import Products from '@/components/Products'
import Contact from '@/components/Contact'
import { FileDown } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <About />
      <Comparison />
      <Benefits />
      <Products />
      <Contact />
    </main>
  )
}
