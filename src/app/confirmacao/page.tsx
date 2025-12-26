'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getOrderById } from '@/services/orders'
import { CheckCircle, Clock, Package, Truck, CreditCard, Smartphone, BarChart3 } from 'lucide-react'

interface OrderConfirmation {
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

export default function ConfirmacaoPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('pedido')
  const [order, setOrder] = useState<OrderConfirmation | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      loadOrder()
    }
  }, [orderId])

  const loadOrder = async () => {
    try {
      const orderData = await getOrderById(orderId!)
      if (orderData) {
        setOrder(orderData)
      }
    } catch (error) {
      console.error('Erro ao carregar pedido:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fartura-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informações do pedido...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pedido não encontrado</h2>
          <p className="text-gray-600 mb-6">O pedido solicitado não foi encontrado ou não existe.</p>
          <Link
            href="/produtos"
            className="bg-fartura-green-500 hover:bg-fartura-green-600 text-white px-6 py-3 rounded-md inline-flex items-center"
          >
            Ver Produtos
          </Link>
        </div>
      </div>
    )
  }

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'pix':
        return <Smartphone className="w-5 h-5 text-green-500" />
      case 'boleto':
        return <BarChart3 className="w-5 h-5 text-blue-500" />
      case 'cartao':
        return <CreditCard className="w-5 h-5 text-purple-500" />
      default:
        return <CreditCard className="w-5 h-5 text-gray-500" />
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />
      case 'delivered':
        return <Package className="w-5 h-5 text-green-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
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
        return 'Processando'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pedido Realizado com Sucesso!</h1>
            <p className="text-gray-600">Seu pedido foi recebido e está sendo processado</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informações do Pedido */}
          <div className="space-y-6">
            {/* Status do Pedido */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status do Pedido</h2>
              <div className="flex items-center space-x-3">
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-medium">{getStatusName(order.status)}</p>
                  <p className="text-sm text-gray-600">Pedido #{order.id}</p>
                </div>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Forma de Pagamento</h2>
              <div className="flex items-center space-x-3">
                {getPaymentIcon(order.forma_pagamento)}
                <div>
                  <p className="font-medium">{getPaymentName(order.forma_pagamento)}</p>
                  <p className="text-sm text-gray-600">
                    {order.forma_pagamento === 'pix' && 'Você receberá as instruções por email'}
                    {order.forma_pagamento === 'boleto' && 'O boleto será enviado para seu email'}
                  </p>
                </div>
              </div>
            </div>

            {/* Endereço de Entrega */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Endereço de Entrega</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{order.endereco_entrega.rua}, {order.endereco_entrega.numero}</p>
                {order.endereco_entrega.complemento && <p>{order.endereco_entrega.complemento}</p>}
                <p>{order.endereco_entrega.bairro}</p>
                <p>{order.endereco_entrega.cidade} - {order.endereco_entrega.estado}</p>
                <p>CEP: {order.endereco_entrega.cep}</p>
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-3 mb-4">
              {order.order_items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.products.name}</p>
                    <p className="text-xs text-gray-600">{item.peso} × {item.quantidade}</p>
                  </div>
                  <p className="font-medium text-sm">R$ {item.subtotal.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  R$ {(order.valor_total - order.frete).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="font-medium">R$ {order.frete.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Total</span>
                <span className="text-fartura-green-600">R$ {order.valor_total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-fartura-green-50 rounded-lg p-4">
              <p className="text-sm text-fartura-green-800">
                <strong>Próximos passos:</strong>
              </p>
              <ul className="text-sm text-fartura-green-800 mt-2 space-y-1">
                <li>• Você receberá um email com as instruções de pagamento</li>
                <li>• Após confirmação do pagamento, processaremos seu pedido</li>
                <li>• Entraremos em contato para confirmar o prazo de entrega</li>
                <li>• Qualquer dúvida, entre em contato pelo WhatsApp</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/produtos"
              className="bg-fartura-green-500 hover:bg-fartura-green-600 text-white px-6 py-3 rounded-md inline-flex items-center justify-center"
            >
              Continuar Comprando
            </Link>
            <a
              href="https://wa.me/5585991289449"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md inline-flex items-center justify-center"
            >
              Tirar Dúvidas no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}