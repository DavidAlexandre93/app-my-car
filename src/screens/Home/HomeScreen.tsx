import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { ServiceProgressTracker } from '../../components/ServiceProgressTracker';
import { useDashboardData } from '../../hooks';
import { colors } from '../../utils/colors';

type HomeScreenProps = {
  customerName?: string;
};

const shortcutLabelMap: Record<string, string> = {
  'Loja de pneus': 'Loja de pneus e peças',
};

export function HomeScreen({ customerName }: HomeScreenProps) {
  const { data, loading, error, retry } = useDashboardData();
  const [selectedShortcut, setSelectedShortcut] = useState<string | null>(null);

  if (loading && !data) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderTitle}>Carregando tela inicial...</Text>
        <Text style={styles.loaderText}>Buscando promoções, atalhos e status do veículo.</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderTitle}>Não foi possível carregar a tela inicial.</Text>
        <Text style={styles.loaderText}>Verifique os dados da demo e tente novamente.</Text>
        <Pressable style={styles.retryButton} onPress={retry}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  const firstName = (customerName ?? data.customer.name ?? 'Cliente').split(' ')[0];
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
              <View style={styles.statusHeaderText}>
                <Text style={styles.cardTitle}>{activeService.title}</Text>
                <Text style={styles.cardDescription}>{activeService.description}</Text>
              </View>
              <View style={styles.budgetBadge}>
                <Text style={styles.budgetLabel}>Orçamento</Text>
                <Text style={styles.budgetValue}>{activeService.budget}</Text>
              </View>
            </View>

            <ServiceProgressTracker service={activeService} />
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
    padding: 16,
    paddingBottom: 32,
  },
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
  retryButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  retryButtonText: {
    color: colors.background,
    fontWeight: '800',
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
    color: colors.textMuted,
    lineHeight: 20,
  },
  statusPanel: {
    gap: 12,
  },
  statusHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  statusHeaderText: {
    flex: 1,
    gap: 4,
  },
  budgetBadge: {
    minWidth: 108,
    backgroundColor: '#2A2417',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.primaryStrong,
    padding: 12,
    gap: 4,
  },
  budgetLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  budgetValue: {
    color: colors.primary,
    fontWeight: '800',
  },
});
