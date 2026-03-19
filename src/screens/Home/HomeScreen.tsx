import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { fetchDashboardData, submitQuoteRequest } from '../../services/api/mockApi';
import { colors } from '../../utils/colors';
import {
  ActiveService,
  AdminTask,
  AppNotification,
  CatalogItem,
  DashboardData,
  FeatureHighlight,
  KPI,
  Promotion,
  ServiceHistoryItem,
  ServiceStatusStep,
  Shortcut,
  Vehicle,
} from '../../types';

const parseHistoryDate = (value: string) => {
  const [day, month, year] = value.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const formatVehicleLabel = (vehicle: Vehicle) => `${vehicle.brand} ${vehicle.model} • ${vehicle.plate}`;

export function HomeScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [quoteDescription, setQuoteDescription] = useState('Quero orçamento para 4 pneus aro 18, alinhamento e revisão preventiva.');
  const [quoteFeedback, setQuoteFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const activeVehicle = useMemo(() => data?.vehicles[0], [data]);

  const historyByVehicle = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.vehicles
      .map((vehicle) => {
        const entries = data.history
          .filter((entry) => entry.vehicleId === vehicle.id)
          .sort((a, b) => parseHistoryDate(a.date).getTime() - parseHistoryDate(b.date).getTime());

        return {
          vehicle,
          entries,
          totalSpent: entries.reduce((sum, entry) => sum + Number(entry.amount.replace(/[^\d,]/g, '').replace('.', '').replace(',', '.')), 0),
        };
      })
      .filter((group) => group.entries.length > 0);
  }, [data]);

  const handleSubmitQuote = async () => {
    if (!activeVehicle) {
      return;
    }

    setSubmitting(true);
    const response = await submitQuoteRequest({
      vehicleId: activeVehicle.id,
      type: 'Pneus, peças e serviços',
      description: quoteDescription,
    });

    setQuoteFeedback(`${response.message} Protocolo ${response.protocol}.`);
    setSubmitting(false);
  };

  if (loading || !data || !activeVehicle) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text style={styles.loaderText}>Conectando à central Impacto Prime...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.brand}>Impacto Prime AutoCare</Text>
        <Text style={styles.heroTitle}>Demo do app da unidade Taboão da Serra.</Text>
        <Text style={styles.heroText}>
          Experiência digital para acompanhar serviços, receber promoções, solicitar orçamentos e manter o histórico do veículo sempre acessível.
        </Text>
        <View style={styles.heroBadgeRow}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeLabel}>Cliente</Text>
            <Text style={styles.heroBadgeValue}>{data.customer.name}</Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeLabel}>Próxima revisão</Text>
            <Text style={styles.heroBadgeValue}>{data.customer.nextRevision}</Text>
          </View>
        </View>
        <Text style={styles.heroFootnote}>{data.customer.unit} • {data.customer.memberSince}</Text>
      </View>

      <SectionCard title="MVP do demo" subtitle="Escopo essencial para apresentar valor rapidamente">
        <View style={styles.kpiGrid}>
          {data.kpis.map((item: KPI) => (
            <View key={item.id} style={styles.kpiCard}>
              <Text style={styles.kpiValue}>{item.value}</Text>
              <Text style={styles.kpiLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Jornada do cliente" subtitle="Cadastro, login, veículos e serviços">
        <View style={styles.stack}>
          <View style={styles.authCard}>
            <Text style={styles.listItemTitle}>Login / Cadastro</Text>
            <Text style={styles.listItemDescription}>
              Entrada com e-mail ou telefone, recuperação de acesso e onboarding para cadastrar um ou mais veículos.
            </Text>
          </View>
          <View style={styles.actionGrid}>
            {data.shortcuts.map((shortcut: Shortcut) => (
              <View key={shortcut.id} style={styles.actionPill}>
                <Text style={styles.actionText}>{shortcut.label}</Text>
                <Text style={styles.actionDescription}>{shortcut.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </SectionCard>

      <SectionCard title="Stack solicitado para este projeto" subtitle="Base tecnológica escolhida para mobile, backend, autenticação e painel web">
        <View style={styles.stack}>
          <View style={styles.techGrid}>
            <View style={styles.techChip}><Text style={styles.techChipLabel}>React Native</Text><Text style={styles.techChipValue}>Expo + TypeScript</Text></View>
            <View style={styles.techChip}><Text style={styles.techChipLabel}>Navegação</Text><Text style={styles.techChipValue}>React Navigation</Text></View>
            <View style={styles.techChip}><Text style={styles.techChipLabel}>HTTP</Text><Text style={styles.techChipValue}>Axios</Text></View>
            <View style={styles.techChip}><Text style={styles.techChipLabel}>Estado</Text><Text style={styles.techChipValue}>Zustand</Text></View>
            <View style={styles.techChip}><Text style={styles.techChipLabel}>Backend demo</Text><Text style={styles.techChipValue}>Firebase</Text></View>
            <View style={styles.techChip}><Text style={styles.techChipLabel}>Banco</Text><Text style={styles.techChipValue}>Firestore</Text></View>
            <View style={styles.techChip}><Text style={styles.techChipLabel}>Push</Text><Text style={styles.techChipValue}>FCM</Text></View>
            <View style={styles.techChip}><Text style={styles.techChipLabel}>Auth</Text><Text style={styles.techChipValue}>Firebase Auth / JWT</Text></View>
            <View style={styles.techChip}><Text style={styles.techChipLabel}>Painel admin</Text><Text style={styles.techChipValue}>React.js + Material UI</Text></View>
          </View>
          <Text style={styles.architectureNote}>
            Para acelerar a demo, a recomendação é manter Firebase no MVP e preparar uma evolução futura para Node.js + Express/NestJS com PostgreSQL quando houver necessidade de regras mais avançadas, integrações e relatórios.
          </Text>
        </View>
      </SectionCard>

      <SectionCard title="Requisitos em destaque" subtitle="Recorte funcional pedido para o projeto">
        <View style={styles.stack}>
          {data.featureHighlights.map((feature: FeatureHighlight) => (
            <View key={feature.id} style={styles.featureItem}>
              <Text style={styles.listItemTitle}>{feature.title}</Text>
              <Text style={styles.listItemDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Meus veículos" subtitle="Cliente pode cadastrar múltiplos veículos" rightLabel={`${data.vehicles.length} ativos`}>
        <View style={styles.stack}>
          {data.vehicles.map((vehicle: Vehicle) => (
            <View key={vehicle.id} style={styles.vehicleCard}>
              <View style={styles.vehicleHeader}>
                <Text style={styles.listItemTitle}>{vehicle.brand} {vehicle.model}</Text>
                <Text style={styles.highlight}>{vehicle.plate}</Text>
              </View>
              <View style={styles.vehicleMetaRow}>
                <View>
                  <Text style={styles.metaLabel}>Ano</Text>
                  <Text style={styles.metaValue}>{vehicle.year}</Text>
                </View>
                <View>
                  <Text style={styles.metaLabel}>KM</Text>
                  <Text style={styles.metaValue}>{vehicle.mileage.toLocaleString('pt-BR')}</Text>
                </View>
                <View>
                  <Text style={styles.metaLabel}>Status</Text>
                  <Text style={styles.metaValue}>{vehicle.statusLabel}</Text>
                </View>
              </View>
              <Text style={styles.listItemDescription}>{vehicle.notes}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      {data.activeServices.map((service: ActiveService) => (
        <SectionCard
          key={service.id}
          title={service.title}
          subtitle={service.description}
          rightLabel={service.eta}
        >
          <View style={styles.serviceSummary}>
            <Text style={styles.serviceBudget}>Orçamento atual: {service.budget}</Text>
            <Text style={styles.metaLabel}>{service.technician}</Text>
            <Text style={styles.metaLabel}>Status em tempo real</Text>
          </View>
          <View style={styles.timeline}>
            {service.steps.map((step: ServiceStatusStep) => (
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
      ))}

      <SectionCard title="Promoções e campanhas" subtitle="Push notifications e ofertas da oficina">
        <View style={styles.stack}>
          {data.promotions.map((promotion: Promotion) => (
            <View key={promotion.id} style={styles.listItem}>
              <View style={styles.listItemText}>
                <Text style={styles.listItemTitle}>{promotion.title}</Text>
                <Text style={styles.listItemDescription}>{promotion.description}</Text>
                <Text style={styles.notificationDate}>{promotion.cta}</Text>
              </View>
              <Text style={styles.highlight}>{promotion.highlight}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Loja / catálogo" subtitle="Pneus, peças e serviços com botão de orçamento">
        <View style={styles.stack}>
          {data.catalog.map((item: CatalogItem) => (
            <View key={item.id} style={styles.catalogCard}>
              <Text style={styles.catalogCategory}>{item.category}</Text>
              <Text style={styles.listItemTitle}>{item.name}</Text>
              <Text style={styles.listItemDescription}>{item.description}</Text>
              <View style={styles.catalogFooter}>
                <Text style={styles.catalogPrice}>{item.price}</Text>
                <Text style={styles.metaLabel}>{item.stock}</Text>
              </View>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Solicitar orçamento" subtitle="Fluxo: cliente solicita → admin analisa → cliente recebe retorno">
        <TextInput
          value={quoteDescription}
          onChangeText={setQuoteDescription}
          multiline
          placeholder="Descreva o item ou serviço desejado"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
        <Pressable style={styles.primaryButton} onPress={handleSubmitQuote} disabled={submitting}>
          <Text style={styles.primaryButtonText}>
            {submitting ? 'Enviando...' : 'Enviar solicitação'}
          </Text>
        </Pressable>
        {quoteFeedback ? <Text style={styles.feedback}>{quoteFeedback}</Text> : null}
      </SectionCard>

      <SectionCard
        title="Histórico de serviços realizados"
        subtitle="O cliente visualiza tudo que já foi feito em cada carro e mantém o controle da manutenção preventiva."
      >
        <Text style={styles.historyIntro}>
          Linha do tempo consolidada com data, descrição e valor dos serviços já concluídos na oficina.
        </Text>
        <View style={styles.stack}>
          {historyByVehicle.map(({ vehicle, entries, totalSpent }) => (
            <View key={vehicle.id} style={styles.historyVehicleCard}>
              <View style={styles.historyVehicleHeader}>
                <View style={styles.listItemText}>
                  <Text style={styles.listItemTitle}>{formatVehicleLabel(vehicle)}</Text>
                  <Text style={styles.listItemDescription}>
                    {entries.length} serviços registrados para consulta rápida do cliente.
                  </Text>
                </View>
                <View style={styles.historySummaryBadge}>
                  <Text style={styles.historySummaryLabel}>Total investido</Text>
                  <Text style={styles.historySummaryValue}>
                    {totalSpent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </Text>
                </View>
              </View>

              <View style={styles.historyTimeline}>
                {entries.map((entry, index) => (
                  <View key={entry.id} style={styles.historyTimelineItem}>
                    <View style={styles.historyTimelineRail}>
                      <View style={styles.historyTimelineDot} />
                      {index < entries.length - 1 ? <View style={styles.historyTimelineLine} /> : null}
                    </View>
                    <View style={styles.historyContentCard}>
                      <View style={styles.historyContentHeader}>
                        <Text style={styles.listItemTitle}>{entry.title}</Text>
                        <Text style={styles.historyDate}>{entry.date}</Text>
                      </View>
                      <Text style={styles.listItemDescription}>{entry.details}</Text>
                      <Text style={styles.historyAmount}>{entry.amount}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Central de notificações" subtitle="Promoções, carro pronto e lembrete trimestral">
        <View style={styles.stack}>
          {data.notifications.map((notification: AppNotification) => (
            <View key={notification.id} style={styles.notificationItem}>
              <View style={[styles.notificationBullet, !notification.read ? styles.notificationUnread : undefined]} />
              <View style={styles.listItemText}>
                <Text style={styles.listItemTitle}>{notification.title}</Text>
                <Text style={styles.listItemDescription}>{notification.message}</Text>
                <Text style={styles.notificationDate}>{notification.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Painel administrativo" subtitle="Área web ou interna conectada ao mesmo backend">
        <View style={styles.stack}>
          {data.adminTasks.map((task: AdminTask) => (
            <View key={task.id} style={styles.adminTaskCard}>
              <View style={styles.vehicleHeader}>
                <Text style={styles.listItemTitle}>{task.title}</Text>
                <Text style={styles.adminStatus}>{task.status}</Text>
              </View>
              <Text style={styles.listItemDescription}>{task.description}</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 18,
  },
  loaderContainer: {
    minHeight: 400,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loaderText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  hero: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.primaryStrong,
    gap: 14,
  },
  brand: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  heroText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  heroBadge: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    padding: 14,
    gap: 4,
  },
  heroBadgeLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  heroBadgeValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  heroFootnote: {
    color: colors.accent,
    fontSize: 12,
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  kpiCard: {
    flexGrow: 1,
    minWidth: 90,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    padding: 14,
    gap: 6,
  },
  kpiValue: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 18,
  },
  kpiLabel: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  stack: {
    gap: 12,
  },
  authCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 16,
    gap: 6,
  },
  actionGrid: {
    gap: 12,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  techChip: {
    minWidth: 140,
    flexGrow: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    padding: 14,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  techChipLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  techChipValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  architectureNote: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  actionPill: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    padding: 16,
    gap: 4,
  },
  actionText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  actionDescription: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  featureItem: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: 12,
    gap: 4,
  },
  vehicleCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  vehicleMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  metaValue: {
    color: colors.text,
    fontWeight: '600',
    marginTop: 4,
  },
  serviceSummary: {
    gap: 4,
  },
  serviceBudget: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  timeline: {
    gap: 10,
    marginTop: 4,
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
    borderWidth: 2,
    borderColor: colors.border,
  },
  timelineDotDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  timelineDotCurrent: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  timelineText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  timelineTextCurrent: {
    color: colors.text,
    fontWeight: '700',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 16,
  },
  listItemText: {
    flex: 1,
    gap: 4,
  },
  listItemTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  listItemDescription: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  highlight: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  catalogCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 16,
    gap: 6,
  },
  catalogCategory: {
    color: colors.info,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  catalogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    gap: 12,
  },
  catalogPrice: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  input: {
    minHeight: 110,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    color: colors.text,
    padding: 16,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#171717',
    fontWeight: '800',
    fontSize: 15,
  },
  feedback: {
    color: colors.success,
    fontSize: 13,
    lineHeight: 18,
  },
  historyIntro: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  historyVehicleCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 22,
    padding: 16,
    gap: 16,
  },
  historyVehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
  },
  historySummaryBadge: {
    minWidth: 120,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
  },
  historySummaryLabel: {
    color: colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
  },
  historySummaryValue: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '800',
  },
  historyTimeline: {
    gap: 2,
  },
  historyTimelineItem: {
    flexDirection: 'row',
    gap: 12,
  },
  historyTimelineRail: {
    alignItems: 'center',
    width: 18,
  },
  historyTimelineDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.primary,
    marginTop: 6,
  },
  historyTimelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginTop: 6,
    marginBottom: -6,
  },
  historyContentCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    gap: 8,
    marginBottom: 10,
  },
  historyContentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  historyDate: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  historyAmount: {
    color: colors.accent,
    fontWeight: '700',
  },
  notificationItem: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 16,
  },
  notificationBullet: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginTop: 4,
    backgroundColor: colors.border,
  },
  notificationUnread: {
    backgroundColor: colors.primary,
  },
  notificationDate: {
    color: colors.accent,
    fontSize: 12,
    marginTop: 4,
  },
  adminTaskCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 16,
    gap: 6,
  },
  adminStatus: {
    color: colors.warning,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
