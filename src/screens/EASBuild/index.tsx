import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { colors } from '../../utils/colors';

const features = [
  'Cloud builds para Android e iOS em ambientes consistentes.',
  'Gerenciamento de credenciais de assinatura automaticamente (ou com credenciais próprias).',
  'Distribuição interna de builds com link para o time.',
  'Perfis de build no eas.json para automação com CI e workflows.',
  'Integração com EAS Submit para envio às lojas.',
  'Suporte ao expo-updates com canais e runtime version por perfil.',
];

const faq = [
  {
    question: 'Posso usar com projeto React Native já existente?',
    answer: 'Sim. O EAS Build funciona com projetos existentes criados com react-native init e similares.',
  },
  {
    question: 'Dá para rodar build local?',
    answer: 'Sim. Use eas build --local para rodar no seu próprio ambiente.',
  },
  {
    question: 'Consigo compartilhar com testers antes da loja?',
    answer: 'Sim. Use distribuição interna com perfil contendo "distribution": "internal".',
  },
];

export function EASBuildScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionCard
        title="EAS Build"
        subtitle="Serviço hospedado para gerar binários Android e iOS com Expo e React Native."
        rightLabel="Expo"
      >
        <View style={styles.block}>
          <Text style={styles.heading}>Quick start</Text>
          <Text style={styles.description}>
            Execute <Text style={styles.code}>eas build --platform all</Text> para enviar o projeto ao EAS Build e
            gerar binários instaláveis para Android e iOS.
          </Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.heading}>Principais recursos</Text>
          {features.map((feature) => (
            <Text key={feature} style={styles.listItem}>
              • {feature}
            </Text>
          ))}
        </View>

        <View style={styles.block}>
          <Text style={styles.heading}>Quando usar</Text>
          <Text style={styles.description}>
            Ideal para builds de produção, distribuição interna com testers, automação em CI e padronização do
            processo de release no time.
          </Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.heading}>FAQ rápida</Text>
          {faq.map((item) => (
            <View key={item.question} style={styles.faqCard}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.answer}>{item.answer}</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  block: {
    gap: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
  },
  heading: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '800',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
  code: {
    fontFamily: 'monospace',
    color: colors.primary,
    fontWeight: '700',
  },
  listItem: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
  faqCard: {
    gap: 6,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  question: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
  },
  answer: {
    color: colors.textMuted,
    lineHeight: 20,
    fontSize: 13,
  },
});
