export const appRoutes = [
  'Login',
  'Register',
  'Home',
  'Vehicles',
  'ServiceStatus',
  'Catalog',
  'QuoteRequest',
  'History',
  'Notifications',
  'Profile',
] as const;

export type AppRoute = (typeof appRoutes)[number];

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Vehicles: undefined;
  ServiceStatus: undefined;
  Catalog: undefined;
  QuoteRequest: undefined;
  History: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  MainTabs: undefined;
};

export const routeLabels: Record<AppRoute, string> = {
  Login: 'Login',
  Register: 'Cadastro',
  Home: 'Home',
  Vehicles: 'Meus Veículos',
  ServiceStatus: 'Acompanhar Serviço',
  Catalog: 'Loja / Catálogo',
  QuoteRequest: 'Solicitar Orçamento',
  History: 'Histórico',
  Notifications: 'Notificações',
  Profile: 'Perfil',
};
