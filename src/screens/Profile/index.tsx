import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuthStore } from '../../store';
import { colors } from '../../utils/colors';

export function ProfileScreen() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const [name, setName] = useState(currentUser?.name ?? '');
  const [phone, setPhone] = useState(currentUser?.phone ?? '');
  const [email, setEmail] = useState(currentUser?.email ?? '');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setName(currentUser?.name ?? '');
    setPhone(currentUser?.phone ?? '');
    setEmail(currentUser?.email ?? '');
  }, [currentUser]);

  const handleSave = () => {
    updateProfile({ name, phone, email });
    setFeedback('Dados do cliente atualizados com sucesso.');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Dados do cliente</Text>
      <Text style={styles.description}>
        Nome, telefone e e-mail ficam centralizados para facilitar contato da oficina sobre aprovações e retirada.
      </Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nome" placeholderTextColor={colors.textMuted} />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Telefone" placeholderTextColor={colors.textMuted} keyboardType="phone-pad" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="E-mail" placeholderTextColor={colors.textMuted} autoCapitalize="none" keyboardType="email-address" />
      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar dados</Text>
      </Pressable>
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
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
    fontSize: 20,
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
    color: colors.success,
    fontSize: 13,
  },
});
