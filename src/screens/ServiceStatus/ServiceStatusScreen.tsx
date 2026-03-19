import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { ServiceProgressTracker } from '../../components/ServiceProgressTracker';
import { useDashboardData } from '../../hooks';
import { colors } from '../../utils/colors';

export function ServiceStatusScreen() {
  const { data, loading, error, retry } = useDashboardData();
  const activeService = data?.activeServices[0];

  if (loading && !data) {
    return (
      <SectionCard title="Acompanhar Serviço" subtitle="Status atual, timeline e observações da oficina.">
        <View style={styles.centeredState}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text style={styles.helperText}>Carregando acompanhamento do serviço...</Text>
        </View>
      </SectionCard>
    );
  }

  if (error || !data) {
    return (
      <SectionCard title="Acompanhar Serviço" subtitle="Status atual, timeline e observações da oficina.">
        <View style={styles.centeredState}>
          <Text style={styles.errorTitle}>Não foi possível carregar o status do serviço.</Text>
          <Text style={styles.helperText}>Tente novamente para atualizar a timeline da oficina.</Text>
          <Pressable style={styles.retryButton} onPress={retry}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </Pressable>
        </View>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Acompanhar Serviço"
      subtitle="Tela dedicada para mostrar status atual, timeline do processo e observações repassadas pela oficina."
      rightLabel={activeService?.serviceOrder ?? 'Sem OS'}
    >
      {activeService ? (
        <ServiceProgressTracker service={activeService} />
      ) : (
        <Text style={styles.helperText}>Nenhum serviço em andamento no momento.</Text>
      )}
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  centeredState: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  helperText: {
    color: colors.textMuted,
    textAlign: 'center',
  },
  errorTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
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
