// Script para testar a API do chat
async function testChatAPI() {
  try {
    console.log('🧪 Testando API de chat...')
    
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Oi, tudo bem?' }
        ]
      })
    })
    
    const data = await response.json()
    console.log('📊 Status:', response.status)
    console.log('📦 Resposta:', data)
    
    if (data.ok) {
      console.log('✅ API funcionando! Resposta:', data.reply)
    } else {
      console.log('❌ Erro:', data.error)
      console.log('🔄 Fallback:', data.fallback)
    }
    
  } catch (error) {
    console.error('💥 Erro no teste:', error)
  }
}

// Executar teste
testChatAPI()