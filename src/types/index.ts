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

export type VehiclePayload = {
  plate: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
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
  vehicle?: VehiclePayload;
};

export type ServiceStatusStep = {
  label: string;
  completed: boolean;
  current?: boolean;
  time: string;
  details: string;
};

export type ActiveService = {
  id: string;
  vehicleId: string;
  title: string;
  description: string;
  eta: string;
  budget: string;
  technician: string;
  serviceOrder: string;
  lastUpdated: string;
  customerMessage: string;
  nextStep: string;
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
  imageUrl: string;
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

export type NotificationDetails = {
  finalAmount?: string;
  businessHours?: string;
  technicianNotes?: string;
  vehicleId?: string;
  vehicleLabel?: string;
  nextRevisionDate?: string;
  protocol?: string;
};

export type AppNotification = {
  id: string;
  type: 'promo' | 'service' | 'pickup' | 'revision' | 'quote';
  title: string;
  message: string;
  date: string;
  read: boolean;
  details?: NotificationDetails;
};

export type QuoteCategory =
  | 'pneus'
  | 'peças'
  | 'revisão'
  | 'troca de óleo'
  | 'freio'
  | 'suspensão'
  | 'outro serviço';

export type QuoteRequest = {
  vehicleId: string;
  categories: QuoteCategory[];
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

export type RevisionReminder = {
  title: string;
  cadence: string;
  trigger: string;
  message: string;
  benefit: string;
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

export type FunctionalRequirement = {
  id: string;
  title: string;
  description: string;
  status: string;
  appArea: string;
};

export type UserFlow = {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  outcome: string;
};

export type AppScreenSuggestion = {
  id: string;
  title: string;
  subtitle: string;
  highlights: string[];
};

export type AdminCustomer = {
  id: string;
  name: string;
  contact: string;
  vehicles: number;
  segment: string;
};

export type AdminVehicleRecord = {
  id: string;
  plate: string;
  model: string;
  owner: string;
  serviceStatus: string;
};

export type AdminQuoteRequest = {
  id: string;
  customerName: string;
  vehicleLabel: string;
  request: string;
  status: string;
};

export type AdminServiceUpdate = {
  id: string;
  vehicleLabel: string;
  currentStage: string;
  nextAction: string;
};

export type AdminNotificationCampaign = {
  id: string;
  title: string;
  audience: string;
  channel: string;
  status: string;
};

export type AdminPanelData = {
  customers: AdminCustomer[];
  vehicles: AdminVehicleRecord[];
  quoteRequests: AdminQuoteRequest[];
  serviceUpdates: AdminServiceUpdate[];
  promotions: Promotion[];
  notificationCampaigns: AdminNotificationCampaign[];
  catalogItems: CatalogItem[];
  serviceHistory: ServiceHistoryItem[];
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
  requirements: FunctionalRequirement[];
  screenSuggestions: AppScreenSuggestion[];
  userFlows: UserFlow[];
  shortcuts: Shortcut[];
  featureHighlights: FeatureHighlight[];
  revisionReminder: RevisionReminder;
  vehicles: Vehicle[];
  activeServices: ActiveService[];
  promotions: Promotion[];
  catalog: CatalogItem[];
  history: ServiceHistoryItem[];
  notifications: AppNotification[];
  reminderCadences: ReminderCadence[];
  adminWorkspace: AdminWorkspaceItem[];
  adminTasks: AdminTask[];
  adminPanel: AdminPanelData;
};
