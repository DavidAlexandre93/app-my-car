import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuthStore } from '../../store';
import { colors } from '../../utils/colors';

export function VehiclesScreen() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const addVehicle = useAuthStore((state) => state.addVehicle);
  const [plate, setPlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    const result = addVehicle({ plate, brand, model, year, mileage });
    setFeedback(result.message);

    if (result.success) {
      setPlate('');
      setBrand('');
      setModel('');
      setYear('');
      setMileage('');
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Veículos do cliente</Text>
          <Text style={styles.description}>
            Cadastre um ou mais veículos informando placa, marca, modelo, ano e quilometragem.
          </Text>
        </View>
        <View style={styles.counter}>
          <Text style={styles.counterLabel}>{currentUser?.vehicles.length ?? 0}</Text>
          <Text style={styles.counterText}>veículos</Text>
        </View>
      </View>

      <TextInput style={styles.input} value={plate} onChangeText={setPlate} placeholder="Placa" placeholderTextColor={colors.textMuted} autoCapitalize="characters" />
      <TextInput style={styles.input} value={brand} onChangeText={setBrand} placeholder="Marca" placeholderTextColor={colors.textMuted} />
      <TextInput style={styles.input} value={model} onChangeText={setModel} placeholder="Modelo" placeholderTextColor={colors.textMuted} />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.halfInput]} value={year} onChangeText={setYear} placeholder="Ano" placeholderTextColor={colors.textMuted} keyboardType="number-pad" />
        <TextInput style={[styles.input, styles.halfInput]} value={mileage} onChangeText={setMileage} placeholder="Quilometragem" placeholderTextColor={colors.textMuted} keyboardType="number-pad" />
      </View>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Adicionar veículo</Text>
      </Pressable>
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

      <View style={styles.list}>
        {currentUser?.vehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <Text style={styles.vehicleName}>{vehicle.brand} {vehicle.model}</Text>
              <Text style={styles.plate}>{vehicle.plate}</Text>
            </View>
            <Text style={styles.meta}>Ano {vehicle.year} • {vehicle.mileage.toLocaleString('pt-BR')} km</Text>
            <Text style={styles.status}>{vehicle.statusLabel}</Text>
          </View>
        ))}
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginTop: 4,
    maxWidth: 240,
  },
  counter: {
    minWidth: 80,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterLabel: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  counterText: {
    color: colors.textMuted,
    fontSize: 12,
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
  },
  list: {
    gap: 10,
  },
  vehicleCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 8,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  vehicleName: {
    color: colors.text,
    fontWeight: '700',
    flex: 1,
  },
  plate: {
    color: colors.primary,
    fontWeight: '800',
  },
  meta: {
    color: colors.textMuted,
  },
  status: {
    color: colors.success,
    fontWeight: '700',
  },
});
