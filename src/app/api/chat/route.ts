import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return NextResponse.json({ ok: false, error: 'missing_api_key' }, { status: 500 })

    const data = await req.json()
    const userMessages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = data?.messages || []

    const system = {
      role: 'system',
      content:
        'Você é um atendente da FARTURADUBO. Responda de forma clara, cordial e objetiva. Contexto: Produtos principais FARTUREIA (N–S, ureia 90%, sulfato de amônio 10%; embalagens 5/25/50 kg e Big Bags 500/1000 kg) e FARTURAMAX (linha mineral/NPK). Oriente uso geral, encaminhe para contato/WhatsApp +55 85 99128-9449 quando necessário. Não invente dados técnicos sem base. Se precisar coletar dados, peça nome, e-mail, telefone e interesse.'
    }

    const messages = [system, ...userMessages]

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.5
      })
    })

    const json = await res.json()
    const content = json?.choices?.[0]?.message?.content || ''
    return NextResponse.json({ ok: true, reply: content })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'error' }, { status: 500 })
  }
}

