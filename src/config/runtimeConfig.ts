type AppEnvironment = 'development' | 'staging' | 'production';

const parseEnvironment = (value: string | undefined): AppEnvironment => {
  if (value === 'staging' || value === 'production') {
    return value;
  }

  return 'development';
};

export const runtimeConfig = {
  appEnv: parseEnvironment(process.env.EXPO_PUBLIC_APP_ENV),
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://staging-api.impactoprime.com',
};

export const isNonProductionEnvironment = runtimeConfig.appEnv !== 'production';
