'use client'
import Link from 'next/link'
import Image from 'next/image'

const blogPosts = [
  {
    id: 1,
    title: "Como Maximizar a Produtividade com FARTUREIA: Guia Completo",
    excerpt: "Descubra como obter resultados excepcionais com nosso fertilizante N-S de alta performance. Aprenda sobre dosagem, timing e técnicas de aplicação.",
    image: "/blog-fartureia-guia.jpg",
    readTime: "8 min de leitura",
    category: "Técnico"
  },
  {
    id: 2,
    title: "N-S vs NPK: Quando Escolher Cada Formulação",
    excerpt: "Entenda as diferenças entre fertilizantes nitrogenados-enxofre e os tradicionais NPK. Saiba quando cada um é mais indicado.",
    image: "/blog-ns-vs-npk.jpg",
    readTime: "6 min de leitura",
    category: "Comparação"
  },
  {
    id: 3,
    title: "5 Erros Comuns na Aplicação de Fertilizantes que Prejudicam sua Safra",
    excerpt: "Evite perdas de produtividade identificando e corrigindo os principais erros na adubação. Dicas práticas para agricultores.",
    image: "/blog-erros-adubacao.jpg",
    readTime: "5 min de leitura",
    category: "Dicas Práticas"
  }
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-gray-50 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-fartura-green-900 mb-4">
            Conhecimento Agrícola
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Artigos técnicos e dicas práticas para maximizar seus resultados agrícolas
          </p>
          <div className="w-20 h-1 bg-fartura-green-600 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-fartura-green-100 to-fartura-green-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-fartura-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-fartura-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-fartura-green-900 mb-3 hover:text-fartura-green-600 transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </span>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-fartura-green-600 hover:text-fartura-green-700 font-semibold text-sm flex items-center"
                  >
                    Ler mais
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Ver todos os artigos
          </Link>
        </div>
      </div>
    </section>
  )
}