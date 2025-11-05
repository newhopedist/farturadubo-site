import Link from 'next/link'

export default function Footer() {
  const quickLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Quem Somos', href: '#about' },
    { name: 'Produtos', href: '#products' },
    { name: 'Benefícios', href: '#benefits' },
    { name: 'Contato', href: '#contact' }
  ]

  const products = [
    { name: 'FARTURAMAX NPK 20-10-10', href: '#products' },
    { name: 'FARTURAMAX NPK 15-15-15', href: '#products' },
    { name: 'FARTUREIA Foliar Plus', href: '#products' },
    { name: 'FARTUREIA Micro Mix', href: '#products' }
  ]

  const contactInfo = [
    { icon: '📍', text: 'Av. das Palmeiras, 1234 - Maringá/PR' },
    { icon: '📞', text: '(44) 3030-4040' },
    { icon: '✉️', text: 'vendas@farturadubo.com.br' },
    { icon: '🕒', text: 'Seg-Sex: 8h às 18h' }
  ]

  return (
    <footer className="bg-fartura-green-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-fartura-green-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">FARTURADUBO</h3>
                <p className="text-fartura-green-200 text-sm">Fertilizantes de Alta Qualidade</p>
              </div>
            </div>
            <p className="text-fartura-green-100 leading-relaxed mb-6 max-w-md">
              Especialistas em fertilizantes de alta performance. Comprometidos com a produtividade 
              agrícola brasileira e o sucesso dos nossos clientes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-fartura-green-700 rounded-full flex items-center justify-center hover:bg-fartura-green-600 transition-colors">
                <span className="text-sm">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-fartura-green-700 rounded-full flex items-center justify-center hover:bg-fartura-green-600 transition-colors">
                <span className="text-sm">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-fartura-green-700 rounded-full flex items-center justify-center hover:bg-fartura-green-600 transition-colors">
                <span className="text-sm">💼</span>
              </a>
              <a href="#" className="w-10 h-10 bg-fartura-green-700 rounded-full flex items-center justify-center hover:bg-fartura-green-600 transition-colors">
                <span className="text-sm">🐦</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-fartura-green-100 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.name}>
                  <Link 
                    href={product.href}
                    className="text-fartura-green-100 hover:text-white transition-colors text-sm"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-fartura-green-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Informações de Contato</h4>
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-fartura-green-300">{info.icon}</span>
                    <span className="text-fartura-green-100 text-sm">{info.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Atendimento</h4>
              <p className="text-fartura-green-100 text-sm mb-4">
                Nossa equipe de especialistas está pronta para ajudar você a escolher 
                os melhores fertilizantes para a sua lavoura.
              </p>
              <div className="bg-fartura-green-800 rounded-lg p-4">
                <p className="text-fartura-green-100 text-sm mb-2">💬 WhatsApp Comercial</p>
                <p className="text-white font-semibold">(44) 9 9876-5432</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-fartura-green-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-fartura-green-200 text-sm">
              © 2024 FARTURADUBO. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-fartura-green-200 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-fartura-green-200 hover:text-white text-sm transition-colors">
                Termos de Uso
              </Link>
              <Link href="#" className="text-fartura-green-200 hover:text-white text-sm transition-colors">
                Mapa do Site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}