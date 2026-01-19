'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'
import { ShoppingCart } from 'lucide-react'
import { brand } from '@/lib/brand'
import NotificationBell from './NotificationBell'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { getTotalItems } = useCart()
  const pathname = usePathname()

  const cartItemsCount = getTotalItems()

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      
      // Lógica invertida:
        // Rolar para BAIXO (> lastScrollY) -> ESCONDE (isVisible = false)
        // Rolar para CIMA (< lastScrollY) -> MOSTRA (isVisible = true)
        
        if (currentScrollY > lastScrollY && currentScrollY > 10) {
          setIsVisible(false)
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true)
        }
        
        setLastScrollY(currentScrollY)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])

  const navigation = [
    { name: 'Início', href: '#home' },
    { name: 'Quem Somos', href: '#about' },
    { name: 'Produtos', href: '/produtos' }, // Link para página de produtos
    { name: 'Benefícios', href: '#benefits' },
    { name: 'Contato', href: '#contact' },
  ]

  useEffect(() => {
    if (pathname !== '/') return

    const ids = ['home', 'about', 'benefits', 'contact']
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1))
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        root: null,
        threshold: 0.25,
        rootMargin: '-80px 0px -55% 0px',
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  const getHref = (href: string) => {
    if (href.startsWith('#')) {
      return pathname === '/' ? href : `/${href}`
    }
    return href
  }

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-fartura-green-100 py-2 md:py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-32 md:h-12 md:w-48 relative">
                <Image
                  src="/logo.webp?v=3"
                  alt={brand.alt}
                  fill
                  sizes="(max-width: 768px) 128px, 192px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={getHref(link.href)}
                className={`text-base font-medium transition-colors ${
                  activeSection === link.href.replace('#', '') && pathname === '/'
                    ? 'text-fartura-green-600'
                    : 'text-gray-700 hover:text-fartura-green-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Botão do Carrinho (Temporariamente desativado) */}
            {/* <Link
              href="/carrinho"
              className="relative p-2 text-gray-700 hover:text-fartura-green-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-fartura-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link> */}

            {/* Link Admin (Temporariamente desativado) */}
            {/* <Link
              href="/admin"
              className="text-gray-700 hover:text-fartura-green-600 transition-colors font-medium"
            >
              Admin
            </Link> */}

            {/* Link Acompanhar Pedido (Temporariamente desativado) */}
            {/* <Link
              href="/pedidos"
              className="text-gray-700 hover:text-fartura-green-600 transition-colors font-medium"
            >
              Acompanhar Pedido
            </Link> */}

            {/* Sino de Notificações (Temporariamente desativado) */}
            {/* <NotificationBell /> */}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            {/* Botão do Carrinho no Mobile (Temporariamente desativado) */}
            {/* <Link
              href="/carrinho"
              className="relative p-2 text-gray-700 hover:text-fartura-green-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-fartura-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link> */}
            
            <button
              type="button"
              className="text-gray-700 hover:text-fartura-green-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={getHref(link.href)}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeSection === link.href.replace('#', '') && pathname === '/'
                      ? 'text-fartura-green-700 bg-fartura-green-50'
                      : 'text-gray-700 hover:text-fartura-green-600 hover:bg-fartura-green-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}