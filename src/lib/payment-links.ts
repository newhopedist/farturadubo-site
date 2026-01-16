// Arquivo central para gerenciar os links de pagamento do Mercado Pago
// Quando você gerar os links no painel do MP, basta colar aqui.

export const paymentLinks = {
  'fartureia-5kg': 'https://mpago.la/2example5kg', // Link Exemplo
  'fartureia-25kg': 'https://mpago.la/2example25kg',
  'fartureia-bigbag-500kg': 'https://wa.me/5585991289449?text=Cotação%20BigBag%20500kg', // Big Bags continuam no Zap por causa do frete complexo
  'fartureia-bigbag-1000kg': 'https://wa.me/5585991289449?text=Cotação%20BigBag%201Ton',
}

export const getPaymentLink = (slug: string) => {
  return paymentLinks[slug as keyof typeof paymentLinks] || '#'
}
