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

export const promotionPushExample =
  'Impacto Prime: revisão completa com 15% de desconto nesta semana. Aproveite!';

export const pushChannelRecommendation: PushChannelRecommendation = {
  provider: 'Firebase Cloud Messaging (FCM)',
  reason:
    'Permite enviar push notifications promocionais e transacionais com segmentação, escalabilidade e integração simples ao app mobile.',
  useCases: ['Promoções e campanhas', 'Mudança de status do serviço', 'Veículo pronto para retirada'],
};

export const getPromotionNotifications = (notifications: AppNotification[]) =>
  notifications.filter((notification) => notification.type === 'promo');
