import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { fetchDashboardData } from '../../services/api/mockApi';
import { DashboardData, ServiceHistoryItem, Vehicle } from '../../types';
import { colors } from '../../utils/colors';

const formatVehicleLabel = (vehicle: Vehicle) => `${vehicle.brand} ${vehicle.model} • ${vehicle.plate}`;

const getLatestServiceDate = (items: ServiceHistoryItem[]) => items[items.length - 1]?.date ?? 'Sem registros';

export function HistoryScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const primaryVehicle = data?.vehicles[0] ?? null;

  const historyByVehicle = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.vehicles.map((vehicle) => ({
      vehicle,
      items: data.history.filter((item) => item.vehicleId === vehicle.id),
    }));
  }, [data]);

  if (loading || !data) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text style={styles.loaderText}>Carregando histórico de serviços...</Text>
      </View>
    );
  }

  return (
    <SectionCard
      title="8. Histórico de serviços realizados"
      subtitle="O cliente pode ver tudo o que já foi feito em seu carro para manter controle completo da manutenção do veículo."
      rightLabel={`${data.history.length} serviços`}
    >
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Controle de manutenção</Text>
        <Text style={styles.heroTitle}>Histórico completo para consulta rápida e transparente.</Text>
        <Text style={styles.heroDescription}>
          Cada serviço fica registrado com data, descrição e valor para ajudar o cliente a acompanhar revisões, trocas e cuidados preventivos ao longo do tempo.
        </Text>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Veículo em destaque</Text>
            <Text style={styles.summaryValue}>{primaryVehicle ? formatVehicleLabel(primaryVehicle) : 'Sem veículo vinculado'}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Último serviço</Text>
            <Text style={styles.summaryValue}>{getLatestServiceDate(data.history)}</Text>
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timelineRow}>
        {data.history.map((item) => (
          <View key={item.id} style={styles.timelineCard}>
            <Text style={styles.timelineDate}>{item.date}</Text>
            <Text style={styles.timelineTitle}>{item.title}</Text>
            <Text style={styles.timelineVehicle}>
              {formatVehicleLabel(data.vehicles.find((vehicle) => vehicle.id === item.vehicleId) ?? data.vehicles[0])}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.vehicleSection}>
        {historyByVehicle.map(({ vehicle, items }) => (
          <View key={vehicle.id} style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <View style={styles.vehicleHeaderCopy}>
                <Text style={styles.vehicleTitle}>{vehicle.brand} {vehicle.model}</Text>
                <Text style={styles.vehicleMeta}>{vehicle.plate} • {vehicle.year} • {vehicle.mileage.toLocaleString('pt-BR')} km</Text>
              </View>
              <View style={styles.vehicleBadge}>
                <Text style={styles.vehicleBadgeText}>{items.length} registro{items.length === 1 ? '' : 's'}</Text>
              </View>
            </View>

            {items.length > 0 ? (
              items.map((item) => (
                <View key={item.id} style={styles.historyRow}>
                  <View style={styles.historyDateBadge}>
                    <Text style={styles.historyDateText}>{item.date}</Text>
                  </View>
                  <View style={styles.historyContent}>
                    <Text style={styles.historyTitle}>{item.title}</Text>
                    <Text style={styles.historyDetails}>{item.details}</Text>
                  </View>
                  <Text style={styles.historyAmount}>{item.amount}</Text>
                </View>
              ))
            ) : (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>Nenhum serviço registrado ainda</Text>
                <Text style={styles.emptyDescription}>
                  Quando a oficina concluir um atendimento, ele aparecerá aqui para facilitar a consulta futura do cliente.
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loaderText: {
    color: colors.textMuted,
  },
  heroCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 10,
  },
  heroEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
  },
  heroDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  summaryGrid: {
    gap: 10,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 4,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  timelineRow: {
    gap: 12,
    paddingRight: 12,
  },
  timelineCard: {
    width: 220,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
  },
  timelineDate: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  timelineTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 16,
  },
  timelineVehicle: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  vehicleSection: {
    gap: 14,
  },
  vehicleCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  vehicleHeaderCopy: {
    flex: 1,
    gap: 4,
  },
  vehicleTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 17,
  },
  vehicleMeta: {
    color: colors.textMuted,
  },
  vehicleBadge: {
    backgroundColor: '#2B2412',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  vehicleBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  historyDateBadge: {
    backgroundColor: '#2B2412',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 92,
  },
  historyDateText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  historyContent: {
    flex: 1,
    gap: 4,
  },
  historyTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 15,
  },
  historyDetails: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  historyAmount: {
    color: colors.accent,
    fontWeight: '800',
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 6,
  },
  emptyTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  emptyDescription: {
    color: colors.textMuted,
    lineHeight: 20,
  },
});
