import { AppNotification } from '../../types';

export type PromotionNotificationCategory = {
  id: string;
  title: string;
  description: string;
};

export type PushChannelRecommendation = {
  provider: string;
  reason: string;
  useCases: string[];
};

export type PromotionCampaignPlan = {
  id: string;
  title: string;
  trigger: string;
  audience: string;
  objective: string;
};

export const promotionNotificationCategories: PromotionNotificationCategory[] = [
  {
    id: 'promo-oil',
    title: 'Troca de óleo com desconto',
    description: 'Campanhas para revisões rápidas com foco em conversão e retorno à oficina.',
  },
  {
    id: 'promo-alignment',
    title: 'Alinhamento e balanceamento em promoção',
    description: 'Ofertas sazonais para serviços de estabilidade, desgaste uniforme e conforto.',
  },
  {
    id: 'promo-tires',
    title: 'Ofertas de pneus',
    description: 'Disparos segmentados para pneus por aro, marca ou condição especial de pagamento.',
  },
  {
    id: 'promo-revision',
    title: 'Revisão preventiva',
    description: 'Mensagens para incentivar check-up antes de viagens, feriados ou manutenção periódica.',
  },
  {
    id: 'promo-seasonal',
    title: 'Campanhas sazonais',
    description: 'Ações temáticas por período do ano, como férias, chuva ou troca de estação.',
  },
];

export const promotionCampaignPlans: PromotionCampaignPlan[] = [
  {
    id: 'plan-oil',
    title: 'Oferta relâmpago de troca de óleo',
    trigger: 'Veículos próximos da quilometragem de revisão',
    audience: 'Clientes com revisão leve prevista para os próximos 30 dias',
    objective: 'Aumentar recorrência em serviços rápidos e gerar nova visita à oficina.',
  },
  {
    id: 'plan-alignment',
    title: 'Campanha de alinhamento e balanceamento',
    trigger: 'Pós-venda de pneus ou retorno após viagens longas',
    audience: 'Clientes que trocaram pneus ou estão há mais de 6 meses sem alinhamento',
    objective: 'Estimular manutenção corretiva simples e preservar a vida útil dos pneus.',
  },
  {
    id: 'plan-seasonal',
    title: 'Campanhas sazonais',
    trigger: 'Feriados, início do período de chuva e férias escolares',
    audience: 'Base ativa da unidade com segmentação por histórico de serviços',
    objective: 'Gerar demanda para revisão preventiva, freios, bateria e pneus em períodos estratégicos.',
  },
];

export const promotionPushExample =
  'Impacto Prime: revisão completa com 15% de desconto nesta semana. Aproveite!';

export const pushChannelRecommendation: PushChannelRecommendation = {
  provider: 'Firebase Cloud Messaging (FCM)',
  reason:
    'Permite enviar push notifications promocionais e transacionais com segmentação, escalabilidade e integração simples ao app mobile.',
  useCases: [
    'Promoções e campanhas',
    'Mudança de status do serviço',
    'Veículo pronto para retirada',
    'Lembretes de revisão preventiva',
  ],
};

export const getPromotionNotifications = (notifications: AppNotification[]) =>
  notifications.filter((notification) => notification.type === 'promo');
