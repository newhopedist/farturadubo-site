'use client'

import { useState, useEffect } from 'react'
import { Search, Package, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react'
import { getOrderById } from '@/services/orders'

interface Order {
  id: string
  status: string
  valor_total: number
  frete: number
  forma_pagamento: string
  endereco_entrega: any
  created_at: string
  order_items: Array<{
    quantidade: number
    preco_unitario: number
    subtotal: number
    peso: string
    products: {
      name: string
      description: string
    }
  }>
}

const statusSteps = [
  { status: 'pending', label: 'Pedido Realizado', icon: Clock, color: 'text-yellow-500' },
  { status: 'confirmed', label: 'Pagamento Confirmado', icon: CheckCircle, color: 'text-green-500' },
  { status: 'shipped', label: 'Em Transporte', icon: Truck, color: 'text-blue-500' },
  { status: 'delivered', label: 'Entregue', icon: Package, color: 'text-purple-600' }
]

export default function OrderTracking() {
  const [searchId, setSearchId] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const searchOrder = async () => {
    if (!searchId.trim()) {
      setError('Por favor, insira o número do pedido')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const orderData = await getOrderById(searchId.trim())
      if (orderData) {
        setOrder(orderData)
      } else {
        setError('Pedido não encontrado. Verifique o número e tente novamente.')
        setOrder(null)
      }
    } catch (error) {
      console.error('Erro ao buscar pedido:', error)
      setError('Erro ao buscar pedido. Tente novamente.')
      setOrder(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchOrder()
    }
  }

  const getCurrentStepIndex = (status: string) => {
    return statusSteps.findIndex(step => step.status === status)
  }

  const getStatusName = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Aguardando Pagamento'
      case 'confirmed':
        return 'Pagamento Confirmado'
      case 'shipped':
        return 'Em Transporte'
      case 'delivered':
        return 'Entregue'
      default:
        return 'Status Desconhecido'
    }
  }

  const getPaymentName = (method: string) => {
    switch (method) {
      case 'pix':
        return 'PIX'
      case 'boleto':
        return 'Boleto Bancário'
      case 'cartao':
        return 'Cartão de Crédito'
      default:
        return 'Pagamento'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <Package className="w-12 h-12 text-fartura-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Acompanhar Pedido</h1>
            <p className="text-gray-600">Insira o número do seu pedido para acompanhar o status</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Busca de Pedido */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                Número do Pedido
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="orderId"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ex: 12345"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={searchOrder}
                disabled={isLoading}
                className="bg-fartura-green-500 hover:bg-fartura-green-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                {isLoading ? 'Buscando...' : 'Buscar Pedido'}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Resultados */}
        {order && (
          <div className="space-y-6">
            {/* Status do Pedido */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Status do Pedido</h2>
              
              {/* Timeline de Status */}
              <div className="relative">
                <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200"></div>
                
                {statusSteps.map((step, index) => {
                  const Icon = step.icon
                  const isCompleted = getCurrentStepIndex(order.status) >= index
                  const isCurrent = getCurrentStepIndex(order.status) === index
                  
                  return (
                    <div key={step.status} className="relative flex items-center mb-8 last:mb-0">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-fartura-green-500' : 'bg-gray-200'
                      }`}>
                        <Icon className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <div className="ml-4">
                        <p className={`font-medium ${
                          isCurrent ? 'text-fartura-green-600' : 
                          isCompleted ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-fartura-green-600">
                            {getStatusName(order.status)}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Informações do Pedido */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Detalhes do Pedido */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalhes do Pedido</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Número do Pedido:</span>
                    <span className="font-medium">#{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data do Pedido:</span>
                    <span className="font-medium">
                      {new Date(order.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Forma de Pagamento:</span>
                    <span className="font-medium">{getPaymentName(order.forma_pagamento)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-fartura-green-600">
                      {getStatusName(order.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resumo Financeiro */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo Financeiro</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">
                      R$ {(order.valor_total - order.frete).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete:</span>
                    <span className="font-medium">R$ {order.frete.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-3">
                    <span>Total:</span>
                    <span className="text-fartura-green-600">R$ {order.valor_total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Itens do Pedido */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Itens do Pedido</h2>
              <div className="space-y-4">
                {order.order_items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.products.name}</h3>
                      <p className="text-sm text-gray-600">{item.peso}</p>
                      <p className="text-sm text-gray-500">Quantidade: {item.quantidade}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">R$ {item.subtotal.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">R$ {item.preco_unitario.toFixed(2)} cada</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Endereço de Entrega */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Endereço de Entrega</h2>
              <div className="text-gray-600 space-y-1">
                <p>{order.endereco_entrega.nome}</p>
                <p>{order.endereco_entrega.rua}, {order.endereco_entrega.numero}</p>
                {order.endereco_entrega.complemento && <p>{order.endereco_entrega.complemento}</p>}
                <p>{order.endereco_entrega.bairro}</p>
                <p>{order.endereco_entrega.cidade} - {order.endereco_entrega.estado}</p>
                <p>CEP: {order.endereco_entrega.cep}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}