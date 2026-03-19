import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { fetchDashboardData } from '../../services/api/mockApi';
import { DashboardData } from '../../types';
import { colors } from '../../utils/colors';

export function HomeScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text style={styles.loaderText}>Carregando visão geral do app...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <SectionCard title="Portal do cliente" subtitle="Resumo do MVP para cadastro, login e gestão automotiva">
        <Text style={styles.lead}>
          O aplicativo atende o fluxo de criação de conta, login do cliente, cadastro de múltiplos veículos e acompanhamento do relacionamento com a oficina.
        </Text>
      </SectionCard>

      <SectionCard title="Objetivos do cliente" subtitle="O que o usuário final consegue fazer no app">
        <View style={styles.stack}>
          {data.objectives.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardKicker}>{item.audience}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Campos principais" subtitle="Dados solicitados no fluxo do cliente">
        <View style={styles.pillRow}>
          {['Nome', 'Telefone', 'E-mail', 'Placa', 'Modelo', 'Ano', 'Quilometragem'].map((field) => (
            <View key={field} style={styles.pill}>
              <Text style={styles.pillText}>{field}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Veículos em destaque" subtitle="Exemplo de veículos vinculados ao cliente">
        <View style={styles.stack}>
          {data.vehicles.map((vehicle) => (
            <View key={vehicle.id} style={styles.card}>
              <Text style={styles.cardTitle}>{vehicle.brand} {vehicle.model}</Text>
              <Text style={styles.cardDescription}>Placa {vehicle.plate} • Ano {vehicle.year} • {vehicle.mileage.toLocaleString('pt-BR')} km</Text>
              <Text style={styles.status}>{vehicle.statusLabel}</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 32,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    gap: 12,
  },
  loaderText: {
    color: colors.textMuted,
  },
  lead: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  stack: {
    gap: 12,
  },
  card: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
  },
  cardKicker: {
    color: colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
  cardDescription: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pillText: {
    color: colors.text,
    fontWeight: '600',
  },
  status: {
    color: colors.success,
    fontWeight: '700',
  },
});
