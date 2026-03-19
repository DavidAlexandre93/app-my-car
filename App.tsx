import { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './src/screens/Login';
import { RegisterScreen } from './src/screens/Register';
import { SectionCard } from './src/components/SectionCard';
import { HomeScreen } from './src/screens/Home';
import { QuoteRequestScreen } from './src/screens/QuoteRequest';
import { useAuthStore } from './src/store';
import { colors } from './src/utils/colors';

type AuthMode = 'login' | 'register';

export default function App() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const summary = useMemo(
    () => [
      { label: 'Conta do cliente', value: currentUser ? 'Ativa' : 'Pendente' },
      { label: 'Veículos cadastrados', value: String(currentUser?.vehicles.length ?? 0) },
      { label: 'Contato principal', value: currentUser?.phone ?? 'Informe após o cadastro' },
    ],
    [currentUser],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>Impacto Prime • Portal do Cliente</Text>
          <Text style={styles.title}>Cadastro, login e gestão de veículos em um único fluxo.</Text>
          <Text style={styles.description}>
            O cliente pode criar conta, fazer login, manter seus dados atualizados e cadastrar um ou mais veículos com placa, modelo, ano e quilometragem.
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

        {!currentUser ? (
          <>
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

            <SectionCard title="Campos solicitados" subtitle="Dados essenciais do cliente e do veículo no MVP">
              <View style={styles.requirementGrid}>
                {['Nome', 'Telefone', 'E-mail', 'Placa do carro', 'Modelo', 'Ano', 'Quilometragem'].map((item) => (
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
              <View>
                <Text style={styles.accountTitle}>Olá, {currentUser.name.split(' ')[0]}</Text>
                <Text style={styles.accountDescription}>
                  Sua tela inicial agora reúne promoções, serviços recomendados, status do veículo e atalhos para as ações principais.
                </Text>
              </View>
              <Pressable style={styles.outlineButton} onPress={logout}>
                <Text style={styles.outlineButtonText}>Sair</Text>
              </Pressable>
            </View>
            <HomeScreen customerName={currentUser.name} />
            <QuoteRequestScreen customerName={currentUser.name} vehicles={currentUser.vehicles} />
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
    maxWidth: 260,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  outlineButtonText: {
    color: colors.primary,
    fontWeight: '800',
  },
});
