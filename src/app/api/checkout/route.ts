import { NextResponse } from 'next/server'
import MercadoPagoConfig, { Preference } from 'mercadopago'

// Inicializa o cliente do Mercado Pago no Backend
// Precisa do ACCESS TOKEN (diferente da Public Key)
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' 
})

export async function POST(request: Request) {
  try {
    const { title, quantity, price } = await request.json()

    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json({ error: 'Access Token não configurado' }, { status: 500 })
    }

    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        items: [
          {
            title: title,
            quantity: quantity,
            unit_price: Number(price),
            currency_id: 'BRL',
          },
        ],
        // Aqui você configuraria as URLs de retorno (sucesso, falha)
        back_urls: {
          success: 'https://www.farturadubo.com.br/sucesso',
          failure: 'https://www.farturadubo.com.br/falha',
          pending: 'https://www.farturadubo.com.br/pendente',
        },
        auto_return: 'approved',
      }
    })

    return NextResponse.json({ id: result.id })

  } catch (error) {
    console.error('Erro ao criar preferência MP:', error)
    return NextResponse.json({ error: 'Erro ao criar preferência' }, { status: 500 })
  }
}
