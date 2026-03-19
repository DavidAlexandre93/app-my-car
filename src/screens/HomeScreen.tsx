import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SectionCard } from '../components/SectionCard';
import { fetchDashboardData, submitQuoteRequest } from '../services/mockApi';
import { colors } from '../theme/colors';
import { ActiveService, AppNotification, CatalogItem, DashboardData, Promotion, ServiceHistoryItem, ServiceStatusStep } from '../types';

const quickActions = [
  'Acompanhar serviço',
  'Solicitar orçamento',
  'Histórico',
  'Notificações',
];

export function HomeScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [quoteDescription, setQuoteDescription] = useState('Quero orçamento para 4 pneus aro 18 e alinhamento.');
  const [quoteFeedback, setQuoteFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const activeVehicle = useMemo(() => data?.vehicles[0], [data]);

  const handleSubmitQuote = async () => {
    if (!activeVehicle) {
      return;
    }

    setSubmitting(true);
    const response = await submitQuoteRequest({
      vehicleId: activeVehicle.id,
      type: 'Pneus e serviços',
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
        <Text style={styles.brand}>IMPACTO Prime</Text>
        <Text style={styles.heroTitle}>Pensou pneus, pensou impacto.</Text>
        <Text style={styles.heroText}>
          Acompanhe serviços, receba promoções, solicite orçamentos e mantenha o histórico do seu carro na palma da mão.
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
      </View>

      <SectionCard title="Atalhos rápidos" subtitle={data.customer.unit}>
        <View style={styles.actionGrid}>
          {quickActions.map((action) => (
            <View key={action} style={styles.actionPill}>
              <Text style={styles.actionText}>{action}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard
        title="Meu veículo principal"
        subtitle={activeVehicle.notes}
        rightLabel={activeVehicle.plate}
      >
        <View style={styles.vehicleMetaRow}>
          <View>
            <Text style={styles.metaLabel}>Modelo</Text>
            <Text style={styles.metaValue}>{activeVehicle.brand} {activeVehicle.model}</Text>
          </View>
          <View>
            <Text style={styles.metaLabel}>Ano</Text>
            <Text style={styles.metaValue}>{activeVehicle.year}</Text>
          </View>
          <View>
            <Text style={styles.metaLabel}>KM</Text>
            <Text style={styles.metaValue}>{activeVehicle.mileage.toLocaleString('pt-BR')}</Text>
          </View>
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

      <SectionCard title="Promoções e campanhas" subtitle="Ofertas em destaque da oficina">
        <View style={styles.stack}>
          {data.promotions.map((promotion: Promotion) => (
            <View key={promotion.id} style={styles.listItem}>
              <View style={styles.listItemText}>
                <Text style={styles.listItemTitle}>{promotion.title}</Text>
                <Text style={styles.listItemDescription}>{promotion.description}</Text>
              </View>
              <Text style={styles.highlight}>{promotion.highlight}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Catálogo de pneus, peças e serviços" subtitle="Dados mocados simulando retorno de API">
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

      <SectionCard title="Solicitar orçamento" subtitle="Envie um pedido rápido para o administrativo">
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

      <SectionCard title="Histórico de serviços" subtitle="Registros anteriores por veículo">
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

      <SectionCard title="Central de notificações" subtitle="Promoções, status de serviço e lembretes">
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
    flexWrap: 'wrap',
  },
  heroBadge: {
    flexGrow: 1,
    minWidth: 140,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  heroBadgeLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heroBadgeValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionPill: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '600',
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
    marginBottom: 4,
  },
  metaValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  serviceSummary: {
    gap: 4,
  },
  serviceBudget: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  timeline: {
    gap: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    backgroundColor: colors.border,
  },
  timelineDotDone: {
    backgroundColor: colors.success,
  },
  timelineDotCurrent: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
  timelineText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  timelineTextCurrent: {
    color: colors.text,
    fontWeight: '700',
  },
  stack: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
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
    lineHeight: 19,
  },
  highlight: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    alignSelf: 'flex-start',
  },
  catalogCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    padding: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
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
    alignItems: 'center',
    marginTop: 8,
  },
  catalogPrice: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  input: {
    minHeight: 110,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: 16,
    paddingVertical: 14,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#231600',
    fontSize: 15,
    fontWeight: '800',
  },
  feedback: {
    color: colors.success,
    fontSize: 13,
    lineHeight: 18,
  },
  historyItem: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  historyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyAmount: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  notificationItem: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  notificationBullet: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.textMuted,
    marginTop: 6,
  },
  notificationUnread: {
    backgroundColor: colors.primary,
  },
  notificationDate: {
    color: colors.accent,
    fontSize: 11,
    marginTop: 6,
  },
});
