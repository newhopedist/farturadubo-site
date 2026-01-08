import { NextResponse } from 'next/server'

// Rule-based responses for common questions as fallback
function getRuleBasedResponse(userMessage: string): string | null {
  const message = userMessage.toLowerCase()
  
  // Pricing
  if (message.includes('preço') || message.includes('valor') || message.includes('custo') || message.includes('preços')) {
    if (message.includes('5kg') && !message.includes('25')) return 'Ureia 5kg - Ideal para pequenas áreas e testes. Valor sob consulta.'
    if (message.includes('25kg') || (message.includes('25') && message.includes('kg'))) return 'Ureia 25kg - Perfeito para médios produtores. Valor sob consulta.'
    if (message.includes('500kg')) return 'Ureia 500kg (Big Bag) - Para grandes propriedades. Valor sob consulta.'
    if (message.includes('1000kg')) return 'Ureia 1000kg (Big Bag) - Para operações em larga escala. Valor sob consulta.'
    return 'Nossa ureia está disponível nas embalagens: 5kg, 25kg, 500kg e 1000kg. Entre em contato para valores sob consulta.'
  }
  
  // Product information
  if (message.includes('produto') || message.includes('ureia') || message.includes('fertilizante')) {
    if (message.includes('ureia')) {
      return 'Nossa ureia é de alta qualidade com 45% de nitrogênio. Disponível nas embalagens: 5kg, 25kg, Big Bag 500kg e 1000kg. Ideal para todas as culturas!'
    }
    return 'Temos ureia de alta qualidade (45% N) disponível em embalagens de 5kg, 25kg, 500kg e 1000kg. Qual tamanho você precisa?'
  }
  
  // Packaging information
  if (message.includes('embalagem') || message.includes('saco') || message.includes('big bag') || message.includes('tamanho')) {
    return 'Oferecemos ureia nas seguintes embalagens: saco de 5kg, saco de 25kg, Big Bag 500kg e Big Bag 1000kg. Entre em contato para valores sob consulta. Qual você prefere?'
  }
  
  // Contact information
  if (message.includes('contato') || message.includes('telefone') || message.includes('whatsapp') || message.includes('comprar')) {
    return 'Para comprar ou mais informações, entre em contato pelo WhatsApp +55 85 99128-9449 ou email contato@farturadubo.com.br. Faça seu pedido agora!'
  }
  
  return null // No rule matched
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const userMessages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = data?.messages || []
    
    // Get the last user message
    const lastUserMessage = userMessages.filter(m => m.role === 'user').pop()?.content || ''
    
    // 1. Try OpenAI API first
    const apiKey = process.env.OPENAI_API_KEY
    const projectId = process.env.OPENAI_PROJECT_ID
    const orgId = process.env.OPENAI_ORG_ID
    
    if (apiKey) {
      const system = {
        role: 'system',
        content:
          'Você é um atendente da FARTURADUBO. Responda de forma clara, cordial e objetiva. Contexto: Produtos principais ureia de alta qualidade (45% N) disponível em embalagens 5kg, 25kg, 500kg e 1000kg. Valores sob consulta. Oriente uso geral, encaminhe para contato/WhatsApp +55 85 99128-9449 quando necessário. Não invente dados técnicos sem base. Se precisar coletar dados, peça nome, e-mail, telefone e interesse.'
      }

      const messages = [system, ...userMessages]

      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            ...(projectId ? { 'OpenAI-Project': projectId } : {}),
            ...(orgId ? { 'OpenAI-Organization': orgId } : {})
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: messages,
            temperature: 0.5,
            max_tokens: 400
          })
        })

        const json = await res.json()
        
        if (res.ok) {
          const content = json.choices[0]?.message?.content
          if (content) {
            return NextResponse.json({ ok: true, reply: content })
          }
        } else {
          console.error('OpenAI API Error:', json)
        }
      } catch (error) {
        console.error('OpenAI Request Failed:', error)
      }
    }

    // 2. Fallback to rule-based response if OpenAI fails or no key
    const ruleResponse = getRuleBasedResponse(lastUserMessage)
    if (ruleResponse) {
      return NextResponse.json({ ok: true, reply: ruleResponse })
    }

    // 3. Final fallback
    return NextResponse.json({ 
      ok: false, 
      fallback: 'Desculpe, nosso sistema de IA está temporariamente indisponível. Para atendimento imediato, entre em contato pelo WhatsApp +55 85 99128-9449.' 
    })

  } catch (e: any) {
    return NextResponse.json({ 
      ok: false, 
      error: e?.message || 'error',
      fallback: 'Desculpe, ocorreu um erro. Para atendimento imediato, entre em contato pelo WhatsApp +55 85 99128-9449.'
    }, { status: 500 })
  }
}