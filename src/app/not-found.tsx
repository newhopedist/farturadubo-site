import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-[50vh] flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <div className="w-16 h-16 bg-fartura-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-fartura-green-600 font-bold text-xl">404</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-fartura-green-900 mb-2">Página não encontrada</h1>
        <p className="text-gray-700 mb-6">A página que você tentou acessar não existe.</p>
        <Link href="/" className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-6 py-3 rounded-lg font-semibold">
          Voltar para Início
        </Link>
      </div>
    </section>
  )
}