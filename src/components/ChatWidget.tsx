'use client'

import { useState } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Olá! Sou o assistente da FARTURADUBO. Como posso ajudar?' }
  ])
  const [loading, setLoading] = useState(false)

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setMessages((m) => [...m, { role: 'user', content: text }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages.map((m) => ({ role: m.role, content: m.content })) })
      })
      const json = await res.json()
      if (!json?.ok) {
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
    <div className="fixed bottom-6 left-6 z-50">
      {!open && (
        <button
          className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h6m8 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Atendente
        </button>
      )}

      {open && (
        <div className="w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-fartura-green-200 overflow-hidden">
          <div className="bg-fartura-green-600 text-white p-3 flex justify-between items-center">
            <div className="font-semibold">Atendente FARTURADUBO</div>
            <button className="text-white/90" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={
                  m.role === 'user'
                    ? 'inline-block bg-fartura-green-600 text-white px-3 py-2 rounded-lg'
                    : 'inline-block bg-fartura-green-50 text-gray-800 px-3 py-2 rounded-lg border border-fartura-green-200'
                }>{m.content}</div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-fartura-green-200 flex gap-2">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent text-fartura-green-700 placeholder-fartura-green-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem"
              onKeyDown={(e) => {
                if (e.key === 'Enter') send()
              }}
            />
            <button
              className="bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-3 py-2 rounded-lg"
              onClick={send}
              disabled={loading}
            >
              {loading ? '...' : 'Enviar'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
