import React from 'react'

export default function Benefits() {
  const benefits = [
    {
      title: "1. Alta Eficiência Nutritiva",
      description:
        "Nossos fertilizantes são desenvolvidos com formulações balanceadas que combinam ureia e sulfato de amônia, proporcionando máxima absorção de nitrogênio e enxofre pelas plantas. O resultado é uma nutrição uniforme, com liberação gradual e aproveitamento superior dos nutrientes essenciais ao crescimento saudável.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6c-3 5-6 6-6 9a6 6 0 0012 0c0-3-3-4-6-9z" />
        </svg>
      ),
    },
    {
      title: "2. Aumento de Produtividade",
      description:
        "Com tecnologia de alta eficiência, o FARTUREIA proporciona melhor aproveitamento do nitrogênio aplicado, reduzindo perdas por volatilização e aumentando o rendimento por hectare. Isso significa mais vigor vegetativo, maior produção e retorno garantido ao produtor.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: "3. Sustentabilidade Ambiental",
      description:
        "Nossos produtos são formulados para uma agricultura mais limpa e responsável, reduzindo emissões de gases e minimizando impactos ambientais. A eficiência nutricional do FARTUREIA permite menos aplicação e menor desperdício, contribuindo para o equilíbrio ecológico do solo e para práticas agrícolas sustentáveis.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0s4 3 4 8-4 8-4 8-4-3-4-8 4-8 4-8z" />
        </svg>
      ),
    },
    {
      title: "4. Tecnologia Avançada",
      description:
        "O FARTUREIA é resultado de um processo industrial moderno, com controle de granulometria e pureza, que garante estabilidade química e dissolução uniforme no solo. Utilizamos nanotecnologia e processos de mistura de precisão, que potencializam a performance e a consistência do produto em campo.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "5. Suporte Técnico Especializado",
      description:
        "Contamos com uma equipe de profissionais qualificados para oferecer orientação personalizada aos agricultores, garantindo o uso ideal do produto para cada tipo de cultura e solo. Nosso compromisso é acompanhar o produtor do plantio à colheita, maximizando resultados e rentabilidade.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "6. Qualidade Garantida",
      description:
        "Todos os produtos FARTURADUBO passam por testes laboratoriais rigorosos, realizados no Brasil e no exterior, assegurando pureza, estabilidade e conformidade com normas internacionais. Cada lote é analisado e rastreado, garantindo eficiência comprovada e total segurança ao agricultor.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="benefits"
      className="relative py-20 scroll-mt-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/comunidade-de-pessoas-que-trabalham-juntas-na-agricultura-para-cultivar-alimentos.jpg')" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative text-center mb-16 px-6 py-10 rounded-xl">
          <div className="absolute inset-0 -z-10 bg-black/30 md:bg-black/40 rounded-xl" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Benefícios dos Nossos Fertilizantes
          </h2>
          <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Nossos produtos oferecem vantagens comprovadas para maximizar a produtividade 
            e garantir resultados excepcionais na sua lavoura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-fartura-green-100 rounded-full flex items-center justify-center mb-4 text-fartura-green-600 mx-auto">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-fartura-green-800 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
