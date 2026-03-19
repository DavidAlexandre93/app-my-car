import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { fetchDashboardData } from '../../services/api/mockApi';
import { DashboardData } from '../../types';
import { colors } from '../../utils/colors';

type HomeScreenProps = {
  customerName?: string;
};

const shortcutLabelMap: Record<string, string> = {
  'Loja de pneus': 'Loja de pneus e peças',
};

export function HomeScreen({ customerName }: HomeScreenProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedShortcut, setSelectedShortcut] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const firstName = useMemo(() => {
    const fallbackName = data?.customer.name ?? 'Cliente';
    return (customerName ?? fallbackName).split(' ')[0];
  }, [customerName, data?.customer.name]);

  if (loading || !data) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text style={styles.loaderText}>Carregando tela inicial...</Text>
      </View>
    );
  }

  const activeService = data.activeServices[0];
  const nextRecommendations = [
    `Revisão preventiva recomendada para ${data.customer.nextRevision}.`,
    'Alinhamento e balanceamento sugeridos após a troca de pneus.',
    'Check-up de freios indicado para manter a segurança da próxima viagem.',
  ];

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <SectionCard title={`Olá, ${firstName}`} subtitle={data.customer.unit} rightLabel={data.customer.memberSince}>
        <Text style={styles.lead}>
          Acompanhe o que está em andamento no seu veículo, aproveite promoções da oficina e acesse rapidamente os recursos mais usados do app.
        </Text>
        <View style={styles.heroStats}>
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatLabel}>Próxima revisão</Text>
            <Text style={styles.heroStatValue}>{data.customer.nextRevision}</Text>
          </View>
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatLabel}>Veículos vinculados</Text>
            <Text style={styles.heroStatValue}>{data.vehicles.length}</Text>
          </View>
        </View>
      </SectionCard>

      <SectionCard title="Atalhos rápidos" subtitle="Acesse as ações principais da tela inicial.">
        <View style={styles.shortcutsGrid}>
          {data.shortcuts.map((shortcut) => {
            const isSelected = selectedShortcut === shortcut.id;
            const label = shortcutLabelMap[shortcut.label] ?? shortcut.label;

            return (
              <Pressable
                key={shortcut.id}
                onPress={() => setSelectedShortcut(shortcut.id)}
                style={[styles.shortcutCard, isSelected ? styles.shortcutCardActive : undefined]}
              >
                <Text style={[styles.shortcutTitle, isSelected ? styles.shortcutTitleActive : undefined]}>{label}</Text>
                <Text style={styles.shortcutDescription}>{shortcut.description}</Text>
              </Pressable>
            );
          })}
        </View>
      </SectionCard>

      <SectionCard title="Promoções em destaque" subtitle="Ofertas e campanhas para incentivar retorno à oficina.">
        <View style={styles.stack}>
          {data.promotions.slice(0, 2).map((promotion) => (
            <View key={promotion.id} style={styles.highlightCard}>
              <Text style={styles.cardKicker}>{promotion.highlight}</Text>
              <Text style={styles.cardTitle}>{promotion.title}</Text>
              <Text style={styles.cardDescription}>{promotion.description}</Text>
              <Text style={styles.ctaText}>{promotion.cta}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Próximos serviços recomendados" subtitle="Sugestões para manter a manutenção do veículo em dia.">
        <View style={styles.stack}>
          {nextRecommendations.map((item) => (
            <View key={item} style={styles.listRow}>
              <View style={styles.listMarker} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard
        title="Status do veículo em atendimento"
        subtitle={activeService ? activeService.description : 'Nenhum atendimento ativo no momento.'}
        rightLabel={activeService ? activeService.eta : 'Sem previsão'}
      >
        {activeService ? (
          <View style={styles.statusPanel}>
            <View style={styles.statusHeader}>
              <View>
                <Text style={styles.cardTitle}>{activeService.title}</Text>
                <Text style={styles.cardDescription}>Responsável: {activeService.technician}</Text>
              </View>
              <View style={styles.budgetBadge}>
                <Text style={styles.budgetLabel}>Orçamento</Text>
                <Text style={styles.budgetValue}>{activeService.budget}</Text>
              </View>
            </View>

            <View style={styles.stack}>
              {activeService.steps.map((step, index) => (
                <View key={`${step.label}-${index}`} style={styles.stepRow}>
                  <View
                    style={[
                      styles.stepIndicator,
                      step.completed ? styles.stepIndicatorDone : undefined,
                      step.current ? styles.stepIndicatorCurrent : undefined,
                    ]}
                  />
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>{step.label}</Text>
                    <Text style={styles.stepMeta}>
                      {step.current ? 'Etapa atual do atendimento' : step.completed ? 'Etapa concluída' : 'Aguardando próxima atualização'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Text style={styles.lead}>Seu veículo não possui uma ordem de serviço aberta agora.</Text>
        )}
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
    gap: 16,
    paddingBottom: 32,
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
  },
  lead: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 12,
  },
  heroStatCard: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 4,
  },
  heroStatLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  heroStatValue: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 16,
  },
  shortcutsGrid: {
    gap: 12,
  },
  shortcutCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
  },
  shortcutCardActive: {
    borderColor: colors.primary,
    backgroundColor: '#2B2412',
  },
  shortcutTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 15,
  },
  shortcutTitleActive: {
    color: colors.primary,
  },
  shortcutDescription: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  stack: {
    gap: 12,
  },
  highlightCard: {
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
  ctaText: {
    color: colors.accent,
    fontWeight: '700',
  },
  listRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  listMarker: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
    marginTop: 5,
  },
  listText: {
    flex: 1,
    color: colors.text,
    lineHeight: 20,
  },
  statusPanel: {
    gap: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
  },
  budgetBadge: {
    minWidth: 112,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 3,
  },
  budgetLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  budgetValue: {
    color: colors.primary,
    fontWeight: '800',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  stepIndicator: {
    width: 14,
    height: 14,
    borderRadius: 999,
    marginTop: 2,
    backgroundColor: colors.border,
  },
  stepIndicatorDone: {
    backgroundColor: colors.success,
  },
  stepIndicatorCurrent: {
    backgroundColor: colors.primary,
  },
  stepContent: {
    flex: 1,
    gap: 4,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  stepTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  stepMeta: {
    color: colors.textMuted,
    fontSize: 13,
  },
});
