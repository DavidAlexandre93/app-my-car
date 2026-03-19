import { mockDashboardData } from '../data/mockData';
import { DashboardData, QuoteRequest } from '../types';

const simulateDelay = async (time = 450) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

export const fetchDashboardData = async (): Promise<DashboardData> => {
  await simulateDelay();
  return mockDashboardData;
};

export const submitQuoteRequest = async (payload: QuoteRequest) => {
  await simulateDelay(700);

  return {
    success: true,
    protocol: `IP-${payload.vehicleId.toUpperCase()}-0326`,
    message: 'Solicitação enviada para a equipe da Impacto Prime.'
  };
};
