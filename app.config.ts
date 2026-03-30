import { ConfigContext, ExpoConfig } from 'expo/config';

type AppEnvironment = 'development' | 'staging' | 'production';

const resolveEnvironment = (): AppEnvironment => {
  const rawEnvironment =
    (process.env.APP_ENV ?? process.env.EXPO_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? 'development').toLowerCase();

  if (rawEnvironment === 'production' || rawEnvironment === 'staging') {
    return rawEnvironment;
  }

  return 'development';
};

const resolveAppName = (environment: AppEnvironment, defaultName: string): string => {
  if (environment === 'production') {
    return defaultName;
  }

  const suffix = environment === 'staging' ? 'STG' : 'DEV';
  return `${defaultName} (${suffix})`;
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const environment = resolveEnvironment();
  const appName = resolveAppName(environment, config.name ?? 'Impacto Prime App');

  return {
    ...config,
    name: appName,
    extra: {
      ...config.extra,
      appEnv: environment,
      apiBaseUrl:
        process.env.EXPO_PUBLIC_API_BASE_URL ??
        (environment === 'production'
          ? 'https://api.impactoprime.com'
          : 'https://staging-api.impactoprime.com'),
    },
  };
};
