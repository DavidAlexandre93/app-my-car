import { create } from 'zustand';
import { AuthUser, CustomerProfile, LoginPayload, RegisterPayload, Vehicle, VehiclePayload } from '../types';

type AuthStore = {
  users: AuthUser[];
  currentUser: AuthUser | null;
  register: (payload: RegisterPayload) => { success: boolean; message: string };
  login: (payload: LoginPayload) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (payload: CustomerProfile) => { success: boolean; message: string };
  addVehicle: (payload: VehiclePayload) => { success: boolean; message: string };
};

const initialUser: AuthUser = {
  id: 'customer-1',
  name: 'Lucas Martins',
  phone: '(11) 98888-1234',
  email: 'lucas@impactoprime.app',
  password: '123456',
  vehicles: [
    {
      id: 'veh-1',
      plate: 'BRA2E19',
      brand: 'Jeep',
      model: 'Compass Longitude',
      year: 2021,
      mileage: 48210,
      notes: 'Cliente prefere contato via WhatsApp após 18h.',
      statusLabel: 'Em atendimento',
    },
  ],
};

const normalizePlate = (plate: string) => plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

const isVehiclePayloadValid = (payload: VehiclePayload) => {
  const normalizedPlate = normalizePlate(payload.plate);
  const year = Number(payload.year);
  const mileage = Number(payload.mileage);

  return Boolean(normalizedPlate && payload.brand.trim() && payload.model.trim() && year && !Number.isNaN(mileage));
};

const createVehicleFromPayload = (payload: VehiclePayload): Vehicle | null => {
  if (!isVehiclePayloadValid(payload)) {
    return null;
  }

  const normalizedPlate = normalizePlate(payload.plate);
  const year = Number(payload.year);
  const mileage = Number(payload.mileage);

  return {
    id: `vehicle-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    plate: normalizedPlate,
    brand: payload.brand.trim(),
    model: payload.model.trim(),
    year,
    mileage,
    notes: 'Cadastro realizado pelo cliente no aplicativo.',
    statusLabel: 'Aguardando atendimento',
  };
};

export const useAuthStore = create<AuthStore>((set) => ({
  users: [initialUser],
  currentUser: null,
  register: (payload) => {
    const email = payload.email.trim().toLowerCase();

    if (!payload.name.trim() || !payload.phone.trim() || !email || !payload.password.trim()) {
      return { success: false, message: 'Preencha nome, telefone, e-mail e senha para criar sua conta.' };
    }

    if (payload.vehicle && !isVehiclePayloadValid(payload.vehicle)) {
      return {
        success: false,
        message: 'Para cadastrar o primeiro veículo, informe placa, marca, modelo, ano e quilometragem válidos.',
      };
    }

    let created = false;
    let message = 'Conta criada com sucesso.';

    set((state) => {
      const exists = state.users.some((user) => user.email.toLowerCase() === email);
      if (exists) {
        message = 'Já existe uma conta cadastrada com este e-mail.';
        return state;
      }

      const firstVehicle = payload.vehicle ? createVehicleFromPayload(payload.vehicle) : null;
      const newUser: AuthUser = {
        id: `customer-${Date.now()}`,
        name: payload.name.trim(),
        phone: payload.phone.trim(),
        email,
        password: payload.password,
        vehicles: firstVehicle ? [firstVehicle] : [],
      };

      created = true;
      message = firstVehicle
        ? 'Conta criada com sucesso e primeiro veículo vinculado ao cliente.'
        : 'Conta criada com sucesso.';

      return {
        users: [...state.users, newUser],
        currentUser: newUser,
      };
    });

    return { success: created, message };
  },
  login: (payload) => {
    const email = payload.email.trim().toLowerCase();
    let success = false;
    let message = 'E-mail ou senha inválidos.';

    set((state) => {
      const user = state.users.find(
        (item) => item.email.toLowerCase() === email && item.password === payload.password,
      );

      if (!user) {
        return state;
      }

      success = true;
      message = `Bem-vindo, ${user.name.split(' ')[0]}!`;
      return {
        currentUser: user,
      };
    });

    return { success, message };
  },
  logout: () => set({ currentUser: null }),
  updateProfile: (payload) => {
    let success = false;
    let message = 'Faça login para atualizar os dados do cliente.';

    set((state) => {
      if (!state.currentUser) {
        return state;
      }

      const updatedUser = {
        ...state.currentUser,
        name: payload.name.trim(),
        phone: payload.phone.trim(),
        email: payload.email.trim().toLowerCase(),
      };

      success = true;
      message = 'Dados do cliente atualizados com sucesso.';

      return {
        currentUser: updatedUser,
        users: state.users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      };
    });

    return { success, message };
  },
  addVehicle: (payload) => {
    const vehicle = createVehicleFromPayload(payload);

    if (!vehicle) {
      return { success: false, message: 'Informe placa, marca, modelo, ano e quilometragem válidos.' };
    }

    let success = false;
    let message = 'Veículo cadastrado com sucesso.';

    set((state) => {
      if (!state.currentUser) {
        message = 'Faça login para cadastrar um veículo.';
        return state;
      }

      const alreadyExists = state.currentUser.vehicles.some((item) => item.plate === vehicle.plate);
      if (alreadyExists) {
        message = 'Este veículo já está cadastrado para este cliente.';
        return state;
      }

      const updatedUser = {
        ...state.currentUser,
        vehicles: [...state.currentUser.vehicles, vehicle],
      };

      success = true;
      return {
        currentUser: updatedUser,
        users: state.users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      };
    });

    return { success, message };
  },
}));
