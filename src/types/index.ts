export type Vehicle = {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  notes: string;
};

export type ServiceStatusStep = {
  label: string;
  completed: boolean;
  current?: boolean;
};

export type ActiveService = {
  id: string;
  vehicleId: string;
  title: string;
  description: string;
  eta: string;
  budget: string;
  steps: ServiceStatusStep[];
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  highlight: string;
};

export type CatalogItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  stock: string;
};

export type ServiceHistoryItem = {
  id: string;
  vehicleId: string;
  title: string;
  date: string;
  details: string;
  amount: string;
};

export type AppNotification = {
  id: string;
  type: 'promo' | 'service' | 'pickup' | 'revision' | 'quote';
  title: string;
  message: string;
  date: string;
  read: boolean;
};

export type QuoteRequest = {
  vehicleId: string;
  type: string;
  description: string;
};

export type DashboardData = {
  customer: {
    name: string;
    unit: string;
    nextRevision: string;
  };
  vehicles: Vehicle[];
  activeServices: ActiveService[];
  promotions: Promotion[];
  catalog: CatalogItem[];
  history: ServiceHistoryItem[];
  notifications: AppNotification[];
};
