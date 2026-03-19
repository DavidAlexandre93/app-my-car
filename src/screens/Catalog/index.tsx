import { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { submitQuoteRequest } from '../../services/api/mockApi';
import { CatalogItem, QuoteCategory, Vehicle } from '../../types';
import { colors } from '../../utils/colors';

type CatalogScreenProps = {
  items: CatalogItem[];
  vehicle: Vehicle;
};

const normalizeCategory = (category: string): QuoteCategory => {
  const aliases: Record<string, QuoteCategory> = {
    pneus: 'pneus',
    baterias: 'peças',
    freios: 'freio',
    filtros: 'peças',
    óleos: 'troca de óleo',
    'peças em geral': 'peças',
    peças: 'peças',
  };

  return aliases[category.toLowerCase()] ?? 'outro serviço';
};

const getPriceLabel = (price: string) =>
  price.toLowerCase().includes('consulta') ? 'Preço sob consulta' : 'Preço estimado';

export function CatalogScreen({ items, vehicle }: CatalogScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );

  const filteredItems = useMemo(
    () =>
      selectedCategory === 'Todos'
        ? items
        : items.filter((item) => item.category === selectedCategory),
    [items, selectedCategory],
  );

  const summary = useMemo(
    () => [
      { label: 'Categorias', value: String(categories.length - 1) },
      { label: 'Itens exibidos', value: String(filteredItems.length) },
      {
        label: 'Veículo vinculado',
        value: `${vehicle.brand} ${vehicle.model}`,
      },
    ],
    [categories.length, filteredItems.length, vehicle.brand, vehicle.model],
  );

  const handleQuoteRequest = async (item: CatalogItem) => {
    setSelectedItemId(item.id);
    const response = await submitQuoteRequest(
      {
        vehicleId: vehicle.id,
        categories: [normalizeCategory(item.category)],
        description: `Solicito orçamento para ${item.name}. ${item.description}`,
      },
      {
        sourceLabel: `Catálogo • ${item.name}`,
      },
    );

    setFeedback(`${item.name}: ${response.message} Protocolo ${response.protocol}.`);
    setSelectedItemId(null);
  };

  return (
    <SectionCard
      title="Tela de venda de pneus e peças"
      subtitle="Catálogo com pneus, baterias, freios, filtros, óleos e peças em geral, cada item com imagem, descrição, faixa de preço e orçamento rápido."
      rightLabel={`${filteredItems.length} itens`}
    >
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Catálogo automotivo</Text>
        <Text style={styles.heroTitle}>Encontre produtos para manutenção, reposição e revisão do seu veículo.</Text>
        <Text style={styles.heroDescription}>
          Navegue pelas categorias, confira o valor estimado ou o status sob consulta e envie um pedido de orçamento em um toque.
        </Text>
        <View style={styles.summaryGrid}>
          {summary.map((item) => (
            <View key={item.label} style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{item.label}</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.filterRow}>
        {categories.map((category) => {
          const active = selectedCategory === category;
          return (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[styles.filterChip, active ? styles.filterChipActive : undefined]}
            >
              <Text style={[styles.filterChipText, active ? styles.filterChipTextActive : undefined]}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.grid}>
        {filteredItems.map((item) => {
          const requesting = selectedItemId === item.id;

          return (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
              <View style={styles.content}>
                <View style={styles.headerRow}>
                  <Text style={styles.category}>{item.category}</Text>
                  <View style={styles.quoteBadge}>
                    <Text style={styles.quoteBadgeText}>{getPriceLabel(item.price)}</Text>
                  </View>
                </View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.metaStack}>
                  <View style={styles.metaCard}>
                    <Text style={styles.metaLabel}>Valor</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                  <View style={styles.metaCard}>
                    <Text style={styles.metaLabel}>Disponibilidade</Text>
                    <Text style={styles.stock}>{item.stock}</Text>
                  </View>
                </View>
                <Pressable
                  style={[styles.button, requesting ? styles.buttonDisabled : undefined]}
                  onPress={() => handleQuoteRequest(item)}
                  disabled={requesting}
                >
                  <Text style={styles.buttonText}>
                    {requesting ? 'Enviando...' : 'Solicitar orçamento'}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 10,
  },
  heroEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
  },
  heroDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  summaryGrid: {
    gap: 10,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 4,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  filterChipTextActive: {
    color: '#171717',
  },
  grid: {
    gap: 14,
  },
  card: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
  },
  content: {
    padding: 16,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  category: {
    flex: 1,
    color: colors.info,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  quoteBadge: {
    borderRadius: 999,
    backgroundColor: '#243041',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  quoteBadgeText: {
    color: '#C7D9F6',
    fontSize: 11,
    fontWeight: '700',
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  metaStack: {
    gap: 10,
    marginTop: 2,
  },
  metaCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 4,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  price: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  stock: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  button: {
    marginTop: 4,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#171717',
    fontSize: 14,
    fontWeight: '800',
  },
  feedback: {
    color: colors.success,
    fontSize: 13,
    lineHeight: 18,
  },
});
