import Link from 'next/link'
import Image from 'next/image'
import { brand } from '@/lib/brand'

export default function Footer() {
  const quickLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Quem Somos', href: '#about' },
    { name: 'Produtos', href: '#products' },
    { name: 'Benefícios', href: '#benefits' },
    { name: 'Contato', href: '#contact' }
  ]

  const products = [
    { name: 'FARTURAMAX', href: '#products' },
    { name: 'FARTUREIA', href: '#products' }
  ]

  const contactInfo = [
    { icon: '🏢', text: 'NEWHOPE COMÉRCIO DE FERTILIZANTES E QUÍMICOS LTDA' },
    { icon: '🆔', text: 'CNPJ: 53.709.557/0001-62' },
    { icon: '📍', text: 'Rua João Ferreira de Araújo, 321 A, Jardim Flórida' },
    { icon: '🏙️', text: 'Jacundá, Aquiraz - CE' },
    { icon: '🏷️', text: 'CEP: 61700-000' },
    { icon: '📞', text: '+55 85 99128-9449' },
    { icon: '💬', text: 'WhatsApp: +55 85 99128-9449' }
  ]

  const socialLinks = [
    { href: 'https://www.instagram.com/farturadubo', label: 'Instagram', icon: '📷' },
    { href: 'https://www.facebook.com/farturadubo', label: 'Facebook', icon: '📘' },
    { href: 'https://wa.me/5585991289449', label: 'WhatsApp', icon: '💬' },
  ]

  return (
    <footer className="bg-fartura-green-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-16 w-64 md:h-20 md:w-80 relative mr-3">
                <Image
                  src={brand.logoSrc}
                  alt={brand.alt}
                  fill
                  sizes="(min-width: 768px) 400px, 320px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-fartura-green-100 leading-relaxed mb-6 max-w-md">
              Especialistas em fertilizantes de alta performance. Comprometidos com a produtividade 
              agrícola brasileira e o sucesso dos nossos clientes.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 bg-fartura-green-700 rounded-full flex items-center justify-center hover:bg-fartura-green-600 transition-colors"
                >
                  <span className="text-sm" aria-hidden="true">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-fartura-green-100 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.name}>
                  <Link 
                    href={product.href}
                    className="text-fartura-green-100 hover:text-white transition-colors text-sm"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        

        <div className="border-t border-fartura-green-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-fartura-green-200 text-sm">© 2024 {brand.name}. Todos os direitos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/politica-de-privacidade" className="text-fartura-green-200 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos-de-uso" className="text-fartura-green-200 hover:text-white text-sm transition-colors">
                Termos de Uso
              </Link>
              <Link href="/mapa-do-site" className="text-fartura-green-200 hover:text-white text-sm transition-colors">
                Mapa do Site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
