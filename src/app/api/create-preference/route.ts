import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { title, quantity, price } = await request.json()
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

    if (!accessToken) {
      return NextResponse.json({ error: 'Access Token não configurado' }, { status: 500 })
    }

    // Chamada direta à API do Mercado Pago (sem SDK para evitar erros de build)
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        items: [
          {
            id: `item-${Date.now()}`,
            title: title,
            quantity: quantity,
            currency_id: 'BRL',
            unit_price: Number(price)
          }
        ],
        back_urls: {
          success: 'https://www.farturadubo.com.br/sucesso',
          failure: 'https://www.farturadubo.com.br/falha',
          pending: 'https://www.farturadubo.com.br/pendente'
        },
        auto_return: 'approved'
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro MP API:', errorData)
      return NextResponse.json({ error: 'Erro ao criar preferência na API' }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json({ id: data.id })

  } catch (error) {
    console.error('Erro ao criar preferência:', error)
    return NextResponse.json({ error: 'Erro interno ao criar preferência' }, { status: 500 })
  }
}
