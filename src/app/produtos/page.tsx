import { Suspense } from 'react'
import { Loader2, Package } from 'lucide-react'
import { getProducts } from '@/services/products'
import ProductCard from '@/components/ProductCard'

async function ProductsList() {
  const products = await getProducts()

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto disponível</h3>
        <p className="text-gray-600">Em breve teremos novos produtos em estoque.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default function ProdutosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da Página */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Produtos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fertilizantes de alta qualidade para agricultura. Escolha o produto ideal para sua plantação com as melhores embalagens e preços.
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-fartura-green-500" />
            </div>
          }
        >
          <ProductsList />
        </Suspense>
      </div>

      {/* Seção de Informações */}
      <div className="bg-fartura-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Package className="w-8 h-8 text-fartura-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Embalagens Variadas</h3>
              <p className="text-gray-600">De 5kg a 1000kg, escolha o tamanho ideal para sua necessidade.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 text-fartura-green-500 font-bold">%</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Alta Qualidade</h3>
              <p className="text-gray-600">45% de nitrogênio garantido para máxima eficiência na sua plantação.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 text-fartura-green-500">🚚</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Entregamos em todo o Brasil com prazos competitivos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}