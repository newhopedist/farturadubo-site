import { supabase } from '@/lib/supabase'
import { Product, ProductPrice, ProductWithPrices } from '@/types/ecommerce'

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
    console.error('Erro ao buscar produtos:', error)
    return []
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
    if (!product) return null

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
    console.error('Erro ao buscar produto:', error)
    return null
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
    if (!product) return null

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
    console.error('Erro ao buscar produto por ID:', error)
    return null
  }
}