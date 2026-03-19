import { useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { LoginScreen } from './src/screens/Login';
import { RegisterScreen } from './src/screens/Register';
import { SectionCard } from './src/components/SectionCard';
import { HomeScreen } from './src/screens/Home';
import { HistoryScreen } from './src/screens/History';
import { QuoteRequestScreen } from './src/screens/QuoteRequest';
import { VehiclesScreen } from './src/screens/Vehicles';
import { NotificationsScreen } from './src/screens/Notifications/NotificationsScreen';
import { ProfileScreen } from './src/screens/Profile';
import { CatalogScreen } from './src/screens/Catalog';
import { ServiceProgressTracker } from './src/components/ServiceProgressTracker';
import { useAuthStore } from './src/store';
import { colors } from './src/utils/colors';
import { fetchDashboardData } from './src/services/api/mockApi';
import { DashboardData } from './src/types';
import { AppRoute } from './src/navigation';

type AuthMode = 'login' | 'register';

const postLoginRoutes: AppRoute[] = [
  'Home',
  'Vehicles',
  'ServiceStatus',
  'Catalog',
  'QuoteRequest',
  'History',
  'Notifications',
  'Profile',
];

const routeLabels: Record<AppRoute, string> = {
  Splash: 'Splash',
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

function SplashPreview() {
  return (
    <SectionCard
      title="1. Splash Screen"
      subtitle="Entrada do app com a identidade da Impacto Prime para reforçar marca e confiança desde o primeiro acesso."
      rightLabel="Impacto Prime"
    >
      <View style={styles.splashCard}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoImpacto}>IMPACTO</Text>
          <Text style={styles.logoPrime}>PRIME</Text>
        </View>
        <Text style={styles.splashTitle}>Seu carro em boas mãos, do orçamento à retirada.</Text>
        <Text style={styles.splashDescription}>
          Splash screen sugerida com logo central, mensagem curta de valor e transição para login/cadastro.
        </Text>
      </View>
    </SectionCard>
  );
}

function ServiceStatusPanel({ data }: { data: DashboardData | null }) {
  const activeService = data?.activeServices[0];

  if (!data) {
    return (
      <SectionCard title="5. Acompanhar Serviço" subtitle="Status atual, timeline e observações da oficina.">
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text style={styles.loaderText}>Carregando acompanhamento do serviço...</Text>
        </View>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="5. Acompanhar Serviço"
      subtitle="Tela dedicada para mostrar status atual, timeline do processo e observações repassadas pela oficina."
      rightLabel={activeService?.serviceOrder ?? 'Sem OS'}
    >
      {activeService ? (
        <ServiceProgressTracker service={activeService} />
      ) : (
        <Text style={styles.sectionText}>Nenhum serviço em andamento no momento.</Text>
      )}
    </SectionCard>
  );
}

function ProfilePreferencesCard() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [promotionsEnabled, setPromotionsEnabled] = useState(true);
  const [serviceAlertsEnabled, setServiceAlertsEnabled] = useState(true);
  const [revisionRemindersEnabled, setRevisionRemindersEnabled] = useState(true);

  return (
    <SectionCard
      title="Preferências de notificação"
      subtitle="Complementa a tela de perfil com controles rápidos para promoções, carro pronto e lembretes de revisão."
      rightLabel={`${currentUser?.vehicles.length ?? 0} veículos`}
    >
      <View style={styles.preferenceCard}>
        {[
          {
            label: 'Promoções e campanhas',
            description: 'Receber ofertas de pneus, peças e serviços em destaque.',
            value: promotionsEnabled,
            onChange: setPromotionsEnabled,
          },
          {
            label: 'Atualizações do carro',
            description: 'Avisos sobre status do atendimento e veículo pronto.',
            value: serviceAlertsEnabled,
            onChange: setServiceAlertsEnabled,
          },
          {
            label: 'Lembretes de revisão',
            description: 'Alertas preventivos para troca de óleo, freios e check-up.',
            value: revisionRemindersEnabled,
            onChange: setRevisionRemindersEnabled,
          },
        ].map((item) => (
          <View key={item.label} style={styles.preferenceRow}>
            <View style={styles.preferenceCopy}>
              <Text style={styles.preferenceTitle}>{item.label}</Text>
              <Text style={styles.preferenceDescription}>{item.description}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onChange}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>
        ))}
      </View>
    </SectionCard>
  );
}

export default function App() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [activeRoute, setActiveRoute] = useState<AppRoute>('Home');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setActiveRoute('Home');
      return;
    }

    setLoadingDashboard(true);
    fetchDashboardData()
      .then(setDashboardData)
      .finally(() => setLoadingDashboard(false));
  }, [currentUser]);

  const summary = useMemo(
    () => [
      { label: 'Conta do cliente', value: currentUser ? 'Ativa' : 'Pendente' },
      { label: 'Veículos cadastrados', value: String(currentUser?.vehicles.length ?? 0) },
      { label: 'Contato principal', value: currentUser?.phone ?? 'Informe após o cadastro' },
    ],
    [currentUser],
  );

  const suggestedScreens = useMemo(
    () => [
      '1. Splash Screen',
      '2. Login / Cadastro',
      '3. Home',
      '4. Meus Veículos',
      '5. Acompanhar Serviço',
      '6. Loja / Catálogo',
      '7. Solicitar Orçamento',
      '8. Histórico',
      '9. Notificações',
      '10. Perfil',
    ],
    [],
  );

  const renderAuthenticatedScreen = () => {
    if (!currentUser) {
      return null;
    }

    switch (activeRoute) {
      case 'Home':
        return <HomeScreen customerName={currentUser.name} />;
      case 'Vehicles':
        return <VehiclesScreen />;
      case 'ServiceStatus':
        return <ServiceStatusPanel data={dashboardData} />;
      case 'Catalog':
        return currentUser.vehicles[0] && dashboardData ? (
          <CatalogScreen items={dashboardData.catalog} vehicle={currentUser.vehicles[0]} />
        ) : (
          <SectionCard title="6. Loja / Catálogo" subtitle="Pneus, peças e filtros por categoria.">
            <Text style={styles.sectionText}>
              {loadingDashboard ? 'Carregando catálogo...' : 'Cadastre um veículo para acessar o catálogo.'}
            </Text>
          </SectionCard>
        );
      case 'QuoteRequest':
        return <QuoteRequestScreen customerName={currentUser.name} vehicles={currentUser.vehicles} />;
      case 'History':
        return <HistoryScreen />;
      case 'Notifications':
        return <NotificationsScreen />;
      case 'Profile':
        return (
          <View style={styles.stackContainer}>
            <ProfileScreen />
            <ProfilePreferencesCard />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>Impacto Prime • Portal do Cliente</Text>
          <Text style={styles.title}>Sugestão completa de telas para o app do cliente.</Text>
          <Text style={styles.description}>
            A demo reúne as 10 telas sugeridas: splash, autenticação, home com promoções, veículos, acompanhamento de serviço, catálogo, orçamento, histórico, notificações e perfil.
          </Text>
          <View style={styles.badgeRow}>
            {summary.map((item) => (
              <View key={item.label} style={styles.badge}>
                <Text style={styles.badgeLabel}>{item.label}</Text>
                <Text style={styles.badgeValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <SplashPreview />

        {!currentUser ? (
          <>
            <SectionCard
              title="2. Login / Cadastro"
              subtitle="Fluxo inicial com e-mail ou telefone, senha e orientação para recuperação de acesso."
              rightLabel={authMode === 'login' ? 'Login' : 'Cadastro'}
            >
              <View style={styles.authSupportCard}>
                <Text style={styles.authSupportTitle}>Acesso do cliente</Text>
                <Text style={styles.authSupportText}>
                  O app pode permitir entrada por e-mail ou telefone, senha e recuperação de acesso por atendimento da oficina ou link seguro.
                </Text>
              </View>

              <View style={styles.tabRow}>
                <Pressable
                  style={[styles.tab, authMode === 'login' && styles.tabActive]}
                  onPress={() => setAuthMode('login')}
                >
                  <Text style={[styles.tabText, authMode === 'login' && styles.tabTextActive]}>Login</Text>
                </Pressable>
                <Pressable
                  style={[styles.tab, authMode === 'register' && styles.tabActive]}
                  onPress={() => setAuthMode('register')}
                >
                  <Text style={[styles.tabText, authMode === 'register' && styles.tabTextActive]}>Cadastro</Text>
                </Pressable>
              </View>

              {authMode === 'login' ? (
                <LoginScreen onSwitch={() => setAuthMode('register')} />
              ) : (
                <RegisterScreen onSwitch={() => setAuthMode('login')} />
              )}
            </SectionCard>

            <SectionCard title="Mapa das telas sugeridas" subtitle="Estrutura do app do cliente contemplada nesta demo.">
              <View style={styles.requirementGrid}>
                {suggestedScreens.map((item) => (
                  <View key={item} style={styles.requirementPill}>
                    <Text style={styles.requirementText}>{item}</Text>
                  </View>
                ))}
              </View>
            </SectionCard>
          </>
        ) : (
          <>
            <View style={styles.accountHeader}>
              <View style={styles.accountHeaderCopy}>
                <Text style={styles.accountTitle}>Olá, {currentUser.name.split(' ')[0]}</Text>
                <Text style={styles.accountDescription}>
                  Navegue entre as telas sugeridas do app do cliente para validar a experiência completa do produto.
                </Text>
              </View>
              <Pressable style={styles.outlineButton} onPress={logout}>
                <Text style={styles.outlineButtonText}>Sair</Text>
              </Pressable>
            </View>

            <SectionCard
              title="Navegação principal"
              subtitle="Atalhos para alternar entre as telas do app após o login."
              rightLabel={routeLabels[activeRoute]}
            >
              <View style={styles.navGrid}>
                {postLoginRoutes.map((route) => {
                  const active = route === activeRoute;
                  return (
                    <Pressable
                      key={route}
                      onPress={() => setActiveRoute(route)}
                      style={[styles.navChip, active && styles.navChipActive]}
                    >
                      <Text style={[styles.navChipText, active && styles.navChipTextActive]}>{routeLabels[route]}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </SectionCard>

            {renderAuthenticatedScreen()}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    gap: 18,
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  kicker: {
    color: colors.primary,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  badgeRow: {
    gap: 12,
  },
  badge: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
    gap: 4,
  },
  badgeLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  badgeValue: {
    color: colors.text,
    fontWeight: '700',
  },
  splashCard: {
    backgroundColor: colors.background,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    gap: 14,
    alignItems: 'center',
  },
  logoBadge: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 28,
    alignItems: 'center',
    minWidth: 220,
  },
  logoImpacto: {
    color: colors.background,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
  },
  logoPrime: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 5,
  },
  splashTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  splashDescription: {
    color: colors.textMuted,
    lineHeight: 22,
    textAlign: 'center',
  },
  authSupportCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 6,
  },
  authSupportTitle: {
    color: colors.text,
    fontWeight: '800',
  },
  authSupportText: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 6,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textMuted,
    fontWeight: '700',
  },
  tabTextActive: {
    color: colors.background,
  },
  requirementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  requirementPill: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  requirementText: {
    color: colors.text,
    fontWeight: '600',
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  accountHeaderCopy: {
    flex: 1,
  },
  accountTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  accountDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: colors.surface,
  },
  outlineButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  navChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
  },
  navChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  navChipText: {
    color: colors.text,
    fontWeight: '700',
  },
  navChipTextActive: {
    color: colors.background,
  },
  sectionText: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  loaderContainer: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  loaderText: {
    color: colors.textMuted,
  },
  stackContainer: {
    gap: 16,
  },
  preferenceCard: {
    gap: 12,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
  },
  preferenceCopy: {
    flex: 1,
    gap: 4,
  },
  preferenceTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  preferenceDescription: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
});
