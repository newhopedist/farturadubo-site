import { NextResponse } from 'next/server'

// Dimensões estimadas para cada pacote (Altura x Largura x Comprimento em cm)
// Peso em kg
const PRODUCT_SPECS: Record<string, { height: number; width: number; length: number; weight: number }> = {
  'fartureia-5kg': { height: 10, width: 25, length: 35, weight: 5 },
  'fartureia-25kg': { height: 15, width: 45, length: 65, weight: 25 },
  // Big Bags não entram aqui (frete negociado)
}

export async function POST(request: Request) {
  try {
    const { cep, productSlug } = await request.json()

    if (!cep || !productSlug) {
      return NextResponse.json({ error: 'CEP e Produto são obrigatórios' }, { status: 400 })
    }

    const specs = PRODUCT_SPECS[productSlug] || PRODUCT_SPECS['fartureia-5kg'] // Fallback

    const token = process.env.MELHOR_ENVIO_TOKEN
    const originCep = process.env.ORIGIN_CEP || '60000000'
    const url = process.env.MELHOR_ENVIO_URL || 'https://melhorenvio.com.br/api/v2/me/shipment/calculate'

    if (!token) {
      console.error('ERRO: Token do Melhor Envio não configurado')
      return NextResponse.json({ error: 'Erro de configuração no servidor (Token ausente)' }, { status: 500 })
    }

    // Monta o payload para o Melhor Envio
    const payload = {
      from: { postal_code: originCep },
      to: { postal_code: cep },
      products: [
        {
          id: productSlug,
          width: specs.width,
          height: specs.height,
          length: specs.length,
          weight: specs.weight,
          insurance_value: 50.00, // Valor segurado mínimo
          quantity: 1
        }
      ]
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'Farturadubo Site (suporte@farturadubo.com.br)'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Erro Melhor Envio:', errorData)
      
      // Tenta fazer o parse do JSON de erro para retornar algo legível
      try {
        const errorJson = JSON.parse(errorData)
        return NextResponse.json({ error: errorJson.message || errorJson.error || 'Erro na API do Melhor Envio' }, { status: response.status })
      } catch {
        return NextResponse.json({ error: `Erro na transportadora: ${errorData}` }, { status: 500 })
      }
    }

    const data = await response.json()

    // Filtra e formata os dados para o front-end
    // O Melhor Envio retorna um array de opções (Jadlog, Correios, Azul, etc.)
    // Vamos pegar só os que não têm erro e formatar
    const options = data
      .filter((opt: any) => !opt.error)
      .map((opt: any) => ({
        name: opt.company.name + ' ' + opt.name, // Ex: Correios SEDEX
        price: parseFloat(opt.price),
        days: opt.delivery_time,
        logo: opt.company.picture,
        currency: opt.currency
      }))
      .sort((a: any, b: any) => a.price - b.price) // Ordena do mais barato pro mais caro

    return NextResponse.json({ options })

  } catch (error: any) {
    console.error('Erro interno:', error)
    return NextResponse.json({ error: `Erro interno: ${error.message || error}` }, { status: 500 })
  }
}
