import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { CatalogScreen } from '../Catalog';
import { ServiceProgressTracker } from '../../components/ServiceProgressTracker';
import { fetchDashboardData, submitQuoteRequest } from '../../services/api/mockApi';
import { fetchDashboardData } from '../../services/api/mockApi';
import { colors } from '../../utils/colors';
import { AppModule, AppScreenSuggestion, DashboardData, DomainEntity, KPI, Promotion, ServiceHistoryItem, ServiceStatusStep } from '../../types';
import {
  ActiveService,
  AdminTask,
  AppModule,
  AppNotification,
  DashboardData,
  DomainEntity,
  FeatureHighlight,
  FunctionalRequirement,
  AppScreenSuggestion,
  KPI,
  AdminWorkspaceItem,
  AppNotification,
  CatalogItem,
  DashboardData,
  Promotion,
  QuoteCategory,
  ReminderCadence,
  ServiceHistoryItem,
  Shortcut,
  UserFlow,
  Vehicle,
} from '../../types';

const quoteOptions: QuoteCategory[] = [
  'pneus',
  'peças',
  'revisão',
  'troca de óleo',
  'freio',
  'suspensão',
  'outro serviço',
];

export function HomeScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuoteOptions, setSelectedQuoteOptions] = useState<QuoteCategory[]>(['pneus', 'revisão']);
  const [quoteDescription, setQuoteDescription] = useState('Preciso de orçamento para revisão preventiva e avaliação dos pneus do meu veículo.');
  const [quoteFeedback, setQuoteFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const activeVehicle = useMemo(() => data?.vehicles[0], [data]);

  const toggleQuoteOption = (option: QuoteCategory) => {
    setSelectedQuoteOptions((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  };

  const handleSubmitQuote = async () => {
    if (!activeVehicle || selectedQuoteOptions.length === 0) {
      return;
    }

    setSubmitting(true);
    const response = await submitQuoteRequest({
      vehicleId: activeVehicle.id,
      categories: selectedQuoteOptions,
      description: quoteDescription,
    });

    setQuoteFeedback(`${response.message} Protocolo ${response.protocol}. O administrador receberá a solicitação, fará a análise e enviará o retorno ao cliente.`);
    setSubmitting(false);
  };

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

      <SectionCard title="Estrutura técnica sugerida" subtitle="Módulos funcionais recomendados para escalar o app">
        <View style={styles.stack}>
          {data.appModules.map((module: AppModule) => (
            <View key={module.id} style={styles.architectureCard}>
              <View style={styles.vehicleHeader}>
                <Text style={styles.listItemTitle}>{module.name}</Text>
                <Text style={styles.architectureTag}>Módulo</Text>
              </View>
              <Text style={styles.listItemDescription}>{module.description}</Text>
              <View style={styles.responsibilityRow}>
                {module.responsibilities.map((responsibility) => (
                  <View key={responsibility} style={styles.responsibilityChip}>
                    <Text style={styles.responsibilityText}>{responsibility}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Telas sugeridas do app" subtitle="Estrutura base do app do cliente com foco em navegação clara" rightLabel={`${data.screenSuggestions.length} telas`}>
        <View style={styles.screenGrid}>
          {data.screenSuggestions.map((screen: AppScreenSuggestion) => (
            <View key={screen.id} style={styles.screenCard}>
              <Text style={styles.screenTitle}>{screen.title}</Text>
              <Text style={styles.screenSubtitle}>{screen.subtitle}</Text>
              <View style={styles.screenHighlights}>
                {screen.highlights.map((highlight) => (
                  <View key={highlight} style={styles.screenHighlightPill}>
                    <Text style={styles.screenHighlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Jornada do cliente" subtitle="Cadastro, login, veículos e serviços">
        <View style={styles.stack}>
          {data.domainEntities.map((entity: DomainEntity) => (
            <View key={entity.id} style={styles.architectureCard}>
              <View style={styles.vehicleHeader}>
                <Text style={styles.listItemTitle}>{entity.name}</Text>
                <Text style={styles.architectureTag}>Entidade</Text>
              </View>
              <Text style={styles.listItemDescription}>{entity.description}</Text>
              <Text style={styles.metaLabel}>Campos-chave</Text>
              <Text style={styles.entityFields}>{entity.keyFields.join(' • ')}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

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

      <SectionCard title="Matriz de requisitos funcionais" subtitle="Rastreabilidade dos RF01 ao RF10 dentro da solução">
        <View style={styles.stack}>
          {data.requirements.map((requirement: FunctionalRequirement) => (
            <View key={requirement.id} style={styles.requirementCard}>
              <View style={styles.requirementHeader}>
                <Text style={styles.requirementId}>{requirement.id}</Text>
                <Text style={styles.requirementStatus}>{requirement.status}</Text>
              </View>
              <Text style={styles.listItemTitle}>{requirement.title}</Text>
              <Text style={styles.listItemDescription}>{requirement.description}</Text>
              <Text style={styles.requirementArea}>Área do app: {requirement.appArea}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Stack solicitado para este projeto" subtitle="Base tecnológica escolhida para mobile, backend, autenticação e painel web">
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

      <SectionCard title="Fluxos principais do usuário" subtitle="Jornadas centrais do cliente e do admin dentro do MVP">
        <View style={styles.stack}>
          {data.userFlows.map((flow: UserFlow) => (
            <View key={flow.id} style={styles.flowCard}>
              <Text style={styles.listItemTitle}>{flow.title}</Text>
              <Text style={styles.listItemDescription}>{flow.summary}</Text>
              <View style={styles.flowSteps}>
                {flow.steps.map((step, index) => (
                  <View key={`${flow.id}-${index + 1}`} style={styles.flowStepItem}>
                    <Text style={styles.flowStepIndex}>{index + 1}</Text>
                    <Text style={styles.flowStepText}>{step}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.flowOutcome}>{flow.outcome}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Meus veículos" subtitle="Cliente pode cadastrar múltiplos veículos" rightLabel={`${data.vehicles.length} ativos`}>
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
          <View style={styles.serviceSummary}>
            <Text style={styles.serviceBudget}>Orçamento atual: {service.budget}</Text>
            <Text style={styles.metaLabel}>{service.technician}</Text>
            <Text style={styles.metaLabel}>Timeline visual com barra de progresso para o demo</Text>
          </View>
          <ServiceProgressTracker service={service} />
        </SectionCard>
      ) : null}

      <SectionCard title="Resumo do veículo" subtitle="Informações rápidas do veículo principal cadastrado.">
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleHeader}>
            <Text style={styles.cardTitle}>{activeVehicle.brand} {activeVehicle.model}</Text>
            <Text style={styles.plateBadge}>{activeVehicle.plate}</Text>
          </View>

      <CatalogScreen items={data.catalog} vehicle={activeVehicle} />

      <SectionCard title="Enviar orçamento para o administrador" subtitle="Cliente seleciona itens → sistema registra pedido → admin recebe e responde">
        <Text style={styles.sectionHelper}>Selecione o que deseja incluir no pedido de orçamento:</Text>
        <View style={styles.optionGrid}>
          {quoteOptions.map((option) => {
            const selected = selectedQuoteOptions.includes(option);

            return (
              <Pressable
                key={option}
                onPress={() => toggleQuoteOption(option)}
                style={[styles.optionChip, selected ? styles.optionChipSelected : undefined]}
              >
                <Text style={[styles.optionChipText, selected ? styles.optionChipTextSelected : undefined]}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <TextInput
          value={quoteDescription}
          onChangeText={setQuoteDescription}
          multiline
          placeholder="Descreva detalhes do pedido para análise do administrador"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
        <View style={styles.flowCard}>
          <Text style={styles.flowTitle}>Fluxo operacional</Text>
          <Text style={styles.flowText}>Cliente solicita orçamento → sistema registra pedido → admin recebe → admin analisa → responde orçamento → cliente recebe notificação</Text>
        </View>
        <Pressable
          style={[styles.primaryButton, selectedQuoteOptions.length === 0 ? styles.primaryButtonDisabled : undefined]}
          onPress={handleSubmitQuote}
          disabled={submitting || selectedQuoteOptions.length === 0}
        >
          <Text style={styles.primaryButtonText}>
            {submitting ? 'Enviando...' : 'Enviar orçamento'}
          </Text>
        </Pressable>
        {selectedQuoteOptions.length === 0 ? (
          <Text style={styles.warningText}>Selecione ao menos uma opção para enviar a solicitação ao administrador.</Text>
        ) : null}
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
                {notification.details?.finalAmount ? (
                  <Text style={styles.notificationDetail}>Valor final: {notification.details.finalAmount}</Text>
                ) : null}
                {notification.details?.businessHours ? (
                  <Text style={styles.notificationDetail}>Horário de funcionamento: {notification.details.businessHours}</Text>
                ) : null}
                {notification.details?.technicianNotes ? (
                  <Text style={styles.notificationDetail}>Observações do técnico: {notification.details.technicianNotes}</Text>
                ) : null}
                <Text style={styles.notificationDate}>{notification.date}</Text>
              </View>
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
  architectureCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16,
    gap: 10,
    backgroundColor: colors.surfaceAlt,
  },
  listItemTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  listItemDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  metaLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  architectureTag: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  responsibilityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  responsibilityChip: {
    borderRadius: 999,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  responsibilityText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  entityFields: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  screenGrid: {
    gap: 12,
  },
  screenCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  screenTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 16,
  },
  screenSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  screenHighlights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  screenHighlightPill: {
    backgroundColor: colors.background,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.border,
  },
  screenHighlightText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  kpiValue: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  kpiLabel: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  kpiCard: {
    flexGrow: 1,
    minWidth: 90,
    backgroundColor: colors.surfaceAlt,
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
  flowCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 16,
    gap: 10,
  },
  flowSteps: {
    gap: 8,
  },
  flowStepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  flowStepIndex: {
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: colors.primary,
    color: '#171717',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 22,
  },
  flowStepText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
  },
  flowOutcome: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  requirementCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  requirementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
  },
  requirementId: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  requirementStatus: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  requirementArea: {
    color: colors.info,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  vehicleCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
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
  input: {
    minHeight: 110,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
  },
  flowCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    padding: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  flowTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  flowText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.45,
  },
  primaryButtonText: {
    color: '#171717',
    fontWeight: '800',
  },
  warningText: {
    color: colors.warning,
    fontSize: 13,
    lineHeight: 18,
  },
  feedback: {
    color: colors.success,
    fontSize: 13,
    lineHeight: 18,
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
  notificationDetail: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
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
  vehicleMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },
});
