import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './src/screens/Login';
import { RegisterScreen } from './src/screens/Register';
import { HomeScreen } from './src/screens/Home';
import { EASBuildScreen } from './src/screens/EASBuild';
import { HistoryScreen } from './src/screens/History';
import { QuoteRequestScreen } from './src/screens/QuoteRequest';
import { VehiclesScreen } from './src/screens/Vehicles';
import { NotificationsScreen } from './src/screens/Notifications';
import { ProfileScreen } from './src/screens/Profile';
import { CatalogScreen } from './src/screens/Catalog';
import { ServiceStatusScreen } from './src/screens/ServiceStatus';
import { useAuthStore } from './src/store';
import { colors } from './src/utils/colors';
import { useDashboardData } from './src/hooks/useDashboardData';
import { AppStackParamList, AuthStackParamList, RootTabParamList, routeLabels } from './src/navigation';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppTabs = createBottomTabNavigator<RootTabParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function CatalogRouteScreen() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { data, loading, error, retry } = useDashboardData({ enabled: !!currentUser });

  if (!currentUser?.vehicles[0]) {
    return (
      <ScreenFallbackCard title="Loja / Catálogo" message="Cadastre um veículo para acessar o catálogo." />
    );
  }

  if (loading && !data) {
    return <ScreenFallbackCard title="Loja / Catálogo" message="Carregando catálogo..." />;
  }

  if (error || !data) {
    return (
      <RetryableFallbackCard
        title="Loja / Catálogo"
        message="Não foi possível carregar o catálogo agora."
        onRetry={retry}
      />
    );
  }

  return <CatalogScreen items={data.catalog} vehicle={currentUser.vehicles[0]} />;
}

function QuoteRequestRouteScreen() {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!currentUser) {
    return <ScreenFallbackCard title="Solicitar orçamento" message="Faça login para solicitar um orçamento." />;
  }

  return <QuoteRequestScreen customerName={currentUser.name} vehicles={currentUser.vehicles} />;
}

function AppTabsNavigator() {
  return (
    <AppTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <AppTabs.Screen name="Home" component={HomeScreen} options={{ title: routeLabels.Home }} />
      <AppTabs.Screen name="EASBuild" component={EASBuildScreen} options={{ title: routeLabels.EASBuild }} />
      <AppTabs.Screen name="Vehicles" component={VehiclesScreen} options={{ title: routeLabels.Vehicles }} />
      <AppTabs.Screen name="ServiceStatus" component={ServiceStatusScreen} options={{ title: routeLabels.ServiceStatus }} />
      <AppTabs.Screen name="Catalog" component={CatalogRouteScreen} options={{ title: routeLabels.Catalog }} />
      <AppTabs.Screen name="QuoteRequest" component={QuoteRequestRouteScreen} options={{ title: routeLabels.QuoteRequest }} />
      <AppTabs.Screen name="History" component={HistoryScreen} options={{ title: routeLabels.History }} />
      <AppTabs.Screen name="Notifications" component={NotificationsScreen} options={{ title: routeLabels.Notifications }} />
      <AppTabs.Screen name="Profile" component={ProfileScreen} options={{ title: routeLabels.Profile }} />
    </AppTabs.Navigator>
  );
}

function AppShell() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  return (
    <NavigationContainer>
      {currentUser ? (
        <AppStack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: colors.text,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <AppStack.Screen
            name="MainTabs"
            component={AppTabsNavigator}
            options={{
              headerTitle: 'Impacto Prime',
              headerRight: () => (
                <Pressable onPress={logout} style={styles.logoutButton}>
                  <Text style={styles.logoutButtonText}>Sair</Text>
                </Pressable>
              ),
            }}
          />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: colors.text,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <AuthStack.Screen name="Login" options={{ title: routeLabels.Login }}>
            {({ navigation }) => <LoginScreen onSwitch={() => navigation.navigate('Register')} />}
          </AuthStack.Screen>
          <AuthStack.Screen name="Register" options={{ title: routeLabels.Register }}>
            {({ navigation }) => <RegisterScreen onSwitch={() => navigation.navigate('Login')} />}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

function ScreenFallbackCard({ title, message }: { title: string; message: string }) {
  return (
    <View style={styles.centeredContainer}>
      <Text style={styles.fallbackTitle}>{title}</Text>
      <Text style={styles.fallbackText}>{message}</Text>
    </View>
  );
}

function RetryableFallbackCard({
  title,
  message,
  onRetry,
}: {
  title: string;
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={styles.centeredContainer}>
      <Text style={styles.fallbackTitle}>{title}</Text>
      <Text style={styles.fallbackText}>{message}</Text>
      <Pressable style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>Tentar novamente</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <AppShell />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoutButton: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logoutButtonText: {
    color: colors.primary,
    fontWeight: '700',
  },
  centeredContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  fallbackTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  fallbackText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  retryButtonText: {
    color: colors.background,
    fontWeight: '800',
  },
});
