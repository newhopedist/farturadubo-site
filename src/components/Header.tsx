'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { brand } from '@/lib/brand'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')

  const navigation = [
    { name: 'Início', href: '#home' },
    { name: 'Quem Somos', href: '#about' },
    { name: 'Produtos', href: '#products' },
    { name: 'Benefícios', href: '#benefits' },
    { name: 'Contato', href: '#contact' },
  ]

  useEffect(() => {
    const ids = ['home', 'about', 'products', 'benefits', 'contact']
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
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-fartura-green-100 py-4">
          <div className="flex items-center">
            <Link href="#home" className="flex items-center">
              <div className="h-12 w-48 relative">
                <Image
                  src="/logo.webp?v=3"
                  alt={brand.alt}
                  fill
                  sizes="192px"
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
                href={link.href}
                className={`text-base font-medium transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-fartura-green-600'
                    : 'text-gray-700 hover:text-fartura-green-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
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
                  href={link.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeSection === link.href.replace('#', '')
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
