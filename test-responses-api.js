// Teste da Responses API da OpenAI
async function testResponsesAPI() {
  try {
    console.log('🧪 Testando Responses API...')
    
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.log('❌ Sem API key')
      return
    }
    
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input: 'USER: Olá, como você está?\nASSISTANT:',
        temperature: 0.5,
        max_output_tokens: 100
      })
    })
    
    console.log('📊 Status:', response.status)
    console.log('📊 Status Text:', response.statusText)
    
    const data = await response.json()
    console.log('📦 Resposta completa:', JSON.stringify(data, null, 2))
    
    if (!response.ok) {
      console.log('❌ Erro na Responses API')
    } else {
      console.log('✅ Responses API funcionando!')
    }
    
  } catch (error) {
    console.error('💥 Erro no teste:', error)
  }
}

// Executar teste
testResponsesAPI()