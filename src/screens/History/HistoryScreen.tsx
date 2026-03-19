import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { useDashboardData } from '../../hooks';
import { ServiceHistoryItem, Vehicle } from '../../types';
import { colors } from '../../utils/colors';

const formatVehicleLabel = (vehicle: Vehicle) => `${vehicle.brand} ${vehicle.model} • ${vehicle.plate}`;

const getLatestServiceDate = (items: ServiceHistoryItem[]) => items[items.length - 1]?.date ?? 'Sem registros';

export function HistoryScreen() {
  const { data, loading, error, retry } = useDashboardData();

  if (loading && !data) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderTitle}>Carregando histórico de serviços...</Text>
        <Text style={styles.loaderText}>Buscando registros por veículo.</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderTitle}>Não foi possível carregar o histórico.</Text>
        <Text style={styles.loaderText}>Tente novamente para atualizar os registros da oficina.</Text>
        <Text onPress={retry} style={styles.retryLink}>Tentar novamente</Text>
      </View>
    );
  }

  const primaryVehicle = data.vehicles[0] ?? null;
  const historyByVehicle = data.vehicles.map((vehicle) => ({
    vehicle,
    items: data.history.filter((item) => item.vehicleId === vehicle.id),
  }));

  return (
    <SectionCard
      title="Histórico de serviços realizados"
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
    margin: 16,
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loaderTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  loaderText: {
    color: colors.textMuted,
    textAlign: 'center',
  },
  retryLink: {
    color: colors.primary,
    fontWeight: '700',
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
    gap: 12,
  },
  vehicleHeaderCopy: {
    flex: 1,
    gap: 4,
  },
  vehicleTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  vehicleMeta: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  vehicleBadge: {
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  vehicleBadgeText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  historyRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  historyDateBadge: {
    minWidth: 80,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  historyDateText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  historyContent: {
    flex: 1,
    gap: 4,
  },
  historyTitle: {
    color: colors.text,
    fontWeight: '700',
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
    padding: 16,
    gap: 8,
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
