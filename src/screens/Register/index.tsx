import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useAuthStore } from '../../store';
import { colors } from '../../utils/colors';

type RegisterFormProps = {
  onSwitch: () => void;
};

const initialVehicle = {
  plate: '',
  brand: '',
  model: '',
  year: '',
  mileage: '',
};

export function RegisterScreen({ onSwitch }: RegisterFormProps) {
  const register = useAuthStore((state) => state.register);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [includeVehicle, setIncludeVehicle] = useState(true);
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [feedback, setFeedback] = useState('Crie sua conta e já vincule o primeiro veículo do cliente.');

  const updateVehicleField = (field: keyof typeof initialVehicle, value: string) => {
    setVehicle((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    const result = register({
      name,
      phone,
      email,
      password,
      vehicle: includeVehicle ? vehicle : undefined,
    });

    setFeedback(result.message);

    if (result.success) {
      setName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setVehicle(initialVehicle);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.description}>
        Cadastro do cliente com nome, telefone e e-mail, além da opção de já registrar placa, modelo, ano e quilometragem do primeiro veículo.
      </Text>

      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor={colors.textMuted} value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor={colors.textMuted} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor={colors.textMuted} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={colors.textMuted} secureTextEntry value={password} onChangeText={setPassword} />

      <View style={styles.switchRow}>
        <View style={styles.switchCopy}>
          <Text style={styles.switchTitle}>Cadastrar primeiro veículo agora</Text>
          <Text style={styles.switchDescription}>Ative para já informar placa, marca, modelo, ano e quilometragem.</Text>
        </View>
        <Switch value={includeVehicle} onValueChange={setIncludeVehicle} trackColor={{ false: colors.border, true: colors.primary }} thumbColor={colors.background} />
      </View>

      {includeVehicle ? (
        <View style={styles.vehicleBlock}>
          <Text style={styles.sectionTitle}>Dados do veículo</Text>
          <TextInput style={styles.input} placeholder="Placa do carro" placeholderTextColor={colors.textMuted} autoCapitalize="characters" value={vehicle.plate} onChangeText={(value) => updateVehicleField('plate', value)} />
          <TextInput style={styles.input} placeholder="Marca" placeholderTextColor={colors.textMuted} value={vehicle.brand} onChangeText={(value) => updateVehicleField('brand', value)} />
          <TextInput style={styles.input} placeholder="Modelo" placeholderTextColor={colors.textMuted} value={vehicle.model} onChangeText={(value) => updateVehicleField('model', value)} />
          <View style={styles.row}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Ano" placeholderTextColor={colors.textMuted} keyboardType="number-pad" value={vehicle.year} onChangeText={(value) => updateVehicleField('year', value)} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Quilometragem" placeholderTextColor={colors.textMuted} keyboardType="number-pad" value={vehicle.mileage} onChangeText={(value) => updateVehicleField('mileage', value)} />
          </View>
        </View>
      ) : null}

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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  switchCopy: {
    flex: 1,
    gap: 4,
  },
  switchTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  switchDescription: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  vehicleBlock: {
    gap: 12,
    padding: 14,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
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
