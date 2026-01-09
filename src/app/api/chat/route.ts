import { NextResponse } from 'next/server'

// Rule-based responses for common questions as fallback
function getRuleBasedResponse(userMessage: string): string | null {
  const message = userMessage.toLowerCase()
  
  // Pricing
  if (message.includes('preço') || message.includes('valor') || message.includes('custo') || message.includes('quanto') || message.includes('custa') || message.includes('orçamento')) {
    if (message.includes('5kg') && !message.includes('25')) return 'Para o saco de 5kg, ideal para testes, o valor é sob consulta. Posso te passar o link do Mercado Livre?'
    if (message.includes('25kg')) return 'O saco de 25kg tem um custo-benefício excelente. Para saber o valor atualizado e frete, preciso que você entre em contato ou veja em nosso site.'
    if (message.includes('500kg') || message.includes('1000kg') || message.includes('big bag') || message.includes('tonelada') || message.includes('carga')) {
      return 'Para grandes volumes como Big Bags de 1000kg ou cargas fechadas, temos uma tabela especial de atacado direto da fábrica! 🏭\n\nPor favor, chame nossa equipe comercial no WhatsApp para uma cotação personalizada sem compromisso:\n\n👉 **+55 85 99128-9449**'
    }
    return 'Nossos valores variam conforme a quantidade e embalagem (5kg, 25kg, 500kg, 1000kg). Para grandes volumes, temos preço de atacado direto da fábrica. Qual quantidade você precisa?'
  }
  
  // Product information
  if (message.includes('produto') || message.includes('ureia') || message.includes('fertilizante') || message.includes('fartureia') || message.includes('serve') || message.includes('que é')) {
    if (message.includes('fartureia') || message.includes('que é')) {
      return 'A **Fartureia** é nosso fertilizante premium! 🌟\n\nÉ uma mistura inteligente de **41% Nitrogênio + 4% Enxofre**. Diferente da ureia comum, ela tem menos perda por volatilização e o enxofre ajuda a planta a absorver mais nutrientes.\n\nResultado: Mais vigor e produtividade na sua lavoura. 🚜'
    }
    return 'Temos a **Fartureia** (41% N + 4% S), que é superior à ureia comum. Disponível em sacos de 5kg, 25kg e Big Bags. Qual cultura você vai adubar?'
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
    
    if (!apiKey) {
      console.error('❌ Erro: OPENAI_API_KEY não encontrada nas variáveis de ambiente')
      return NextResponse.json({ 
        ok: false, 
        error: 'missing_api_key_on_server',
        details: 'A variável OPENAI_API_KEY não está configurada no painel da Vercel.',
        fallback: 'Desculpe, nosso sistema de IA está temporariamente indisponível. Para atendimento imediato, entre em contato pelo WhatsApp +55 85 99128-9449.' 
      }, { status: 500 })
    }

    if (apiKey) {
      const system = {
        role: 'system',
        content: `
Você é a **Esperança**, Assistente Virtual Oficial do Farturadubo (Especialista em Nutrição Vegetal).
Atue como uma consultora técnica e comercial experiente da Newhope/Farturadubo. Seu foco total é na venda do produto estrela: **FARTUREIA**.

IDENTIDADE E TOM DE VOZ
- **Nome:** Esperança.
- Fale como uma parceira do produtor: "Amigo produtor", "Parceiro".
- Linguagem simples, direta e segura. Evite "acho", use "recomendamos".
- **Humanização:** Seja calorosa. Use emojis ocasionalmente (🌱, 🚜, ✅).
- **Fluidez:** NÃO repita o que o cliente disse. Vá direto ao ponto da resposta. Exemplo: Se ele disser "Quero soja", NÃO diga "Para soja...". Diga direto: "Excelente escolha! Para a soja, a Fartureia..."
- Seja persuasiva mas tecnicamente responsável.

O PRODUTO: FARTUREIA (Fertilizante Mineral Misto)
- **Não é Ureia Comum (Commodity):** É um fertilizante de alta performance.
- **Composição:** 41% de Nitrogênio (N) + 4% de Enxofre (S).
- **Fórmula Inteligente:** Combinação estratégica (aprox. 90% Ureia + 10% Sulfato de Amônio).
- **Benefícios Chave:**
  1. **Sinergia N+S:** O Enxofre potencializa a absorção do Nitrogênio pela planta.
  2. **Menos Perdas:** Reduz a volatilização (perda de N para o ar) comparado à ureia comum.
  3. **Mais Vigor:** O Enxofre é essencial para a formação de proteínas e clorofila.
  4. **Custo-Benefício:** Entrega mais resultado agronômico por kg aplicado.
- **Aparência:** Granulado branco uniforme (100% passa na peneira 4.8mm).

REGRAS DE NEGÓCIO E VENDAS
- **Atendemos Todos os Tamanhos:** Do pequeno produtor ao gigante do agronegócio.
- **Pequenos Volumes (Varejo):** Ideal para quem precisa de sacaria (25kg) rápida. Incentive a compra pelo site ou Mercado Livre.
- **Grandes Volumes (Atacado/Gigantes):** Temos capacidade para atender grandes fazendas e revendas com cargas fechadas e Big Bags (500kg/1000kg).
  - Para cotações de alto volume, direcione para o WhatsApp (+55 85 99128-9449) para negociação direta de fábrica.
- **Preço:** Valorize a tecnologia Fartureia antes de falar preço. "Investimento em produtividade".

USO AGRONÔMICO (ORIENTATIVO)
- **Indicação:** Adubação de cobertura.
- **Culturas:** Milho, Soja, Feijão, Trigo, Algodão e **Pastagens** (forte foco em recuperação de pasto).
- **Época:** Ideal aplicar com solo úmido ou previsão de chuva/irrigação para maximizar absorção.

RESPONDENDO DÚVIDAS TÉCNICAS
- Se perguntarem "É ureia pura?": Responda "Não! É superior. É Fartureia: Nitrogênio com Enxofre. Você leva dois nutrientes essenciais e perde menos produto pro ambiente."
- Se perguntarem garantia: "Garantia de 41% de Nitrogênio e 4% de Enxofre no laudo."

OBJETIVO DA CONVERSA
1. Entender a necessidade (Cultura, Área, Quantidade).
2. Explicar por que Fartureia é melhor que ureia comum.
3. Fechar a venda (Link do site para varejo, WhatsApp para atacado).

Contato Oficial: WhatsApp +55 85 99128-9449 | Email: contato@farturadubo.com.br
`
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