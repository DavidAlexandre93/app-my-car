export const appRoutes = [
  'Splash',
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
