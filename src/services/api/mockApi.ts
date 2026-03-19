import { mockDashboardData } from './mockData';
import { AdminQuoteRequest, AppNotification, DashboardData, QuoteRequest } from '../../types';

const simulateDelay = async (time = 450) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const deepClone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const parseHistoryDate = (date: string) => {
  const [day, month, year] = date.split('/').map(Number);
  if (!day || !month || !year) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const formatDateLabel = (date: Date) =>
  date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const addMonths = (date: Date, months: number) => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
};

let dashboardState: DashboardData = deepClone(mockDashboardData);
let quoteSequence = dashboardState.adminPanel.quoteRequests.length + 1;

const getVehicleById = (state: DashboardData, vehicleId: string) =>
  state.vehicles.find((vehicle) => vehicle.id === vehicleId) ?? null;

const getLatestVehicleHistoryDate = (state: DashboardData, vehicleId: string) => {
  const historyDates = state.history
    .filter((item) => item.vehicleId === vehicleId)
    .map((item) => parseHistoryDate(item.date))
    .filter((item): item is Date => item instanceof Date)
    .sort((left, right) => right.getTime() - left.getTime());

  return historyDates[0] ?? null;
};

const upsertRevisionReminderNotifications = (state: DashboardData) => {
  const now = new Date();
  const revisionNotifications = state.vehicles.flatMap((vehicle) => {
    const latestHistoryDate = getLatestVehicleHistoryDate(state, vehicle.id);
    const nextRevisionDate = latestHistoryDate ? addMonths(latestHistoryDate, 3) : null;
    const shouldNotifyByHistory = nextRevisionDate ? nextRevisionDate.getTime() <= now.getTime() : false;
    const shouldNotifyByStatus = vehicle.statusLabel.toLowerCase().includes('revisão trimestral pendente');

    if (!shouldNotifyByHistory && !shouldNotifyByStatus) {
      return [];
    }

    const existing = state.notifications.find(
      (notification) => notification.type === 'revision' && notification.details?.vehicleId === vehicle.id,
    );

    const message = nextRevisionDate
      ? `O veículo ${vehicle.brand} ${vehicle.model} (${vehicle.plate}) está elegível para revisão periódica. Próxima revisão sugerida em ${formatDateLabel(nextRevisionDate)}.`
      : `O veículo ${vehicle.brand} ${vehicle.model} (${vehicle.plate}) já pode receber o lembrete trimestral de revisão preventiva.`;

    const notification: AppNotification = {
      id: existing?.id ?? `revision-${vehicle.id}`,
      type: 'revision',
      title: 'Lembrete de revisão periódica',
      message,
      date: existing?.date ?? formatDateLabel(now),
      read: existing?.read ?? false,
      details: {
        vehicleId: vehicle.id,
        vehicleLabel: `${vehicle.brand} ${vehicle.model} • ${vehicle.plate}`,
        nextRevisionDate: nextRevisionDate ? formatDateLabel(nextRevisionDate) : undefined,
      },
    };

    return [notification];
  });

  const nonRevisionNotifications = state.notifications.filter((notification) => notification.type !== 'revision');
  state.notifications = [...revisionNotifications, ...nonRevisionNotifications];
};

const refreshDashboardDerivedState = (state: DashboardData) => {
  upsertRevisionReminderNotifications(state);
  return state;
};

export const fetchDashboardData = async (): Promise<DashboardData> => {
  await simulateDelay();
  refreshDashboardDerivedState(dashboardState);
  return deepClone(dashboardState);
};

export const submitQuoteRequest = async (
  payload: QuoteRequest,
  options?: { customerName?: string; sourceLabel?: string },
) => {
  await simulateDelay(700);

  refreshDashboardDerivedState(dashboardState);

  const vehicle = getVehicleById(dashboardState, payload.vehicleId);
  const requestedItems = payload.categories.join(', ');
  const protocol = `IP-${String(quoteSequence).padStart(4, '0')}`;
  const customerName = options?.customerName?.trim() || dashboardState.customer.name;
  const vehicleLabel = vehicle
    ? `${vehicle.brand} ${vehicle.model} • ${vehicle.plate}`
    : `${options?.sourceLabel ?? 'Veículo não localizado'}`;

  const adminQuoteRequest: AdminQuoteRequest = {
    id: `quote-${quoteSequence}`,
    customerName,
    vehicleLabel,
    request: `${requestedItems}${payload.description ? ` • ${payload.description}` : ''}`,
    status: 'Novo',
  };

  dashboardState.adminPanel.quoteRequests = [adminQuoteRequest, ...dashboardState.adminPanel.quoteRequests];

  dashboardState.notifications = [
    {
      id: `quote-notification-${quoteSequence}`,
      type: 'quote',
      title: 'Orçamento enviado para análise',
      message: `Seu pedido ${protocol} foi enviado ao administrador com os itens: ${requestedItems}.`,
      date: 'Agora',
      read: false,
      details: {
        vehicleId: vehicle?.id,
        vehicleLabel,
        protocol,
      },
    },
    ...dashboardState.notifications,
  ];

  dashboardState.kpis = dashboardState.kpis.map((kpi) =>
    kpi.id === 'kpi-3'
      ? { ...kpi, value: `${dashboardState.adminPanel.quoteRequests.length} na fila` }
      : kpi,
  );

  quoteSequence += 1;
  refreshDashboardDerivedState(dashboardState);

  return {
    success: true,
    protocol,
    message: `Pedido registrado no sistema e enviado ao administrador para análise e retorno ao cliente: ${requestedItems}.`,
  };
};

export const resetMockDashboardData = () => {
  dashboardState = deepClone(mockDashboardData);
  quoteSequence = dashboardState.adminPanel.quoteRequests.length + 1;
  refreshDashboardDerivedState(dashboardState);
};
