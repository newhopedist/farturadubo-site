'use client'

import { useEffect, useState } from 'react'
import { getAllOrders, updateOrderStatus } from '@/services/orders'
import { Eye, Package, Clock, CheckCircle, Truck, Filter, Search } from 'lucide-react'
import NotificationBell from '@/components/NotificationBell'

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

const statusOptions = [
  { value: 'all', label: 'Todos os Status', color: 'bg-gray-100 text-gray-800' },
  { value: 'pending', label: 'Aguardando Pagamento', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmed', label: 'Pagamento Confirmado', color: 'bg-green-100 text-green-800' },
  { value: 'shipped', label: 'Em Transporte', color: 'bg-blue-100 text-blue-800' },
  { value: 'delivered', label: 'Entregue', color: 'bg-purple-100 text-purple-800' }
]

const statusActions = {
  pending: 'confirmar_pagamento',
  confirmed: 'enviar_pedido',
  shipped: 'marcar_entregue'
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [orders, selectedStatus, searchTerm])

  const loadOrders = async () => {
    try {
      const ordersData = await getAllOrders(selectedStatus === 'all' ? undefined : selectedStatus)
      setOrders(ordersData)
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.endereco_entrega.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.endereco_entrega.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.order_items.some(item => 
          item.products.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    setFilteredOrders(filtered)
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus)
      if (updatedOrder) {
        // Recarregar pedidos
        await loadOrders()
        // Atualizar pedido selecionado se for o mesmo
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(updatedOrder)
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status do pedido')
    }
  }

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status)
    if (!statusOption) return null
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusOption.color}`}>
        {statusOption.label}
      </span>
    )
  }

  const getNextAction = (status: string) => {
    switch (status) {
      case 'pending':
        return { action: 'confirmed', label: 'Confirmar Pagamento', color: 'bg-green-500 hover:bg-green-600' }
      case 'confirmed':
        return { action: 'shipped', label: 'Marcar como Enviado', color: 'bg-blue-500 hover:bg-blue-600' }
      case 'shipped':
        return { action: 'delivered', label: 'Marcar como Entregue', color: 'bg-purple-500 hover:bg-purple-600' }
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fartura-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando pedidos...</p>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-gray-600">Gerencie os pedidos da loja</p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <span className="text-sm text-gray-500">
                {filteredOrders.length} pedido{filteredOrders.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por ID, cliente ou produto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-fartura-green-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Pedidos */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum pedido encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pagamento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        <div className="text-xs text-gray-500">
                          {order.order_items.length} item{order.order_items.length !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.endereco_entrega.nome || 'Cliente não identificado'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.endereco_entrega.email || 'Email não disponível'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.forma_pagamento === 'pix' ? 'PIX' : 
                         order.forma_pagamento === 'boleto' ? 'Boleto' : 'Cartão'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R$ {order.valor_total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-fartura-green-600 hover:text-fartura-green-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {getNextAction(order.status) && (
                            <button
                              onClick={() => handleStatusChange(order.id, getNextAction(order.status)!.action)}
                              className={`px-3 py-1 rounded text-xs font-medium text-white ${getNextAction(order.status)!.color}`}
                            >
                              {getNextAction(order.status)!.label}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes do Pedido */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Detalhes do Pedido #{selectedOrder.id}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informações do Cliente */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Informações do Cliente</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Nome:</strong> {selectedOrder.endereco_entrega.nome || 'Não informado'}</p>
                    <p><strong>Email:</strong> {selectedOrder.endereco_entrega.email || 'Não informado'}</p>
                    <p><strong>CPF:</strong> {selectedOrder.endereco_entrega.cpf || 'Não informado'}</p>
                    <p><strong>Telefone:</strong> {selectedOrder.endereco_entrega.telefone || 'Não informado'}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Endereço de Entrega</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{selectedOrder.endereco_entrega.rua}, {selectedOrder.endereco_entrega.numero}</p>
                    {selectedOrder.endereco_entrega.complemento && (
                      <p>{selectedOrder.endereco_entrega.complemento}</p>
                    )}
                    <p>{selectedOrder.endereco_entrega.bairro}</p>
                    <p>{selectedOrder.endereco_entrega.cidade} - {selectedOrder.endereco_entrega.estado}</p>
                    <p>CEP: {selectedOrder.endereco_entrega.cep}</p>
                  </div>
                </div>
              </div>

              {/* Itens do Pedido */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Itens do Pedido</h4>
                  <div className="space-y-2">
                    {selectedOrder.order_items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.products.name}</p>
                          <p className="text-xs text-gray-600">{item.peso} × {item.quantidade}</p>
                        </div>
                        <p className="font-medium text-sm">R$ {item.subtotal.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Resumo Financeiro</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>R$ {(selectedOrder.valor_total - selectedOrder.frete).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete:</span>
                      <span>R$ {selectedOrder.frete.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Total:</span>
                      <span className="text-fartura-green-600">R$ {selectedOrder.valor_total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Fechar
              </button>
              {getNextAction(selectedOrder.status) && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, getNextAction(selectedOrder.status)!.action)
                    setSelectedOrder(null)
                  }}
                  className={`px-4 py-2 rounded-md text-white ${getNextAction(selectedOrder.status)!.color}`}
                >
                  {getNextAction(selectedOrder.status)!.label}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}