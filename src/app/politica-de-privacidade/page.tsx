import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | FARTURADUBO',
  description: 'Conheça a Política de Privacidade da FARTURADUBO. Transparência no tratamento de dados pessoais, segurança e direitos dos titulares.',
}

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-fartura-green-900 mb-6">Política de Privacidade</h1>
          <p className="text-gray-700 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Quem Somos</h2>
              <p>
                NEWHOPE COMÉRCIO DE FERTILIZANTES E QUÍMICOS LTDA – CNPJ: 53.709.557/0001-62.
                Endereço: Rua João Ferreira de Araújo, 321 A, Jardim Flórida, Jacundá, Aquiraz - CE, CEP: 61700-000.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Dados Coletados</h2>
              <p>
                Coletamos informações fornecidas voluntariamente por você no formulário de contato, como nome, e-mail,
                telefone, empresa/propriedade, interesse e mensagem. Também podemos registrar dados de navegação
                (cookies e métricas) para melhorar a experiência do site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Finalidade do Tratamento</h2>
              <ul className="list-disc ml-5 space-y-1">
                <li>Responder solicitações e fornecer atendimento comercial e técnico</li>
                <li>Enviar informações sobre produtos e serviços quando autorizado</li>
                <li>Melhorar a usabilidade e desempenho do site</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Base Legal</h2>
              <p>
                O tratamento é realizado com base em consentimento, execução de medidas pré-contratuais/contratuais e
                cumprimento de obrigação legal, nos termos da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Armazenamento e Segurança</h2>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados,
                perda, alteração ou divulgação indevida. Os dados de contato podem ser armazenados em provedores
                confiáveis e são acessados apenas por pessoal autorizado.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Compartilhamento</h2>
              <p>
                Não vendemos seus dados. Podemos compartilhá-los com prestadores de serviço estritamente necessários
                para operação do site e atendimento, observando confidencialidade e segurança.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Direitos dos Titulares</h2>
              <ul className="list-disc ml-5 space-y-1">
                <li>Confirmação da existência de tratamento</li>
                <li>Acesso, correção e atualização de dados</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Portabilidade, quando aplicável</li>
                <li>Revogação do consentimento e oposição</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Cookies e Métricas</h2>
              <p>
                Utilizamos cookies estritamente necessários e métricas de uso para melhorar o site. Você pode ajustar as
                preferências no seu navegador. O uso contínuo do site implica concordância com esta política.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Contato do Encarregado</h2>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas, entre em contato pelo e-mail
                <span className="font-medium"> vendas@farturadubo.com.br</span> ou pelo WhatsApp
                <span className="font-medium"> +55 85 99128-9449</span>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Alterações nesta Política</h2>
              <p>
                Esta política pode ser atualizada periodicamente. Publicaremos a versão mais recente neste endereço.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}

