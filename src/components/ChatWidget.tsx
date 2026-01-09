'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Olá! Eu sou a **Esperança**, assistente virtual da Farturadubo. 🌱\n\nEstou aqui para ser sua parceira na colheita. Como posso ajudar com sua adubação hoje?' }
  ])
  const [loading, setLoading] = useState(false)

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    
    // Cria a nova mensagem do usuário
    const newUserMessage = { role: 'user' as const, content: text }
    
    // Atualiza o estado visualmente
    setMessages((m) => [...m, newUserMessage])
    setInput('')
    setLoading(true)
    
    try {
      // Prepara o histórico para envio (mensagens atuais + nova mensagem)
      const messagesToSend = [...messages, newUserMessage].map((m) => ({ 
        role: m.role, 
        content: m.content 
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesToSend })
      })
      const json = await res.json()
      if (!json?.ok) {
        // Log detalhado do erro para debug
        console.error('❌ Erro no Chat:', json)
        
        // Use fallback message if available, otherwise show error
        const msg = json?.fallback || `Erro: ${json?.error || 'Ocorreu um erro ao responder. Tente novamente em instantes.'}`
        setMessages((m) => [...m, { role: 'assistant', content: msg }])
      } else {
        const reply = json?.reply || 'Desculpe, não consegui responder agora.'
        setMessages((m) => [...m, { role: 'assistant', content: reply }])
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Ocorreu um erro ao enviar. Tente novamente.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Janela do Chat */}
      {open && (
        <div className="w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col mb-4 transition-all duration-300 ease-in-out animate-in slide-in-from-bottom-5 fade-in">
          
          {/* Cabeçalho */}
          <div className="bg-gradient-to-r from-fartura-green-600 to-fartura-green-500 p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-full shadow-inner">
                {/* Avatar Simples */}
                <span className="text-xl">🌱</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">Esperança</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  <span className="text-green-50 text-xs font-medium">Online agora</span>
                </div>
              </div>
            </div>
            <button 
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors" 
              onClick={() => setOpen(false)}
              aria-label="Fechar chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[85%] px-4 py-3 rounded-2xl shadow-sm relative text-sm leading-relaxed
                  ${m.role === 'user'
                    ? 'bg-fartura-green-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }
                `}>
                  {m.role === 'user' ? (
                    m.content
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({children}) => <span className="font-bold text-fartura-green-700">{children}</span>,
                        ul: ({children}) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                        li: ({children}) => <li className="">{children}</li>,
                        a: ({children, href}) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{children}</a>
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  )}
                  {/* Horário (fictício para visual) */}
                  <div className={`text-[10px] mt-1 text-right opacity-70 ${m.role === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Área de Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2 items-center bg-gray-50 px-4 py-3 rounded-2xl border border-gray-200 focus-within:border-fartura-green-500 focus-within:ring-1 focus-within:ring-fartura-green-500 transition-all">
              <input
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-gray-700 placeholder-gray-400 text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                style={{ boxShadow: 'none' }} // Força remoção de sombra interna em alguns browsers
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
              />
              <button
                className={`
                  p-2 rounded-xl transition-all duration-200 flex-shrink-0
                  ${!input.trim() || loading 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-fartura-green-600 hover:bg-fartura-green-50 hover:text-fartura-green-700'
                  }
                `}
                onClick={send}
                disabled={!input.trim() || loading}
              >
                <svg className="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-gray-400">Powered by Farturadubo AI</p>
            </div>
          </div>
        </div>
      )}

      {/* Botão Flutuante (Launcher) */}
      {!open && (
        <button
          className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-fartura-green-500 to-fartura-green-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={() => setOpen(true)}
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
          </span>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          
          {/* Tooltip */}
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Falar com Esperança
          </span>
        </button>
      )}
    </div>
  )
}