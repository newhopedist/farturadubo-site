import { Leaf, Sprout, Tractor, Scale, Droplets, Sun, Timer, TrendingUp, ShieldCheck } from 'lucide-react'

export interface ProductDetailContent {
  slug: string
  title: string
  subtitle: string
  targetAudience: string
  description: string
  price: number // Adicionado
  benefits: {
    icon: any
    title: string
    text: string
  }[]
  applicationGuide: {
    title: string
    steps: string[]
  }
  results: {
    before: string
    after: string
    days: number
  }
  cta: {
    text: string
    link: string
    type: 'whatsapp' | 'mercadolivre'
  }
  specs: {
    weight: string
    type: string
    coverage: string
  }
}

export const productContents: Record<string, ProductDetailContent> = {
  'fartureia-5kg': {
    slug: 'fartureia-5kg',
    title: 'Fartureia 5kg - Jardim & Pomar',
    subtitle: 'O segredo para ter frutas doces e plantas sempre verdes em casa.',
    targetAudience: 'Ideal para Jardinagem, Árvores Frutíferas e Hortas Caseiras',
    description: 'Você nota que suas plantas estão amareladas, sem força ou que as frutas caem antes de amadurecer? A Fartureia 5kg é a dose certa de energia. Com tecnologia profissional adaptada para sua casa, ela fornece Nitrogênio (para o verde) e Enxofre (para a saúde), garantindo uma explosão de vida no seu jardim.',
    price: 29.90,
    benefits: [
      {
        icon: Sprout,
        title: 'Explosão de Verde',
        text: 'Recupera plantas amareladas e sem vida em poucos dias.'
      },
      {
        icon: Sun,
        title: 'Frutos Mais Fortes',
        text: 'Evita o abortamento (queda) de frutos e flores.'
      },
      {
        icon: Droplets,
        title: 'Fácil de Aplicar',
        text: 'Grânulos soltos que não empedram e dissolvem fácil na rega.'
      }
    ],
    applicationGuide: {
      title: 'Guia Prático para Casa',
      steps: [
        'Vasos Pequenos (Violetas, Samambaias): 1 colher de chá rasa a cada 15 dias.',
        'Vasos Grandes e Arbustos: 1 colher de sopa cheia espalhada na terra (longe do caule).',
        'Árvores Frutíferas (Limão, Manga, Acerola): 1 copo americano (150g) ao redor da projeção da copa (sombra da árvore).',
        'Gramados: 1 punhado espalhado uniformemente por metro quadrado.',
        'Armazenamento: Fechar bem a embalagem após o uso e guardar em local seco e sombreado.'
      ]
    },
    results: {
      before: 'Folhas pálidas, crescimento lento e poucas flores.',
      after: 'Folhas verde-escuro brilhante, novos brotos vigorosos e floração abundante.',
      days: 15
    },
    cta: {
      text: 'COMPRAR AGORA',
      link: 'https://lista.mercadolivre.com.br/_CustId_123456789', // TODO: Link real
      type: 'mercadolivre'
    },
    specs: {
      weight: '5kg',
      type: 'Embalagem Plástica Resistente',
      coverage: 'Rende até 50 árvores frutíferas médias'
    }
  },
  'fartureia-25kg': {
    slug: 'fartureia-25kg',
    title: 'Fartureia 25kg - O Parceiro do Produtor',
    subtitle: 'Produtividade profissional para pequenas propriedades e hortifruti.',
    targetAudience: 'Pequenos Produtores, Sítios, Chácaras e Horticultores',
    description: 'Para quem vive da terra, cada saco de adubo é um investimento. A embalagem de 25kg foi pensada para o produtor que precisa de resultado profissional sem desperdício. Ideal para culturas de ciclo rápido (milho verde, feijão, hortaliças) e manutenção de pastagens em piquetes.',
    price: 110.00,
    benefits: [
      {
        icon: TrendingUp,
        title: 'Rendimento Superior',
        text: 'Tecnologia que reduz perdas por volatilização comparado à ureia comum.'
      },
      {
        icon: Scale,
        title: 'Embalagem Econômica',
        text: 'O tamanho ideal para quem planta até 2 hectares ou faz manejo rotacionado.'
      },
      {
        icon: Timer,
        title: 'Resposta Rápida',
        text: 'Sinergia Nitrogênio + Enxofre acelera o desenvolvimento vegetativo.'
      }
    ],
    applicationGuide: {
      title: 'Sugestão de Manejo',
      steps: [
        'Milho e Feijão: Aplicar 150kg a 200kg por hectare em cobertura (V4-V6).',
        'Hortaliças: Parcelar a aplicação conforme a necessidade da cultura.',
        'Capineiras: Aplicar após cada corte para rebrota vigorosa.',
        'Dica: Aplique preferencialmente com solo úmido para máxima absorção.',
        'Armazenamento: Manter em galpão coberto, ventilado e sobre estrados de madeira. Não empilhar mais de 10 sacos.'
      ]
    },
    results: {
      before: 'Plantas com desenvolvimento desigual e baixo vigor.',
      after: 'Lavoura uniforme, estande fechado e folhas largas.',
      days: 20
    },
    cta: {
      text: 'COMPRAR AGORA',
      link: 'https://lista.mercadolivre.com.br/_CustId_123456789',
      type: 'mercadolivre'
    },
    specs: {
      weight: '25kg',
      type: 'Sacaria Laminada',
      coverage: 'Cobre aprox. 0.2 a 0.5 hectare dependendo da cultura'
    }
  },
  'fartureia-bigbag-500kg': {
    slug: 'fartureia-bigbag-500kg',
    title: 'Fartureia Big Bag 500kg',
    subtitle: 'Alta performance para agricultura de precisão.',
    targetAudience: 'Médios Produtores e Lavouras Mecanizadas',
    description: 'Logística eficiente para quem precisa de velocidade no plantio e na cobertura. O Big Bag de 500kg facilita o abastecimento de implementos e reduz o tempo de parada da máquina. Tecnologia N+S garantida para altas produtividades em soja, milho e algodão.',
    price: 1575.00,
    benefits: [
      {
        icon: Tractor,
        title: 'Operação Mecanizada',
        text: 'Ideal para abastecimento rápido de distribuidores e adubadeiras.'
      },
      {
        icon: Scale,
        title: 'Uniformidade',
        text: 'Granulometria padronizada que garante distribuição homogênea no campo.'
      },
      {
        icon: TrendingUp,
        title: 'Custo-Benefício',
        text: 'Menor custo por ponto de Nitrogênio aplicado.'
      }
    ],
    applicationGuide: {
      title: 'Recomendação Técnica',
      steps: [
        'Consulte sempre seu Engenheiro Agrônomo.',
        'Compatível com agricultura de precisão e taxa variável.',
        'Ideal para cobertura em área total.',
        'Armazenamento: Armazenar em local coberto, seco e ventilado. Empilhamento máximo de 3 big bags (com segurança).'
      ]
    },
    results: {
      before: 'Manejo operacional lento com sacaria pequena.',
      after: 'Ganho operacional de até 30% no tempo de abastecimento.',
      days: 0
    },
    cta: {
      text: 'COTAR CARGA',
      link: 'https://wa.me/5585991289449?text=Olá,%20tenho%20interesse%20no%20BigBag%20de%20500kg',
      type: 'whatsapp'
    },
    specs: {
      weight: '500kg',
      type: 'Big Bag Reforçado',
      coverage: 'Conforme recomendação agronômica'
    }
  },
  'fartureia-bigbag-1000kg': {
    slug: 'fartureia-bigbag-1000kg',
    title: 'Fartureia Big Bag 1 Tonelada',
    subtitle: 'Escala industrial para o agronegócio de ponta.',
    targetAudience: 'Grandes Produtores e Commodities',
    description: 'A solução definitiva para grandes áreas. Maximize a eficiência logística da sua fazenda com Big Bags de 1000kg. Menos movimentação, mais adubo no solo. Produto com tratamento anti-caking de alta qualidade, garantindo fluidez total nas máquinas.',
    price: 3150.00,
    benefits: [
      {
        icon: Tractor,
        title: 'Máxima Eficiência Logística',
        text: 'Otimiza o frete e o armazenamento no galpão.'
      },
      {
        icon: ShieldCheck,
        title: 'Qualidade Exportação',
        text: 'Rigoroso controle de qualidade física e química.'
      },
      {
        icon: TrendingUp,
        title: 'Alta Tecnologia',
        text: 'Fonte nitrogenada estabilizada de alta concentração.'
      }
    ],
    applicationGuide: {
      title: 'Recomendação Técnica',
      steps: [
        'Uso exclusivo profissional/agrícola.',
        'Necessário equipamento de guincho/bag para movimentação.',
        'Ideal para adubação de base ou cobertura em larga escala.',
        'Consulte condições para entrega na fazenda (CIF).',
        'Armazenamento: Armazenar em galpão fechado, livre de umidade. Evitar exposição direta ao sol.'
      ]
    },
    results: {
      before: '-',
      after: 'Produtividade recorde com custo operacional reduzido.',
      days: 0
    },
    cta: {
      text: 'COTAR CARGA FECHADA - R$ 3.150,00/Tn',
      link: 'https://wa.me/5585991289449?text=Olá,%20tenho%20interesse%20em%20Carga%20Fechada%20de%20BigBags%201Ton',
      type: 'whatsapp'
    },
    specs: {
      weight: '1000kg',
      type: 'Big Bag Alta Resistência',
      coverage: 'Conforme recomendação agronômica'
    }
  }
}
