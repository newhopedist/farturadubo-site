import { supabase } from '@/lib/supabase'
import { Product, ProductPrice, ProductWithPrices } from '@/types/ecommerce'

// Dados de fallback para quando o Supabase não estiver conectado ou falhar
const FALLBACK_PRODUCTS: ProductWithPrices[] = [
  {
    id: 1,
    name: 'FARTURAMAX',
    description: 'Fertilizante foliar de alta performance, rico em macro e micronutrientes essenciais para o desenvolvimento vigoroso das plantas. Ideal para soja, milho e feijão.',
    slug: 'farturamax',
    category: 'fertilizante',
    image_url: '/25KG.webp',
    active: true,
    created_at: new Date().toISOString(),
    prices: [
      { id: '1', produto_id: 1, peso: '5kg', preco: 89.90, estoque: 100, ativo: true },
      { id: '2', produto_id: 1, peso: '25kg', preco: 350.00, estoque: 50, ativo: true }
    ]
  },
  {
    id: 2,
    name: 'FARTUREIA',
    description: 'Ureia agrícola com 45% de nitrogênio garantido. Tecnologia de liberação controlada que evita perdas por volatilização e lixiviação.',
    slug: 'fartureia',
    category: 'ureia',
    image_url: '/Packs.webp',
    active: true,
    created_at: new Date().toISOString(),
    prices: [
      { id: '3', produto_id: 2, peso: '25kg', preco: 180.00, estoque: 200, ativo: true },
      { id: '4', produto_id: 2, peso: '500kg', preco: 3400.00, estoque: 10, ativo: true }
    ]
  }
]

export async function getProducts(): Promise<ProductWithPrices[]> {
  try {
    // Buscar produtos ativos
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('name')

    if (productsError) throw productsError

    // Buscar preços para cada produto
    const productIds = products?.map(p => p.id) || []
    
    if (productIds.length === 0) {
      // Se conectou mas não tem produtos, ou se a tabela não existe
      return FALLBACK_PRODUCTS
    }

    const { data: prices, error: pricesError } = await supabase
      .from('product_prices')
      .select('*')
      .in('produto_id', productIds)
      .eq('ativo', true)

    if (pricesError) throw pricesError

    // Combinar produtos com seus preços
    const productsWithPrices: ProductWithPrices[] = products?.map(product => ({
      ...product,
      prices: prices?.filter(price => price.produto_id === product.id) || []
    })) || []

    return productsWithPrices
  } catch (error) {
    console.error('Erro ao buscar produtos (usando fallback):', error)
    return FALLBACK_PRODUCTS
  }
}

export async function getProductBySlug(slug: string): Promise<ProductWithPrices | null> {
  try {
    // Buscar produto por slug
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single()

    if (productError) throw productError
    if (!product) return FALLBACK_PRODUCTS.find(p => p.slug === slug) || null

    // Buscar preços do produto
    const { data: prices, error: pricesError } = await supabase
      .from('product_prices')
      .select('*')
      .eq('produto_id', product.id)
      .eq('ativo', true)

    if (pricesError) throw pricesError

    return {
      ...product,
      prices: prices || []
    }
  } catch (error) {
    console.error('Erro ao buscar produto (usando fallback):', error)
    return FALLBACK_PRODUCTS.find(p => p.slug === slug) || null
  }
}

export async function getProductById(id: number): Promise<ProductWithPrices | null> {
  try {
    // Buscar produto por ID
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single()

    if (productError) throw productError
    if (!product) return FALLBACK_PRODUCTS.find(p => p.id === id) || null

    // Buscar preços do produto
    const { data: prices, error: pricesError } = await supabase
      .from('product_prices')
      .select('*')
      .eq('produto_id', product.id)
      .eq('ativo', true)

    if (pricesError) throw pricesError

    return {
      ...product,
      prices: prices || []
    }
  } catch (error) {
    console.error('Erro ao buscar produto por ID (usando fallback):', error)
    return FALLBACK_PRODUCTS.find(p => p.id === Number(id)) || null
  }
}