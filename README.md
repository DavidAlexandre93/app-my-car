# Impacto Prime App

Aplicativo mobile desenvolvido com **React Native + Expo** para a **Impacto Prime (Taboão da Serra)**, com foco em experiência do cliente no pós-atendimento automotivo: acompanhamento de serviços, notificações e histórico de manutenção.

## 📌 Visão geral

O projeto demonstra um produto digital para oficinas mecânicas, centralizando a jornada do cliente em um único app:

- acompanhamento do status do serviço do veículo;
- solicitações de orçamento de peças/serviços;
- notificações transacionais e promocionais;
- histórico de manutenções por veículo.

## 🎯 Objetivos do produto

- Aumentar transparência durante a execução dos serviços;
- Reduzir atrito na comunicação oficina-cliente;
- Estimular recorrência de revisões e fidelização;
- Criar base evolutiva para integração com backend e painel administrativo.

## ✨ Funcionalidades do demo

- **Autenticação** (login/cadastro);
- **Gestão de veículos** (cadastro e listagem);
- **Dashboard/Home** com visão resumida do cliente;
- **Acompanhamento de serviço** com progresso por etapas;
- **Catálogo** de pneus, peças e serviços;
- **Solicitação de orçamento**;
- **Histórico de serviços**;
- **Notificações** (promoções, status e lembretes);
- **Perfil do usuário**.

## 🧱 Stack tecnológica

### Mobile

- React Native
- Expo SDK 53
- TypeScript
- React Navigation
- Zustand
- Axios

### Evolução planejada

- Firebase (Auth, Firestore, FCM) para MVP conectado;
- Backend Node.js (Express/NestJS) + PostgreSQL para escala;
- Painel administrativo web com React + Material UI.

## 🗂️ Estrutura do projeto

```text
src/
  components/
  config/
  hooks/
  navigation/
  screens/
  services/
  store/
  types/
  utils/
```

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js 18+
- npm 9+
- Expo CLI via `npx expo`

### Instalação

```bash
npm install
```

### Execução

```bash
npm run start
```

Também disponível:

```bash
npm run android
npm run ios
npm run web
```

## 🛠️ Scripts úteis

| Script | Descrição |
| --- | --- |
| `npm run start` | Inicia o bundler do Expo |
| `npm run start:expo-go` | Inicia com cache limpo (Expo Go) |
| `npm run android` | Abre no Android |
| `npm run ios` | Abre no iOS |
| `npm run web` | Abre no navegador |
| `npm run typecheck` | Executa checagem de tipos TypeScript |
| `npm run build:android:development` | Build Android development client |
| `npm run build:android:preview` | Build Android preview |
| `npm run build:android:production` | Build Android produção |
| `npm run build:android:production:ci` | Build Android produção (CI não interativo) |
| `npm run submit:android:production` | Submit Android para Play Console |
| `npm run build:ios:preview` | Build iOS preview |
| `npm run build:ios:production` | Build iOS produção |
| `npm run build:ios:submit` | Build iOS com auto-submit |
| `npm run credentials:ios` | Gerencia credenciais iOS no EAS |
| `npm run credentials:android` | Gerencia credenciais Android no EAS |

## 📦 Build e publicação (EAS)

O repositório está preparado para múltiplos perfis no EAS:

- `development`: desenvolvimento com client customizado;
- `preview`: distribuição interna;
- `production`: build de produção;
- `productionNoSubmit`: produção sem auto-submit (útil para CI).

> Para ambientes não interativos, garanta previamente as credenciais Android/iOS no Expo/EAS para evitar falhas de assinatura ou submissão.

## 📚 Documentação complementar

- [Especificação funcional detalhada](docs/requisitos-funcionais.md)
- [Configuração com app config](docs/configure-with-app-config.md)
- [Guia de build com EAS](docs/eas-build.md)

## 🗺️ Roadmap de evolução

- Integração com backend real (Auth, dados e notificações push);
- Painel administrativo web dedicado;
- Multiunidade e gestão avançada de serviços;
- Integração com ERP/CRM;
- Agendamento e aprovações digitais.

## 🤝 Contribuição

1. Faça um fork do projeto;
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`);
3. Commit das alterações (`git commit -m "feat: ..."`);
4. Abra um Pull Request.

## 📄 Licença

Este projeto está sob licença **MIT**. Consulte o arquivo [LICENSE](LICENSE).

## 👤 Autor

Desenvolvido por **David Fernandes**.
