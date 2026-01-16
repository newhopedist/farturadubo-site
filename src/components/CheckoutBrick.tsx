'use client'

import { useEffect, useState } from 'react'
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'

// Inicializa o Mercado Pago com a chave pública
// Se a chave não existir, o componente lida com isso graciosamente
const PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || ''

if (PUBLIC_KEY) {
  initMercadoPago(PUBLIC_KEY)
}

interface CheckoutBrickProps {
  amount: number
  description: string
  onPaymentComplete: (id: string) => void
}

export default function CheckoutBrick({ amount, description, onPaymentComplete }: CheckoutBrickProps) {
  const [preferenceId, setPreferenceId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cria a preferência de pagamento no backend assim que o componente monta
    const createPreference = async () => {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: description,
            quantity: 1,
            price: amount,
          }),
        })

        if (response.ok) {
          const { id } = await response.json()
          setPreferenceId(id)
        }
      } catch (error) {
        console.error('Erro ao criar preferência:', error)
      } finally {
        setLoading(false)
      }
    }

    if (PUBLIC_KEY) {
      createPreference()
    } else {
      setLoading(false)
    }
  }, [amount, description])

  if (!PUBLIC_KEY) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800 text-sm">
        <p className="font-bold">Configuração Necessária</p>
        <p>Adicione NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY nas variáveis de ambiente.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fartura-green-600"></div>
      </div>
    )
  }

  if (!preferenceId) {
    return (
      <div className="text-center text-red-500 p-4">
        Erro ao carregar checkout. Tente novamente.
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
      <Payment
        initialization={{ preferenceId }}
        customization={{
          paymentMethods: {
            ticket: 'all',
            bankTransfer: 'all',
            creditCard: 'all',
            debitCard: 'all',
            mercadoPago: 'all',
          },
        }}
        onSubmit={async ({ selectedPaymentMethod, formData }) => {
          // Callback quando o pagamento é processado
          console.log('Pagamento enviado:', formData)
          // Aqui você chamaria sua API para confirmar
          // Por enquanto vamos simular sucesso
          return new Promise((resolve) => {
            setTimeout(() => {
              onPaymentComplete('mock-payment-id')
              resolve()
            }, 2000)
          })
        }}
      />
    </div>
  )
}
