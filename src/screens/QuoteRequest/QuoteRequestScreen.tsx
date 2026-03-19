import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { fetchDashboardData, submitQuoteRequest } from '../../services/api/mockApi';
import { DashboardData, QuoteCategory, Vehicle } from '../../types';
import { colors } from '../../utils/colors';

type QuoteRequestScreenProps = {
  customerName: string;
  vehicles: Vehicle[];
};

type QuoteFlowStep = {
  id: string;
  title: string;
  description: string;
  status: 'done' | 'current' | 'pending';
};

const quoteCategories: QuoteCategory[] = [
  'pneus',
  'peças',
  'revisão',
  'troca de óleo',
  'freio',
  'suspensão',
  'outro serviço',
];

const flowSteps = (selectedCategories: QuoteCategory[], protocol?: string): QuoteFlowStep[] => [
  {
    id: 'step-1',
    title: 'Cliente solicita orçamento',
    description:
      selectedCategories.length > 0
        ? `Itens selecionados: ${selectedCategories.join(', ')}.`
        : 'O cliente escolhe pneus, peças, revisão, troca de óleo, freio, suspensão ou outro serviço.',
    status: selectedCategories.length > 0 ? 'done' : 'current',
  },
  {
    id: 'step-2',
    title: 'Sistema registra pedido',
    description: protocol
      ? `Pedido salvo com o protocolo ${protocol} para acompanhamento.`
      : 'Ao enviar, o app gera um protocolo e armazena o pedido para acompanhamento.',
    status: protocol ? 'done' : selectedCategories.length > 0 ? 'current' : 'pending',
  },
  {
    id: 'step-3',
    title: 'Admin recebe a solicitação',
    description: 'O administrador visualiza a fila de entrada com cliente, veículo e categorias solicitadas.',
    status: protocol ? 'done' : 'pending',
  },
  {
    id: 'step-4',
    title: 'Admin analisa e responde orçamento',
    description: 'A equipe comercial valida peças, disponibilidade, serviços e devolve a proposta ao cliente.',
    status: protocol ? 'current' : 'pending',
  },
  {
    id: 'step-5',
    title: 'Cliente recebe notificação',
    description: 'Quando houver retorno, o app envia uma notificação com o status da cotação e orientações de contato.',
    status: 'pending',
  },
];

export function QuoteRequestScreen({ customerName, vehicles }: QuoteRequestScreenProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id ?? '');
  const [selectedCategories, setSelectedCategories] = useState<QuoteCategory[]>([]);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('Selecione o veículo e os itens desejados para enviar o orçamento ao administrador.');
  const [protocol, setProtocol] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === selectedVehicleId) ?? vehicles[0],
    [selectedVehicleId, vehicles],
  );

  useEffect(() => {
    fetchDashboardData().then(setDashboardData);
  }, []);

  const flow = useMemo(() => flowSteps(selectedCategories, protocol ?? undefined), [protocol, selectedCategories]);

  const adminInboxMessage = useMemo(() => {
    if (!selectedVehicle) {
      return 'Nenhum veículo vinculado ao cliente.';
    }

    if (!selectedCategories.length) {
      return 'A fila do administrador exibirá o resumo do pedido assim que o cliente selecionar os itens desejados.';
    }

    return `${customerName} • ${selectedVehicle.brand} ${selectedVehicle.model} (${selectedVehicle.plate}) • ${selectedCategories.join(', ')}.`;
  }, [customerName, selectedCategories, selectedVehicle]);

  const toggleCategory = (category: QuoteCategory) => {
    setSelectedCategories((current) =>
      current.includes(category) ? current.filter((item) => item !== category) : [...current, category],
    );
  };

  const handleSubmit = async () => {
    if (!selectedVehicle) {
      setFeedback('Cadastre ou selecione um veículo antes de solicitar o orçamento.');
      return;
    }

    if (!selectedCategories.length) {
      setFeedback('Selecione pelo menos um item ou serviço para o orçamento.');
      return;
    }

    setSubmitting(true);
    const response = await submitQuoteRequest(
      {
        vehicleId: selectedVehicle.id,
        categories: selectedCategories,
        description: description.trim() || 'Cliente solicita retorno do administrador com orçamento detalhado.',
      },
      {
        customerName,
      },
    );
    setProtocol(response.protocol);
    setFeedback(response.message);
    setDashboardData(await fetchDashboardData());
    setSubmitting(false);
  };

  return (
    <SectionCard
      title="Envio de orçamento para o administrador"
      subtitle="Ao clicar em Enviar orçamento, o cliente escolhe pneus, peças, revisão, troca de óleo, freio, suspensão ou outro serviço, e o pedido segue para análise do admin."
      rightLabel={protocol ?? 'Fluxo RF08'}
    >
      <View style={styles.summaryCard}>
        <Text style={styles.summaryEyebrow}>Pedido do cliente</Text>
        <Text style={styles.summaryTitle}>Solicite o orçamento e direcione a demanda para a fila administrativa.</Text>
        <Text style={styles.summaryText}>
          O app registra a solicitação, apresenta um protocolo e deixa claro que o administrador receberá o pedido para retorno ao cliente.
        </Text>
      </View>

      <View style={styles.vehicleRow}>
        {vehicles.map((vehicle) => {
          const active = selectedVehicleId === vehicle.id;
          return (
            <Pressable
              key={vehicle.id}
              onPress={() => setSelectedVehicleId(vehicle.id)}
              style={[styles.vehicleCard, active ? styles.vehicleCardActive : undefined]}
            >
              <Text style={[styles.vehicleTitle, active ? styles.vehicleTitleActive : undefined]}>
                {vehicle.brand} {vehicle.model}
              </Text>
              <Text style={styles.vehicleMeta}>{vehicle.plate} • {vehicle.year}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.categoriesGrid}>
        {quoteCategories.map((category) => {
          const active = selectedCategories.includes(category);
          return (
            <Pressable
              key={category}
              onPress={() => toggleCategory(category)}
              style={[styles.categoryChip, active ? styles.categoryChipActive : undefined]}
            >
              <Text style={[styles.categoryText, active ? styles.categoryTextActive : undefined]}>{category}</Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Detalhe a necessidade do cliente para ajudar o admin a responder o orçamento."
        placeholderTextColor={colors.textMuted}
      />

      <Pressable style={[styles.submitButton, submitting ? styles.submitButtonDisabled : undefined]} onPress={handleSubmit} disabled={submitting}>
        <Text style={styles.submitButtonText}>{submitting ? 'Enviando orçamento...' : 'Enviar orçamento'}</Text>
      </Pressable>

      <Text style={styles.feedback}>{feedback}</Text>

      <View style={styles.flowList}>
        {flow.map((step) => (
          <View key={step.id} style={styles.flowCard}>
            <View
              style={[
                styles.flowBadge,
                step.status === 'done'
                  ? styles.flowBadgeDone
                  : step.status === 'current'
                    ? styles.flowBadgeCurrent
                    : styles.flowBadgePending,
              ]}
            >
              <Text style={styles.flowBadgeText}>
                {step.status === 'done' ? '✓' : step.status === 'current' ? '•' : '○'}
              </Text>
            </View>
            <View style={styles.flowCopy}>
              <Text style={styles.flowTitle}>{step.title}</Text>
              <Text style={styles.flowDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.adminPanelCard}>
        <Text style={styles.panelTitle}>Prévia do pedido recebido pelo admin</Text>
        <Text style={styles.panelText}>{adminInboxMessage}</Text>
        <View style={styles.panelDivider} />
        <Text style={styles.panelMeta}>Status inicial: Novo pedido</Text>
        <Text style={styles.panelMeta}>Próxima ação: analisar disponibilidade e responder orçamento ao cliente.</Text>
      </View>

      <View style={styles.adminQueueCard}>
        <Text style={styles.panelTitle}>Fila administrativa atual</Text>
        <Text style={styles.panelMeta}>Pedidos em aberto: {dashboardData?.adminPanel.quoteRequests.length ?? 0}</Text>
        <View style={styles.queueList}>
          {(dashboardData?.adminPanel.quoteRequests ?? []).slice(0, 3).map((request) => (
            <View key={request.id} style={styles.queueItem}>
              <Text style={styles.queueTitle}>{request.customerName}</Text>
              <Text style={styles.queueMeta}>{request.vehicleLabel}</Text>
              <Text style={styles.queueRequest}>{request.request}</Text>
              <Text style={styles.queueStatus}>{request.status}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.notificationCard}>
        <Text style={styles.panelTitle}>Notificação esperada para o cliente</Text>
        <Text style={styles.notificationText}>
          {protocol
            ? `Seu pedido ${protocol} foi enviado ao administrador. Assim que o orçamento for analisado, você receberá uma notificação no app.`
            : 'Após o envio, o cliente recebe a confirmação do protocolo e aguarda o retorno do administrador.'}
        </Text>
      </View>
    </SectionCard>
  );
}

export const QuoteRequestScreenRoute = 'QuoteRequest';

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 8,
  },
  summaryEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  summaryTitle: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '800',
  },
  summaryText: {
    color: colors.textMuted,
    lineHeight: 21,
  },
  vehicleRow: {
    gap: 10,
  },
  vehicleCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    padding: 14,
    gap: 4,
  },
  vehicleCardActive: {
    backgroundColor: '#2B2412',
    borderColor: colors.primary,
  },
  vehicleTitle: {
    color: colors.text,
    fontWeight: '800',
  },
  vehicleTitleActive: {
    color: colors.primary,
  },
  vehicleMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    color: colors.textMuted,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  categoryTextActive: {
    color: colors.background,
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: colors.background,
    fontWeight: '800',
  },
  feedback: {
    color: colors.accent,
    lineHeight: 20,
  },
  flowList: {
    gap: 10,
  },
  flowCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
  },
  flowBadge: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  flowBadgeDone: {
    backgroundColor: colors.success,
  },
  flowBadgeCurrent: {
    backgroundColor: colors.primary,
  },
  flowBadgePending: {
    backgroundColor: colors.border,
  },
  flowBadgeText: {
    color: colors.background,
    fontWeight: '900',
  },
  flowCopy: {
    flex: 1,
    gap: 4,
  },
  flowTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  flowDescription: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  adminPanelCard: {
    backgroundColor: colors.background,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
  },
  adminQueueCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 10,
  },
  queueList: {
    gap: 10,
  },
  queueItem: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 4,
  },
  queueTitle: {
    color: colors.text,
    fontWeight: '800',
  },
  queueMeta: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  queueRequest: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  queueStatus: {
    color: colors.success,
    fontWeight: '700',
  },
  panelTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 15,
  },
  panelText: {
    color: colors.textMuted,
    lineHeight: 21,
  },
  panelDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  panelMeta: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },
  notificationCard: {
    backgroundColor: '#11241A',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#25543A',
    padding: 16,
    gap: 8,
  },
  notificationText: {
    color: '#D8F7E5',
    lineHeight: 21,
  },
});
