import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import { brand } from '@/lib/brand'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = 'https://farturadubo.com.br'

export const metadata: Metadata = {
  title: 'FARTURADUBO - Fertilizantes de Alta Qualidade',
  description: 'Especialistas em fertilizantes de alta qualidade para agricultura. Conheça nossos produtos FARTURAMAX e FARTUREIA.',
  keywords: 'fertilizantes, agricultura, FARTURAMAX, FARTUREIA, FARTURADUBO, adubos, nutrição vegetal, fertilizante organomineral, fertilizante mineral',
  authors: [{ name: 'FARTURADUBO' }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'FARTURADUBO - Fertilizantes de Alta Qualidade',
    description: 'Especialistas em fertilizantes de alta qualidade para agricultura. Conheça FARTURAMAX e FARTUREIA.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'FARTURADUBO',
    images: [
      {
        url: `${siteUrl}/hero-source.png`,
        width: 1200,
        height: 630,
        alt: 'FARTURADUBO - Fertilizantes de Alta Qualidade',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FARTURADUBO - Fertilizantes de Alta Qualidade',
    description: 'Especialistas em fertilizantes de alta qualidade para agricultura.',
    images: [`${siteUrl}/hero-source.png`],
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
    "url": siteUrl,
    "logo": `${siteUrl}/logo.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-44-99876-5432",
      "contactType": "customer service",
      "areaServed": "BR",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      "https://www.facebook.com/farturadubo",
      "https://www.instagram.com/farturadubo",
      "https://www.linkedin.com/company/farturadubo",
      "https://twitter.com/farturadubo"
    ]
  }

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href={brand.heroSrc} as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <ChatWidget />
        <a
          href="https://wa.me/5585991289449?text=Olá,%20tenho%20interesse%20nos%20fertilizantes%20FARTURADUBO"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir conversa no WhatsApp"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
        >
          <span>WhatsApp</span>
        </a>
        <Footer />
      </body>
    </html>
  )
}
