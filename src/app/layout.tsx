import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FARTURADUBO - Fertilizantes de Alta Qualidade',
  description: 'Especialistas em fertilizantes de alta qualidade para agricultura. Conheça nossos produtos FARTURAMAX e FARTUREIA.',
  keywords: 'fertilizantes, agricultura, FARTURAMAX, FARTUREIA, FARTURADUBO, adubos, nutrição vegetal, fertilizante organomineral, fertilizante mineral',
  authors: [{ name: 'FARTURADUBO' }],
  openGraph: {
    title: 'FARTURADUBO - Fertilizantes de Alta Qualidade',
    description: 'Especialistas em fertilizantes de alta qualidade para agricultura. Conheça FARTURAMAX e FARTUREIA.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'FARTURADUBO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FARTURADUBO - Fertilizantes de Alta Qualidade',
    description: 'Especialistas em fertilizantes de alta qualidade para agricultura.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FARTURADUBO",
    "description": "Especialistas em fertilizantes de alta qualidade para agricultura",
    "url": "https://farturadubo.com.br",
    "logo": "https://farturadubo.com.br/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-11-1234-5678",
      "contactType": "customer service",
      "areaServed": "BR",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      "https://www.facebook.com/farturadubo",
      "https://www.instagram.com/farturadubo",
      "https://www.linkedin.com/company/farturadubo"
    ]
  }

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}