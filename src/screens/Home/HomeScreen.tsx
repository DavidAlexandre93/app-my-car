import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { fetchDashboardData } from '../../services/api/mockApi';
import { colors } from '../../utils/colors';
import {
  ActiveService,
  AdminTask,
  AdminWorkspaceItem,
  AppNotification,
  CatalogItem,
  DashboardData,
  Promotion,
  ReminderCadence,
  ServiceHistoryItem,
  ServiceStatusStep,
  Shortcut,
  Vehicle,
} from '../../types';

export function HomeScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const activeVehicle = useMemo(() => data?.vehicles[0], [data]);
  const recommendedServices = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        id: 'rec-1',
        title: 'Revisão preventiva recomendada',
        description: `${activeVehicle?.brand ?? 'Seu veículo'} ${activeVehicle?.model ?? ''} está próximo da revisão prevista em ${data.customer.nextRevision}.`,
        tag: 'Prioridade alta',
      },
      {
        id: 'rec-2',
        title: 'Check-up de freios e suspensão',
        description: 'Ideal para manter segurança e evitar desgaste irregular antes da próxima viagem.',
        tag: 'Segurança',
      },
      {
        id: 'rec-3',
        title: 'Alinhamento e balanceamento',
        description: 'Indicado para melhorar estabilidade, preservar pneus e reduzir consumo.',
        tag: 'Conforto',
      },
    ];
  }, [activeVehicle, data]);

  if (loading || !data || !activeVehicle) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text style={styles.loaderText}>Carregando tela inicial...</Text>
      </View>
    );
  }

  const activeService = data.activeServices[0];
  const lastHistory = data.history.find((item: ServiceHistoryItem) => item.vehicleId === activeVehicle.id);

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.greeting}>Olá, {data.customer.name.split(' ')[0]} 👋</Text>
        <Text style={styles.heroTitle}>Bem-vindo à sua central automotiva.</Text>
        <Text style={styles.heroText}>
          Acompanhe o veículo, veja promoções em destaque e acesse rapidamente os serviços mais usados.
        </Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Unidade</Text>
            <Text style={styles.summaryValue}>{data.customer.unit}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Próxima revisão</Text>
            <Text style={styles.summaryValue}>{data.customer.nextRevision}</Text>
          </View>
        </View>
      </View>

      <SectionCard title="Atalhos rápidos" subtitle="Acesse as principais funções da tela inicial.">
        <View style={styles.shortcutsGrid}>
          {data.shortcuts.map((shortcut: Shortcut) => (
            <Pressable key={shortcut.id} style={styles.shortcutCard}>
              <Text style={styles.shortcutLabel}>{shortcut.label}</Text>
              <Text style={styles.shortcutDescription}>{shortcut.description}</Text>
            </Pressable>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Promoções em destaque" subtitle="Ofertas e campanhas ativas para você aproveitar agora.">
        <View style={styles.stack}>
          {data.promotions.map((promotion: Promotion) => (
            <View key={promotion.id} style={styles.promotionCard}>
              <View style={styles.promotionHeader}>
                <Text style={styles.promotionTag}>{promotion.highlight}</Text>
                <Text style={styles.promotionCta}>{promotion.cta}</Text>
              </View>
              <Text style={styles.cardTitle}>{promotion.title}</Text>
              <Text style={styles.cardDescription}>{promotion.description}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Próximos serviços recomendados" subtitle="Sugestões com base no histórico e na revisão planejada.">
        <View style={styles.stack}>
          {recommendedServices.map((service) => (
            <View key={service.id} style={styles.recommendationCard}>
              <Text style={styles.recommendationTag}>{service.tag}</Text>
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={styles.cardDescription}>{service.description}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      {activeService ? (
        <SectionCard
          title="Status do veículo em atendimento"
          subtitle={`${activeVehicle.brand} ${activeVehicle.model} • ${activeVehicle.plate}`}
          rightLabel={activeService.eta}
        >
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.statusTitle}>{activeService.title}</Text>
              <Text style={styles.cardDescription}>{activeService.description}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{activeVehicle.statusLabel}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Orçamento atual</Text>
              <Text style={styles.infoValue}>{activeService.budget}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Responsável</Text>
              <Text style={styles.infoValue}>{activeService.technician}</Text>
            </View>
          </View>

          <View style={styles.timeline}>
            {activeService.steps.map((step: ServiceStatusStep) => (
              <View key={step.label} style={styles.timelineItem}>
                <View
                  style={[
                    styles.timelineDot,
                    step.completed ? styles.timelineDotDone : undefined,
                    step.current ? styles.timelineDotCurrent : undefined,
                  ]}
                />
                <Text style={[styles.timelineText, step.current ? styles.timelineTextCurrent : undefined]}>
                  {step.label}
                </Text>
              </View>
            ))}
          </View>
        </SectionCard>
      ) : null}

      <SectionCard title="Resumo do veículo" subtitle="Informações rápidas do veículo principal cadastrado.">
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleHeader}>
            <Text style={styles.cardTitle}>{activeVehicle.brand} {activeVehicle.model}</Text>
            <Text style={styles.plateBadge}>{activeVehicle.plate}</Text>
          </View>

          <View style={styles.vehicleMetaRow}>
            <View>
              <Text style={styles.infoLabel}>Ano</Text>
              <Text style={styles.infoValue}>{activeVehicle.year}</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>Quilometragem</Text>
              <Text style={styles.infoValue}>{activeVehicle.mileage.toLocaleString('pt-BR')} km</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>Último serviço</Text>
              <Text style={styles.infoValue}>{lastHistory?.date ?? 'Sem histórico'}</Text>
            </View>
          </View>

          <Text style={styles.cardDescription}>{activeVehicle.notes}</Text>
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
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  loaderText: {
    color: colors.textMuted,
    fontSize: 15,
  },
  hero: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  greeting: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  heroText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    marginTop: 8,
  },
  summaryCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: colors.background,
    borderRadius: 18,
    padding: 14,
    gap: 6,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  summaryValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  shortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shortcutCard: {
    width: '48%',
    backgroundColor: colors.background,
    borderRadius: 18,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shortcutLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  shortcutDescription: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  stack: {
    gap: 12,
  },
  promotionCard: {
    backgroundColor: colors.background,
    borderRadius: 18,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  promotionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  promotionTag: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  promotionCta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  recommendationCard: {
    backgroundColor: colors.background,
    borderRadius: 18,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recommendationTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    color: colors.background,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  cardDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  statusHeader: {
    gap: 12,
  },
  statusTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 214, 10, 0.14)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statusBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoBox: {
    flex: 1,
    minWidth: 140,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 14,
    gap: 6,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  infoValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  timeline: {
    gap: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.border,
  },
  timelineDotDone: {
    backgroundColor: colors.success,
  },
  timelineDotCurrent: {
    backgroundColor: colors.primary,
    transform: [{ scale: 1.15 }],
  },
  timelineText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  timelineTextCurrent: {
    color: colors.text,
    fontWeight: '700',
  },
  vehicleCard: {
    backgroundColor: colors.background,
    borderRadius: 18,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  plateBadge: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  vehicleMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },
});
