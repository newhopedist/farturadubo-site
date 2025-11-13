import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso | FARTURADUBO',
  description: 'Leia os Termos de Uso da FARTURADUBO. Regras de navegação, responsabilidade e direitos aplicáveis ao uso do site.',
}

export default function TermosDeUsoPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-fartura-green-900 mb-6">Termos de Uso</h1>
          <p className="text-gray-700 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar este site, você concorda com estes Termos de Uso. Caso não concorde, por favor
                interrompa a navegação.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Conteúdo e Informações</h2>
              <p>
                As informações apresentadas têm caráter informativo e podem ser atualizadas sem aviso prévio. Esforços
                são realizados para manter a precisão, porém não garantimos ausência de erros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Uso Adequado</h2>
              <p>
                É proibido utilizar o site para qualquer finalidade ilícita, violar direitos de terceiros, comprometer a
                segurança ou realizar tentativas de acesso não autorizado.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Propriedade Intelectual</h2>
              <p>
                Marcas, textos, imagens e demais conteúdos são de propriedade da FARTURADUBO ou licenciados, sendo
                vedada sua reprodução sem autorização.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Links para Terceiros</h2>
              <p>
                O site pode conter links externos. Não nos responsabilizamos por conteúdos, políticas ou práticas de
                terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Limitação de Responsabilidade</h2>
              <p>
                Não nos responsabilizamos por danos diretos ou indiretos decorrentes do uso do site, salvo quando
                expressamente previsto em lei.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Privacidade</h2>
              <p>
                O uso dos seus dados é regido pela nossa Política de Privacidade. Consulte em
                <a href="/politica-de-privacidade" className="text-fartura-green-700 hover:underline"> /politica-de-privacidade</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Alterações dos Termos</h2>
              <p>
                Podemos atualizar estes termos a qualquer momento. A versão vigente será sempre publicada nesta página.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-fartura-green-800 mb-2">Contato</h2>
              <p>
                Dúvidas sobre estes Termos podem ser enviadas para o e-mail
                <span className="font-medium"> vendas@farturadubo.com.br</span> ou WhatsApp
                <span className="font-medium"> +55 85 99128-9449</span>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}

