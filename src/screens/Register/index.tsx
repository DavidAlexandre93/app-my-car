import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuthStore } from '../../store';
import { colors } from '../../utils/colors';

type RegisterFormProps = {
  onSwitch: () => void;
};

export function RegisterScreen({ onSwitch }: RegisterFormProps) {
  const register = useAuthStore((state) => state.register);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('Crie sua conta para vincular um ou mais veículos.');

  const handleSubmit = () => {
    const result = register({ name, phone, email, password });
    setFeedback(result.message);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.description}>
        Cadastro rápido do cliente com nome, telefone, e-mail e senha para iniciar a jornada digital na oficina.
      </Text>

      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor={colors.textMuted} value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor={colors.textMuted} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor={colors.textMuted} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={colors.textMuted} secureTextEntry value={password} onChangeText={setPassword} />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar cliente</Text>
      </Pressable>

      <Text style={styles.feedback}>{feedback}</Text>

      <Pressable onPress={onSwitch}>
        <Text style={styles.link}>Já possui conta? Fazer login</Text>
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
