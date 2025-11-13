'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    interest: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const emailValid = /.+@.+\..+/.test(formData.email)
      const messageValid = formData.message.trim().length >= 10
      if (!emailValid || !messageValid) {
        setSubmitMessage('Por favor, verifique seu e-mail e escreva uma mensagem mais detalhada (min. 10 caracteres).')
        return
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const json = await res.json()

      if (res.ok && json?.ok) {
        setSubmitMessage('Obrigado pelo seu contato! Responderemos em breve.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          interest: ''
        })
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'lead_submit', { label: 'contact_form' })
        }
      } else {
        setSubmitMessage(`Falha ao enviar: ${json?.error || 'Erro desconhecido'}`)
      }
    } catch (err: any) {
      setSubmitMessage(`Erro ao enviar: ${err.message || 'indisponível'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-white scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-fartura-green-900 mb-4">
            Entre em Contato
          </h2>
          <div className="w-20 h-1 bg-fartura-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Tem dúvidas sobre nossos produtos ou precisa de orientação técnica? 
            Nossa equipe de especialistas está pronta para ajudar você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-fartura-green-50 rounded-xl p-8 border border-fartura-green-200">
            <h3 className="text-2xl font-semibold text-fartura-green-800 mb-6">Informações de Contato</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-fartura-green-100 rounded-full flex items-center justify-center text-fartura-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9-4 9 4-9 4-9-4zm0 8l9 4 9-4M3 7v8m18-8v8"/></svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Empresa</div>
                  <div className="text-gray-700 text-sm">NEWHOPE COMÉRCIO DE FERTILIZANTES E QUÍMICOS LTDA</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-fartura-green-100 rounded-full flex items-center justify-center text-fartura-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 10-8 0v1H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2v-9a2 2 0 00-2-2h-3V7z"/></svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">CNPJ</div>
                  <div className="text-gray-700 text-sm">53.709.557/0001-62</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-fartura-green-100 rounded-full flex items-center justify-center text-fartura-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Endereço</div>
                  <div className="text-gray-700 text-sm">Rua João Ferreira de Araújo, 321 A, Jardim Flórida</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-fartura-green-100 rounded-full flex items-center justify-center text-fartura-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2zm5-7h6v5H10v-5z"/></svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Cidade/UF</div>
                  <div className="text-gray-700 text-sm">Jacundá, Aquiraz - CE</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-fartura-green-100 rounded-full flex items-center justify-center text-fartura-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 7h14M5 12h8m-8 5h11"/></svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">CEP</div>
                  <div className="text-gray-700 text-sm">61700-000</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-fartura-green-100 rounded-full flex items-center justify-center text-fartura-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Telefone</div>
                  <a href="tel:+5585991289449" className="text-fartura-green-700 text-sm hover:underline">+55 85 99128-9449</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-fartura-green-100 rounded-full flex items-center justify-center text-fartura-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">WhatsApp</div>
                  <a href="https://wa.me/5585991289449" target="_blank" rel="noopener noreferrer" className="text-fartura-green-700 text-sm hover:underline">+55 85 99128-9449</a>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="tel:+5585991289449" className="inline-flex items-center gap-2 bg-fartura-green-600 hover:bg-fartura-green-700 text-white px-4 py-2 rounded-lg font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                Ligar
              </a>
              <a href="https://wa.me/5585991289449" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border-2 border-fartura-green-600 text-fartura-green-600 hover:bg-fartura-green-600 hover:text-white px-4 py-2 rounded-lg font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-fartura-green-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-fartura-green-800 mb-6">
              Formulário de Contato
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                pattern="^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent"
                placeholder="(00) 00000-0000"
              />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa/Propriedade
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent"
                  placeholder="Nome da sua empresa ou propriedade"
                />
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                  Interesse
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent"
                >
                  <option value="">Selecione um interesse</option>
                  <option value="farturamax">FARTURAMAX</option>
                  <option value="fartureia">FARTUREIA</option>
                  <option value="informacoes">Informações Gerais</option>
                  <option value="parceria">Parceria</option>
                  <option value="distribuidor">Se tornar Distribuidor</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent resize-none"
                  placeholder="Conte-nos como podemos ajudar você..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-fartura-green-600 hover:bg-fartura-green-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>

              {submitMessage && (
                <div className="bg-fartura-green-100 border border-fartura-green-400 text-fartura-green-700 px-4 py-3 rounded-lg">
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
