'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { createOrder } from '@/services/orders'
import Link from 'next/link'
import { ArrowLeft, CreditCard, BarChart3, Smartphone } from 'lucide-react'

interface CheckoutForm {
  nome: string
  email: string
  cpf: string
  telefone: string
  cep: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  formaPagamento: 'pix' | 'boleto' | 'cartao'
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [form, setForm] = useState<CheckoutForm>({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    formaPagamento: 'pix'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {}

    if (!form.nome.trim()) newErrors.nome = 'Nome é obrigatório'
    if (!form.email.trim()) newErrors.email = 'Email é obrigatório'
    if (!form.cpf.trim()) newErrors.cpf = 'CPF é obrigatório'
    if (!form.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório'
    if (!form.cep.trim()) newErrors.cep = 'CEP é obrigatório'
    if (!form.rua.trim()) newErrors.rua = 'Rua é obrigatória'
    if (!form.numero.trim()) newErrors.numero = 'Número é obrigatório'
    if (!form.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório'
    if (!form.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória'
    if (!form.estado.trim()) newErrors.estado = 'Estado é obrigatório'

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email inválido'
    }

    if (form.cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf)) {
      newErrors.cpf = 'CPF inválido (use formato: 000.000.000-00)'
    }

    if (form.telefone && !/^\(\d{2}\) \d{5}-\d{4}$/.test(form.telefone)) {
      newErrors.telefone = 'Telefone inválido (use formato: (00) 00000-0000)'
    }

    if (form.cep && !/^\d{5}-\d{3}$/.test(form.cep)) {
      newErrors.cep = 'CEP inválido (use formato: 00000-000)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof CheckoutForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Criar pedido no Supabase
      const orderId = await createOrder({
        cart,
        customerData: {
          nome: form.nome,
          email: form.email,
          cpf: form.cpf,
          telefone: form.telefone,
          endereco: {
            cep: form.cep,
            rua: form.rua,
            numero: form.numero,
            complemento: form.complemento,
            bairro: form.bairro,
            cidade: form.cidade,
            estado: form.estado
          },
          formaPagamento: form.formaPagamento
        }
      })

      if (!orderId) {
        throw new Error('Erro ao criar pedido')
      }

      // Limpar carrinho após pedido
      clearCart()
      
      // Redirecionar para página de confirmação com ID do pedido
      router.push(`/confirmacao?pedido=${orderId}`)
    } catch (error) {
      console.error('Erro ao processar pedido:', error)
      alert('Erro ao processar pedido. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 11) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    return value
  }

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const formatCEP = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 8) {
      return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2')
    }
    return value
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Carrinho Vazio</h2>
          <p className="text-gray-600 mb-6">Adicione produtos ao carrinho antes de finalizar a compra.</p>
          <Link
            href="/produtos"
            className="bg-fartura-green-500 hover:bg-fartura-green-600 text-white px-6 py-3 rounded-md inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ver Produtos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Finalizar Compra</h1>
            <Link
              href="/carrinho"
              className="inline-flex items-center text-fartura-green-600 hover:text-fartura-green-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Carrinho
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Dados do Cliente</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={form.nome}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent ${
                      errors.nome ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                    CPF *
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={form.cpf}
                    onChange={(e) => setForm(prev => ({ ...prev, cpf: formatCPF(e.target.value) }))}
                    placeholder="000.000.000-00"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent ${
                      errors.cpf ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
                </div>
                
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone *
                  </label>
                  <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    value={form.telefone}
                    onChange={(e) => setForm(prev => ({ ...prev, telefone: formatPhone(e.target.value) }))}
                    placeholder="(00) 00000-0000"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent ${
                      errors.telefone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço de Entrega</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">
                    CEP *
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={form.cep}
                    onChange={(e) => setForm(prev => ({ ...prev, cep: formatCEP(e.target.value) }))}
                    placeholder="00000-000"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent ${
                      errors.cep ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="rua" className="block text-sm font-medium text-gray-700 mb-1">
                    Rua *
                  </label>
                  <input
                    type="text"
                    id="rua"
                    name="rua"
                    value={form.rua}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent ${
                      errors.rua ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.rua && <p className="text-red-500 text-sm mt-1">{errors.rua}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">
                    Número *
                  </label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={form.numero}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent ${
                      errors.numero ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
                </div>
                
                <div>
                  <label htmlFor="complemento" className="block text-sm font-medium text-gray-700 mb-1">
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    value={form.complemento}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="bairro" className="block text-sm font-medium text-gray-700 mb-1">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={form.bairro}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent ${
                      errors.bairro ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.bairro && <p className="text-red-500 text-sm mt-1">{errors.bairro}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={form.cidade}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent ${
                      errors.cidade ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>}
                </div>
                
                <div>
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                    Estado *
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    value={form.estado}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent ${
                      errors.estado ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecione o estado</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                  {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Forma de Pagamento</h3>
              
              <div className="space-y-3 mb-6">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="formaPagamento"
                    value="pix"
                    checked={form.formaPagamento === 'pix'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <Smartphone className="w-5 h-5 mr-2 text-green-500" />
                    <div>
                      <p className="font-medium">PIX</p>
                      <p className="text-sm text-gray-600">Pagamento instantâneo</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="formaPagamento"
                    value="boleto"
                    checked={form.formaPagamento === 'boleto'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                    <div>
                      <p className="font-medium">Boleto Bancário</p>
                      <p className="text-sm text-gray-600">Prazo de 3 dias úteis para compensação</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
                  <input
                    type="radio"
                    name="formaPagamento"
                    value="cartao"
                    checked={form.formaPagamento === 'cartao'}
                    onChange={handleInputChange}
                    className="mr-3"
                    disabled
                  />
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-500" />
                    <div>
                      <p className="font-medium">Cartão de Crédito</p>
                      <p className="text-sm text-gray-600">Em breve</p>
                    </div>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-fartura-green-500 hover:bg-fartura-green-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
              >
                {isLoading ? 'Processando...' : 'Finalizar Pedido'}
              </button>
            </form>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={`${item.product.id}-${item.price.id}`} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-gray-600">{item.price.peso} × {item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm">R$ {item.subtotal.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">R$ {cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frete</span>
                  <span className="text-gray-500">A calcular</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total</span>
                  <span className="text-fartura-green-600">R$ {cart.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-fartura-green-50 rounded-lg">
                <p className="text-sm text-fartura-green-800">
                  <strong>Importante:</strong> O frete será calculado e adicionado ao total após a confirmação do pedido. Entraremos em contato para confirmar o valor final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}