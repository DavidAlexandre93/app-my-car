export type AppObjective = {
  id: string;
  audience: string;
  title: string;
  description: string;
};

export type ReminderCadence = {
  id: string;
  title: string;
  cadence: string;
  trigger: string;
  description: string;
};

export type AdminWorkspaceItem = {
  id: string;
  owner: string;
  title: string;
  description: string;
};

export type Vehicle = {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  notes: string;
  statusLabel: string;
};

export type CustomerProfile = {
  name: string;
  phone: string;
  email: string;
};

export type AuthUser = CustomerProfile & {
  id: string;
  password: string;
  vehicles: Vehicle[];
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = CustomerProfile & {
  password: string;
};

export type VehiclePayload = {
  plate: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
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
  technician: string;
  steps: ServiceStatusStep[];
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  highlight: string;
  cta: string;
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

export type Shortcut = {
  id: string;
  label: string;
  description: string;
};

export type FeatureHighlight = {
  id: string;
  title: string;
  description: string;
};

export type AdminTask = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export type KPI = {
  id: string;
  label: string;
  value: string;
};

export type AppModule = {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
};

export type DomainEntity = {
  id: string;
  name: string;
  description: string;
  keyFields: string[];
};

export type DashboardData = {
  objectives: AppObjective[];
  customer: {
    name: string;
    unit: string;
    nextRevision: string;
    memberSince: string;
  };
  kpis: KPI[];
  appModules: AppModule[];
  domainEntities: DomainEntity[];
  shortcuts: Shortcut[];
  featureHighlights: FeatureHighlight[];
  vehicles: Vehicle[];
  activeServices: ActiveService[];
  promotions: Promotion[];
  catalog: CatalogItem[];
  history: ServiceHistoryItem[];
  notifications: AppNotification[];
  reminderCadences: ReminderCadence[];
  adminWorkspace: AdminWorkspaceItem[];
  adminTasks: AdminTask[];
};
