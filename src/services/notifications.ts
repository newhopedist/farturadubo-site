// Sistema simples de notificações para novos pedidos
// Em produção, isso seria substituído por um serviço real como email, SMS ou push notifications

export interface NotificationData {
  orderId: string
  customerName: string
  customerEmail: string
  totalValue: number
  paymentMethod: string
  itemsCount: number
  timestamp: string
}

export async function sendNewOrderNotification(data: NotificationData) {
  try {
    // Notificação para o cliente (email seria implementado aqui)
    console.log('📧 Enviando notificação para cliente:', data.customerEmail)
    
    // Notificação para o administrador (WhatsApp/email seria implementado aqui)
    console.log('📱 Enviando notificação para admin - Novo pedido:', data.orderId)
    
    // Notificação interna (poderia ser armazenada no banco para dashboard)
    const notification = {
      type: 'new_order',
      title: `Novo Pedido #${data.orderId}`,
      message: `${data.customerName} realizou um pedido de R$ ${data.totalValue.toFixed(2)}`,
      data: data,
      timestamp: new Date().toISOString(),
      read: false
    }
    
    // Armazenar notificação no localStorage (para demonstração)
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    notifications.unshift(notification)
    
    // Manter apenas as últimas 50 notificações
    if (notifications.length > 50) {
      notifications.splice(50)
    }
    
    localStorage.setItem('notifications', JSON.stringify(notifications))
    
    // Disparar evento customizado para atualizar interface
    window.dispatchEvent(new CustomEvent('newNotification', { detail: notification }))
    
    return true
  } catch (error) {
    console.error('Erro ao enviar notificação:', error)
    return false
  }
}

export async function getNotifications(limit: number = 10) {
  try {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    return notifications.slice(0, limit)
  } catch (error) {
    console.error('Erro ao buscar notificações:', error)
    return []
  }
}

export async function markNotificationAsRead(notificationIndex: number) {
  try {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    if (notifications[notificationIndex]) {
      notifications[notificationIndex].read = true
      localStorage.setItem('notifications', JSON.stringify(notifications))
      return true
    }
    return false
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error)
    return false
  }
}

export async function markAllNotificationsAsRead() {
  try {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    notifications.forEach((notification: any) => {
      notification.read = true
    })
    localStorage.setItem('notifications', JSON.stringify(notifications))
    return true
  } catch (error) {
    console.error('Erro ao marcar todas as notificações como lidas:', error)
    return false
  }
}

// Função para enviar notificação de mudança de status do pedido
export async function sendOrderStatusNotification(orderId: string, newStatus: string, customerEmail: string) {
  try {
    const statusNames = {
      pending: 'Aguardando Pagamento',
      confirmed: 'Pagamento Confirmado',
      shipped: 'Em Transporte',
      delivered: 'Entregue'
    }

    const notification = {
      type: 'order_status_update',
      title: `Pedido #${orderId} - Status Atualizado`,
      message: `Seu pedido agora está: ${statusNames[newStatus as keyof typeof statusNames]}`,
      data: { orderId, newStatus, customerEmail },
      timestamp: new Date().toISOString(),
      read: false
    }
    
    // Armazenar notificação
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    notifications.unshift(notification)
    
    if (notifications.length > 50) {
      notifications.splice(50)
    }
    
    localStorage.setItem('notifications', JSON.stringify(notifications))
    
    // Disparar evento
    window.dispatchEvent(new CustomEvent('newNotification', { detail: notification }))
    
    return true
  } catch (error) {
    console.error('Erro ao enviar notificação de status:', error)
    return false
  }
}