import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { fetchDashboardData } from '../../services/api/mockApi';
import {
  getPickupNotifications,
  getPromotionNotifications,
  getQuoteNotifications,
  getRevisionNotifications,
  pickupNotificationExample,
  promotionCampaignPlans,
  promotionNotificationCategories,
  promotionPushExample,
  pushChannelRecommendation,
} from '../../services/notifications';
import { DashboardData } from '../../types';
import { colors } from '../../utils/colors';

export function NotificationsScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const promoNotifications = useMemo(
    () => (data ? getPromotionNotifications(data.notifications) : []),
    [data],
  );
  const pickupNotifications = useMemo(
    () => (data ? getPickupNotifications(data.notifications) : []),
    [data],
  );
  const revisionNotifications = useMemo(
    () => (data ? getRevisionNotifications(data.notifications) : []),
    [data],
  );
  const quoteNotifications = useMemo(
    () => (data ? getQuoteNotifications(data.notifications) : []),
    [data],
  );

  if (loading || !data) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text style={styles.loaderText}>Carregando notificações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <SectionCard
        title="Notificações de promoções"
        subtitle="Campanhas que a oficina pode enviar ao cliente para aumentar recorrência e conversão."
        rightLabel={`${promotionNotificationCategories.length} tipos`}
      >
        <View style={styles.categoryList}>
          {promotionNotificationCategories.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Plano de campanhas promocionais" subtitle="Sugestão de segmentação e gatilhos para o envio das ofertas.">
        <View style={styles.planList}>
          {promotionCampaignPlans.map((plan) => (
            <View key={plan.id} style={styles.planCard}>
              <Text style={styles.planTitle}>{plan.title}</Text>
              <Text style={styles.planMeta}>Gatilho: {plan.trigger}</Text>
              <Text style={styles.planMeta}>Público: {plan.audience}</Text>
              <Text style={styles.planObjective}>{plan.objective}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Exemplo de notificação" subtitle="Mensagem curta, direta e pronta para push.">
        <View style={styles.exampleCard}>
          <Text style={styles.exampleLabel}>Push promocional</Text>
          <Text style={styles.exampleText}>“{promotionPushExample}”</Text>
        </View>
      </SectionCard>

      <SectionCard
        title="Notificação de veículo pronto para retirada"
        subtitle="Quando o serviço for concluído, o cliente recebe um aviso com contexto para buscar o carro."
      >
        <View style={styles.pickupCard}>
          <Text style={styles.exampleLabel}>Push transacional</Text>
          <Text style={styles.exampleText}>“{pickupNotificationExample.message}”</Text>

          <View style={styles.pickupFieldList}>
            {pickupNotificationExample.optionalFields.map((field) => (
              <View key={field.label} style={styles.pickupFieldCard}>
                <Text style={styles.pickupFieldLabel}>{field.label}</Text>
                <Text style={styles.pickupFieldValue}>{field.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.notificationRow}>
          {pickupNotifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <Text style={styles.notificationDate}>{notification.date}</Text>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              {notification.details?.finalAmount ? (
                <Text style={styles.notificationDetail}>Valor final: {notification.details.finalAmount}</Text>
              ) : null}
              {notification.details?.businessHours ? (
                <Text style={styles.notificationDetail}>Funcionamento: {notification.details.businessHours}</Text>
              ) : null}
              {notification.details?.technicianNotes ? (
                <Text style={styles.notificationDetail}>Técnico: {notification.details.technicianNotes}</Text>
              ) : null}
              <Text style={styles.notificationStatus}>{notification.read ? 'Lida' : 'Nova'}</Text>
            </View>
          ))}
        </ScrollView>
      </SectionCard>

      <SectionCard title="Lembretes de revisão periódica" subtitle="Notificações calculadas para reforçar o retorno do cliente a cada ciclo preventivo.">
        <View style={styles.planList}>
          {revisionNotifications.map((notification) => (
            <View key={notification.id} style={styles.planCard}>
              <Text style={styles.planTitle}>{notification.title}</Text>
              <Text style={styles.planMeta}>{notification.details?.vehicleLabel ?? 'Veículo vinculado'}</Text>
              {notification.details?.nextRevisionDate ? (
                <Text style={styles.planMeta}>Próxima revisão sugerida: {notification.details.nextRevisionDate}</Text>
              ) : null}
              <Text style={styles.planObjective}>{notification.message}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Confirmações de orçamento" subtitle="Retornos automáticos para avisar que o pedido entrou na fila administrativa.">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.notificationRow}>
          {quoteNotifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <Text style={styles.notificationDate}>{notification.date}</Text>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              {notification.details?.protocol ? (
                <Text style={styles.notificationDetail}>Protocolo: {notification.details.protocol}</Text>
              ) : null}
              {notification.details?.vehicleLabel ? (
                <Text style={styles.notificationDetail}>Veículo: {notification.details.vehicleLabel}</Text>
              ) : null}
              <Text style={styles.notificationStatus}>{notification.read ? 'Lida' : 'Nova'}</Text>
            </View>
          ))}
        </ScrollView>
      </SectionCard>

      <SectionCard title="Tecnologia sugerida" subtitle="Recomendação para entrega das notificações push no app.">
        <View style={styles.techCard}>
          <Text style={styles.techTitle}>{pushChannelRecommendation.provider}</Text>
          <Text style={styles.techDescription}>{pushChannelRecommendation.reason}</Text>
          <View style={styles.useCaseList}>
            {pushChannelRecommendation.useCases.map((useCase) => (
              <View key={useCase} style={styles.useCasePill}>
                <Text style={styles.useCaseText}>{useCase}</Text>
              </View>
            ))}
          </View>
        </View>
      </SectionCard>

      <SectionCard title="Histórico promocional no app" subtitle="Exemplo de como as campanhas podem aparecer na central de notificações.">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.notificationRow}>
          {promoNotifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <Text style={styles.notificationDate}>{notification.date}</Text>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationStatus}>{notification.read ? 'Lida' : 'Nova'}</Text>
            </View>
          ))}
        </ScrollView>
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
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
    fontSize: 14,
  },
  categoryList: {
    gap: 10,
  },
  categoryCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 6,
  },
  categoryTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  categoryDescription: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },

  planList: {
    gap: 10,
  },
  planCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 6,
  },
  planTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  planMeta: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  planObjective: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  exampleCard: {
    backgroundColor: colors.background,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 8,
  },
  exampleLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  exampleText: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
  },
  pickupCard: {
    backgroundColor: colors.background,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 12,
  },
  pickupFieldList: {
    gap: 10,
  },
  pickupFieldCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 4,
  },
  pickupFieldLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  pickupFieldValue: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
  },
  techCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 10,
  },
  techTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  techDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  useCaseList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  useCasePill: {
    backgroundColor: colors.background,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  useCaseText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  notificationRow: {
    gap: 12,
  },
  notificationCard: {
    width: 260,
    backgroundColor: colors.background,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
  },
  notificationDate: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  notificationTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  notificationMessage: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  notificationDetail: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  notificationStatus: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
