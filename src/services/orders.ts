import { supabase } from '@/lib/supabase'
import { Cart, Address } from '@/types/ecommerce'
import { sendNewOrderNotification, sendOrderStatusNotification } from './notifications'

export interface CreateOrderData {
  cart: Cart
  customerData: {
    nome: string
    email: string
    cpf: string
    telefone: string
    endereco: Address
    formaPagamento: string
  }
}

export async function createOrder(data: CreateOrderData): Promise<string | null> {
  try {
    const { cart, customerData } = data

    // Calcular frete (simplificado - R$ 20 fixo + R$ 1 por kg)
    const pesoTotal = cart.items.reduce((total, item) => {
      const pesoKg = parseInt(item.price.peso.replace('kg', '')) || 0
      return total + (pesoKg * item.quantity)
    }, 0)
    const frete = 20 + (pesoTotal * 1)
    const valorTotal = cart.total + frete

    // Criar pedido
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: null, // Será preenchido quando tivermos autenticação
        status: 'pending',
        valor_total: valorTotal,
        frete: frete,
        endereco_entrega: customerData.endereco,
        forma_pagamento: customerData.formaPagamento,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (orderError) {
      console.error('Erro ao criar pedido:', orderError)
      return null
    }

    if (!orderData) {
      console.error('Pedido não foi criado')
      return null
    }

    // Criar itens do pedido
    const orderItems = cart.items.map(item => ({
      order_id: orderData.id,
      produto_id: item.product.id,
      peso: item.price.peso,
      quantidade: item.quantity,
      preco_unitario: item.price.preco,
      subtotal: item.subtotal
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Erro ao criar itens do pedido:', itemsError)
      // Tentar deletar o pedido se os itens falharem
      await supabase.from('orders').delete().eq('id', orderData.id)
      return null
    }

    // Atualizar estoque (diminuir quantidade)
    for (const item of cart.items) {
      const { error: stockError } = await supabase
        .from('product_prices')
        .update({ estoque: item.price.estoque - item.quantity })
        .eq('id', item.price.id)

      if (stockError) {
        console.error('Erro ao atualizar estoque:', stockError)
      }
    }

    // Enviar notificação de novo pedido
    try {
      await sendNewOrderNotification({
        orderId: orderData.id,
        customerName: customerData.nome,
        customerEmail: customerData.email,
        totalValue: valorTotal,
        paymentMethod: customerData.formaPagamento,
        itemsCount: cart.items.length,
        timestamp: orderData.created_at
      })
    } catch (notificationError) {
      console.error('Erro ao enviar notificação:', notificationError)
      // Não falhar a criação do pedido por erro de notificação
    }

    return orderData.id
  } catch (error) {
    console.error('Erro ao processar pedido:', error)
    return null
  }
}

export async function getOrderById(orderId: string) {
  try {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          products(name, description)
        )
      `)
      .eq('id', orderId)
      .single()

    if (orderError) {
      console.error('Erro ao buscar pedido:', orderError)
      return null
    }

    return order
  } catch (error) {
    console.error('Erro ao buscar pedido:', error)
    return null
  }
}

export async function getOrdersByUser(userId: string) {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          products(name, description)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar pedidos:', error)
      return []
    }

    return orders || []
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
    return []
  }
}

export async function getAllOrders(status?: string) {
  try {
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          products(name, description)
        )
      `)
      .order('created_at', { ascending: false })

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data: orders, error } = await query

    if (error) {
      console.error('Erro ao buscar pedidos:', error)
      return []
    }

    return orders || []
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
    return []
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar status do pedido:', error)
      return null
    }

    // Enviar notificação de mudança de status
    if (data) {
      try {
        await sendOrderStatusNotification(orderId, status, data.endereco_entrega?.email || '')
      } catch (notificationError) {
        console.error('Erro ao enviar notificação de status:', notificationError)
      }
    }

    return data
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error)
    return null
  }
}