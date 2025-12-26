import { NextResponse } from 'next/server'

// Rule-based responses for common questions while OpenAI quota is resolved
function getRuleBasedResponse(userMessage: string): string | null {
  const message = userMessage.toLowerCase()
  
  // Pricing - now showing consultation prices
  if (message.includes('preço') || message.includes('valor') || message.includes('custo') || message.includes('preços')) {
    if (message.includes('5kg') && !message.includes('25')) return 'Ureia 5kg - Ideal para pequenas áreas e testes. Valor sob consulta.'
    if (message.includes('25kg') || (message.includes('25') && message.includes('kg'))) return 'Ureia 25kg - Perfeito para médios produtores. Valor sob consulta.'
    if (message.includes('500kg')) return 'Ureia 500kg (Big Bag) - Para grandes propriedades. Valor sob consulta.'
    if (message.includes('1000kg')) return 'Ureia 1000kg (Big Bag) - Para operações em larga escala. Valor sob consulta.'
    return 'Nossa ureia está disponível nas embalagens: 5kg, 25kg, 500kg e 1000kg. Entre em contato para valores sob consulta.'
  }
  
  // Product information - now focused on ureia
  if (message.includes('produto') || message.includes('ureia') || message.includes('fertilizante')) {
    if (message.includes('ureia')) {
      return 'Nossa ureia é de alta qualidade com 45% de nitrogênio. Disponível nas embalagens: 5kg, 25kg, Big Bag 500kg e 1000kg. Ideal para todas as culturas!'
    }
    return 'Temos ureia de alta qualidade (45% N) disponível em embalagens de 5kg, 25kg, 500kg e 1000kg. Qual tamanho você precisa?'
  }
  
  // Packaging information - without prices
  if (message.includes('embalagem') || message.includes('saco') || message.includes('big bag') || message.includes('tamanho')) {
    return 'Oferecemos ureia nas seguintes embalagens: saco de 5kg, saco de 25kg, Big Bag 500kg e Big Bag 1000kg. Entre em contato para valores sob consulta. Qual você prefere?'
  }
  
  // Contact information
  if (message.includes('contato') || message.includes('telefone') || message.includes('whatsapp') || message.includes('comprar')) {
    return 'Para comprar ou mais informações, entre em contato pelo WhatsApp +55 85 99128-9449 ou email contato@farturadubo.com.br. Faça seu pedido agora!'
  }
  
  // Technical questions about ureia
  if (message.includes('composição') || message.includes('formula') || message.includes('tecnica') || message.includes('nitrogênio')) {
    return 'Nossa ureia tem 45% de nitrogênio (N), garantindo alta eficiência nutricional. É um fertilizante de liberação rápida, ideal para todas as culturas.'
  }
  
  // Application and usage
  if (message.includes('aplicação') || message.includes('como usar') || message.includes('modo de uso')) {
    return 'A ureia pode ser aplicada em cobertura ou incorporada ao solo. Dosagem varia de 100-500kg/ha conforme a cultura. Recomendamos aplicação no início do ciclo vegetativo.'
  }
  
  // Greeting
  if (message.includes('olá') || message.includes('oi') || message.includes('bom dia') || message.includes('boa tarde') || message.includes('boa noite')) {
    return 'Olá! Sou o assistente da FARTURADUBO. Como posso ajudar você hoje? Posso informar sobre nossa ureia (5kg a 1000kg), valores ou fazer seu pedido!'
  }
  
  // Help request
  if (message.includes('ajuda') || message.includes('ajude') || message.includes('duvida')) {
    return 'Claro! Posso ajudar com informações sobre nossa ureia (embalagens de 5kg, 25kg, 500kg, 1000kg), valores, aplicação ou fazer seu pedido. O que você precisa?'
  }
  
  // Delivery and logistics
  if (message.includes('entrega') || message.includes('frete') || message.includes('transporte')) {
    return 'Fazemos entrega em toda a região! O frete varia conforme a quantidade e localização. Para orçamento completo, entre em contato pelo WhatsApp +55 85 99128-9449'
  }
  
  return null // No rule matched
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const userMessages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = data?.messages || []
    
    // Get the last user message
    const lastUserMessage = userMessages.filter(m => m.role === 'user').pop()?.content || ''
    
    // Try rule-based response first
    const ruleResponse = getRuleBasedResponse(lastUserMessage)
    if (ruleResponse) {
      return NextResponse.json({ ok: true, reply: ruleResponse })
    }

    // If no rule matches, try OpenAI (but likely will fail due to quota)
    const apiKey = process.env.OPENAI_API_KEY
    const projectId = process.env.OPENAI_PROJECT_ID
    const orgId = process.env.OPENAI_ORG_ID
    
    if (!apiKey) {
      return NextResponse.json({ 
        ok: false, 
        error: 'missing_api_key',
        fallback: 'Desculpe, nosso sistema de IA está temporariamente indisponível. Para atendimento imediato, entre em contato pelo WhatsApp +55 85 99128-9449.' 
      }, { status: 500 })
    }

    const system = {
      role: 'system',
      content:
        'Você é um atendente da FARTURADUBO. Responda de forma clara, cordial e objetiva. Contexto: Produtos principais ureia de alta qualidade (45% N) disponível em embalagens 5kg, 25kg, 500kg e 1000kg. Valores sob consulta. Oriente uso geral, encaminhe para contato/WhatsApp +55 85 99128-9449 quando necessário. Não invente dados técnicos sem base. Se precisar coletar dados, peça nome, e-mail, telefone e interesse.'
    }

    const messages = [system, ...userMessages]

    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        ...(projectId ? { 'OpenAI-Project': projectId } : {}),
        ...(orgId ? { 'OpenAI-Organization': orgId } : {})
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input: messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n'),
        temperature: 0.5,
        max_output_tokens: 400
      })
    })

    const json = await res.json()
    console.log('OpenAI Response:', { status: res.status, json }) // Debug log
    
    if (!res.ok) {
      const msg = json?.error?.message || res.statusText || 'openai_error'
      console.error('OpenAI API Error:', {
        status: res.status,
        statusText: res.statusText,
        error: json?.error,
        message: msg
      })
      // Provide fallback message when OpenAI fails
      return NextResponse.json({ 
        ok: false, 
        error: msg,
        fallback: 'Desculpe, estamos com limitação no momento. Para valores e atendimento imediato, entre em contato pelo WhatsApp +55 85 99128-9449 ou email contato@farturadubo.com.br'
      }, { status: res.status })
    }
    const content =
      json?.output_text ||
      json?.output?.[0]?.content?.[0]?.text?.value ||
      json?.content?.[0]?.text?.value || ''
    return NextResponse.json({ ok: true, reply: content })
  } catch (e: any) {
    return NextResponse.json({ 
      ok: false, 
      error: e?.message || 'error',
      fallback: 'Desculpe, ocorreu um erro. Para atendimento imediato, entre em contato pelo WhatsApp +55 85 99128-9449.'
    }, { status: 500 })
  }
}
