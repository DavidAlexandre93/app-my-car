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
  QuoteCategory,
  ServiceHistoryItem,
  ServiceStatusStep,
  Shortcut,
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

      <SectionCard title="Histórico de serviços" subtitle="Registro completo por veículo">
        <View style={styles.stack}>
          {data.history.map((entry: ServiceHistoryItem) => (
            <View key={entry.id} style={styles.historyItem}>
              <View style={styles.listItemText}>
                <Text style={styles.listItemTitle}>{entry.title}</Text>
                <Text style={styles.listItemDescription}>{entry.details}</Text>
              </View>
              <View style={styles.historyMeta}>
                <Text style={styles.metaLabel}>{entry.date}</Text>
                <Text style={styles.historyAmount}>{entry.amount}</Text>
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
  sectionHelper: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
  },
  optionChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryStrong,
  },
  optionChipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  optionChipTextSelected: {
    color: colors.primary,
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
    fontSize: 15,
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
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 16,
  },
  historyMeta: {
    alignItems: 'flex-end',
    gap: 8,
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
