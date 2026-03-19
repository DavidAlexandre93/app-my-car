import { DashboardData } from '../types';

export const mockDashboardData: DashboardData = {
  customer: {
    name: 'Lucas Martins',
    unit: 'Impacto Prime • Taboão da Serra',
    nextRevision: '20 jun 2026'
  },
  vehicles: [
    {
      id: 'veh-1',
      plate: 'BRA2E19',
      brand: 'Jeep',
      model: 'Compass Longitude',
      year: 2021,
      mileage: 48210,
      notes: 'Cliente prefere contato via WhatsApp após 18h.'
    },
    {
      id: 'veh-2',
      plate: 'GOL9A45',
      brand: 'Volkswagen',
      model: 'Gol 1.6 MSI',
      year: 2019,
      mileage: 76340,
      notes: 'Uso diário para trabalho, priorizar revisão rápida.'
    }
  ],
  activeServices: [
    {
      id: 'srv-1',
      vehicleId: 'veh-1',
      title: 'Revisão completa + alinhamento',
      description: 'Troca de óleo, filtros, alinhamento e inspeção do sistema de freios.',
      eta: 'Hoje, 17:40',
      budget: 'R$ 1.280,00',
      steps: [
        { label: 'Veículo recebido', completed: true },
        { label: 'Em análise', completed: true },
        { label: 'Orçamento aprovado', completed: true },
        { label: 'Serviço em execução', completed: true, current: true },
        { label: 'Finalizado', completed: false },
        { label: 'Pronto para retirada', completed: false }
      ]
    }
  ],
  promotions: [
    {
      id: 'pro-1',
      title: 'Combo de troca de óleo premium',
      description: 'Mão de obra + filtro de óleo + checklist de 20 itens.',
      highlight: 'Até 20% OFF'
    },
    {
      id: 'pro-2',
      title: 'Pneus aro 18 com instalação grátis',
      description: 'Marcas premium com alinhamento e balanceamento inclusos.',
      highlight: '4x sem juros'
    },
    {
      id: 'pro-3',
      title: 'Campanha de freios e suspensão',
      description: 'Avaliação gratuita para pastilhas, discos e amortecedores.',
      highlight: 'Check-up grátis'
    }
  ],
  catalog: [
    {
      id: 'cat-1',
      name: 'Pneu Michelin Primacy 4',
      category: 'Pneus',
      description: 'Alta aderência e conforto para uso urbano e rodoviário.',
      price: 'R$ 899,00',
      stock: '8 unidades'
    },
    {
      id: 'cat-2',
      name: 'Bateria Moura 60Ah',
      category: 'Baterias',
      description: 'Excelente partida e durabilidade para veículos leves.',
      price: 'R$ 579,00',
      stock: '12 unidades'
    },
    {
      id: 'cat-3',
      name: 'Kit pastilha dianteira Bosch',
      category: 'Freios',
      description: 'Reposição com baixo ruído e maior vida útil.',
      price: 'R$ 249,00',
      stock: '15 kits'
    },
    {
      id: 'cat-4',
      name: 'Revisão preventiva 40 mil km',
      category: 'Serviços',
      description: 'Inspeção geral com scanner, fluidos e filtros essenciais.',
      price: 'Sob consulta',
      stock: 'Agenda disponível'
    }
  ],
  history: [
    {
      id: 'his-1',
      vehicleId: 'veh-1',
      title: 'Troca de óleo e filtro',
      date: '12 mar 2026',
      details: 'Aplicado óleo sintético 5W30 e substituído filtro de óleo.',
      amount: 'R$ 390,00'
    },
    {
      id: 'his-2',
      vehicleId: 'veh-1',
      title: 'Alinhamento e balanceamento',
      date: '18 dez 2025',
      details: 'Correção da geometria e balanceamento das quatro rodas.',
      amount: 'R$ 180,00'
    },
    {
      id: 'his-3',
      vehicleId: 'veh-2',
      title: 'Troca de bateria',
      date: '21 nov 2025',
      details: 'Instalação de bateria Moura 60Ah com teste de alternador.',
      amount: 'R$ 620,00'
    }
  ],
  notifications: [
    {
      id: 'not-1',
      type: 'service',
      title: 'Serviço em andamento',
      message: 'Seu Compass já está em execução na oficina e segue dentro do prazo estimado.',
      date: 'Hoje • 14:32',
      read: false
    },
    {
      id: 'not-2',
      type: 'pickup',
      title: 'Retirada prevista para hoje',
      message: 'Assim que o checklist final for concluído, avisaremos para retirada do veículo.',
      date: 'Hoje • 10:18',
      read: false
    },
    {
      id: 'not-3',
      type: 'revision',
      title: 'Lembrete de revisão periódica',
      message: 'Seu Gol está próximo da revisão trimestral preventiva.',
      date: '18 mar 2026',
      read: true
    }
  ]
};
