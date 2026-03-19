import { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { submitQuoteRequest } from '../../services/api/mockApi';
import { CatalogItem, Vehicle } from '../../types';
import { colors } from '../../utils/colors';

type CatalogScreenProps = {
  items: CatalogItem[];
  vehicle: Vehicle;
};

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

  const handleQuoteRequest = async (item: CatalogItem) => {
    setSelectedItemId(item.id);
    const response = await submitQuoteRequest({
      vehicleId: vehicle.id,
      type: item.category,
      description: `Solicito orçamento para ${item.name}. ${item.description}`,
    });

    setFeedback(`${item.name}: ${response.message} Protocolo ${response.protocol}.`);
    setSelectedItemId(null);
  };

  return (
    <SectionCard
      title="Tela de venda de pneus e peças"
      subtitle="Catálogo com pneus, baterias, freios, filtros, óleos e peças em geral."
      rightLabel={`${filteredItems.length} itens`}
    >
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
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.stock}>{item.stock}</Text>
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
    gap: 8,
  },
  category: {
    color: colors.info,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
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
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  price: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  stock: {
    color: colors.accent,
    fontSize: 12,
  },
  button: {
    marginTop: 6,
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
