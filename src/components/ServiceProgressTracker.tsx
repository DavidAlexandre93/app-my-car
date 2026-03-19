import { StyleSheet, Text, View } from 'react-native';
import { ActiveService, ServiceStatusStep } from '../types';
import { colors } from '../utils/colors';

const getCurrentStepIndex = (steps: ServiceStatusStep[]) => {
  const currentIndex = steps.findIndex((step) => step.current);

  if (currentIndex >= 0) {
    return currentIndex;
  }

  const lastCompletedIndex = steps.reduce((latestIndex, step, index) => (
    step.completed ? index : latestIndex
  ), -1);

  return Math.max(lastCompletedIndex, 0);
};

const getProgressPercentage = (steps: ServiceStatusStep[]) => {
  if (steps.length <= 1) {
    return 100;
  }

  return Math.round((getCurrentStepIndex(steps) / (steps.length - 1)) * 100);
};

type ServiceProgressTrackerProps = {
  service: ActiveService;
};

export function ServiceProgressTracker({ service }: ServiceProgressTrackerProps) {
  const currentStepIndex = getCurrentStepIndex(service.steps);
  const currentStep = service.steps[currentStepIndex];
  const progress = getProgressPercentage(service.steps);

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <View style={styles.summaryBadge}>
            <Text style={styles.summaryBadgeLabel}>Status atual</Text>
            <Text style={styles.summaryBadgeValue}>{currentStep.label}</Text>
          </View>
          <View style={styles.summaryBadge}>
            <Text style={styles.summaryBadgeLabel}>Previsão</Text>
            <Text style={styles.summaryBadgeValue}>{service.eta}</Text>
          </View>
        </View>

        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Andamento do serviço</Text>
          <Text style={styles.progressValue}>{progress}%</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.helperText}>
          O cliente consegue visualizar em tempo real em qual etapa o carro está, trazendo mais transparência e confiança durante todo o atendimento.
        </Text>
      </View>

      <View style={styles.timeline}>
        {service.steps.map((step, index) => {
          const isCompleted = step.completed;
          const isCurrent = step.current;
          const isUpcoming = !isCompleted && !isCurrent;

          return (
            <View key={step.label} style={styles.timelineRow}>
              <View style={styles.timelineRail}>
                <View
                  style={[
                    styles.timelineDot,
                    isCompleted ? styles.timelineDotDone : undefined,
                    isCurrent ? styles.timelineDotCurrent : undefined,
                  ]}
                >
                  {isCompleted ? <View style={styles.timelineDotInner} /> : null}
                </View>
                {index < service.steps.length - 1 ? (
                  <View
                    style={[
                      styles.timelineLine,
                      index < currentStepIndex ? styles.timelineLineDone : undefined,
                    ]}
                  />
                ) : null}
              </View>

              <View
                style={[
                  styles.timelineContent,
                  isCurrent ? styles.timelineContentCurrent : undefined,
                ]}
              >
                <Text style={[styles.timelineTitle, isCurrent ? styles.timelineTitleCurrent : undefined]}>
                  {step.label}
                </Text>
                <Text style={styles.timelineDescription}>
                  {isCompleted
                    ? 'Etapa concluída e registrada no histórico do atendimento.'
                    : isCurrent
                      ? 'Equipe trabalhando nesta fase agora, com atualização em tempo real para o cliente.'
                      : 'Próxima etapa prevista para a sequência do serviço.'}
                </Text>
                <Text
                  style={[
                    styles.timelineStatus,
                    isCompleted ? styles.timelineStatusDone : undefined,
                    isCurrent ? styles.timelineStatusCurrent : undefined,
                    isUpcoming ? styles.timelineStatusUpcoming : undefined,
                  ]}
                >
                  {isCompleted ? 'Concluído' : isCurrent ? 'Em andamento' : 'Aguardando'}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  summaryCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryBadge: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    gap: 4,
  },
  summaryBadgeLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  summaryBadgeValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  progressValue: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  progressTrack: {
    height: 12,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  helperText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  timeline: {
    gap: 0,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 14,
  },
  timelineRail: {
    alignItems: 'center',
  },
  timelineDot: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  timelineDotInner: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.surface,
  },
  timelineDotDone: {
    borderColor: colors.success,
    backgroundColor: colors.success,
  },
  timelineDotCurrent: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 54,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  timelineLineDone: {
    backgroundColor: colors.success,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  timelineContentCurrent: {
    borderColor: colors.primaryStrong,
    backgroundColor: '#2A2417',
  },
  timelineTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  timelineTitleCurrent: {
    color: colors.primary,
  },
  timelineDescription: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  timelineStatus: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    backgroundColor: colors.surface,
    color: colors.textMuted,
  },
  timelineStatusDone: {
    backgroundColor: '#173523',
    color: colors.success,
  },
  timelineStatusCurrent: {
    backgroundColor: '#3F3315',
    color: colors.primary,
  },
  timelineStatusUpcoming: {
    backgroundColor: colors.surface,
    color: colors.textMuted,
  },
});
