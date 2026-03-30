export const appRoutes = [
  'Login',
  'Register',
  'Home',
  'EASBuild',
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
  EASBuild: undefined;
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
  EASBuild: 'EAS Build',
  Vehicles: 'Meus Veículos',
  ServiceStatus: 'Acompanhar Serviço',
  Catalog: 'Loja / Catálogo',
  QuoteRequest: 'Solicitar Orçamento',
  History: 'Histórico',
  Notifications: 'Notificações',
  Profile: 'Perfil',
};
