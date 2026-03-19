import { mockDashboardData } from './mockData';
import { DashboardData, QuoteRequest } from '../../types';

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

  const requestedItems = payload.categories.join(', ');

  return {
    success: true,
    protocol: `IP-${payload.vehicleId.toUpperCase()}-0326`,
    message: `Pedido registrado no sistema e enviado ao administrador para análise e retorno ao cliente: ${requestedItems}.`,
  };
};
