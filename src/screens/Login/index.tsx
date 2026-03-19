import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../utils/colors';
import { useAuthStore } from '../../store';

type LoginFormProps = {
  onSwitch: () => void;
};

export function LoginScreen({ onSwitch }: LoginFormProps) {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('lucas@impactoprime.app');
  const [password, setPassword] = useState('123456');
  const [feedback, setFeedback] = useState('Use o acesso demo preenchido automaticamente para testar.');

  const handleSubmit = () => {
    const result = login({ email, password });
    setFeedback(result.message);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Login do cliente</Text>
      <Text style={styles.description}>
        Entre com e-mail e senha para acompanhar serviços, cadastrar veículos e consultar seu histórico.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={colors.textMuted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

      <Text style={styles.feedback}>{feedback}</Text>

      <Pressable onPress={onSwitch}>
        <Text style={styles.link}>Ainda não tem conta? Criar cadastro</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    gap: 12,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background,
    fontWeight: '800',
  },
  feedback: {
    color: colors.accent,
    fontSize: 13,
    lineHeight: 18,
  },
  link: {
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
});
