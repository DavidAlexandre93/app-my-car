# Impacto Prime App

Aplicativo mobile desenvolvido em **React Native** para a **Impacto Prime: Taboão da Serra**, com foco em melhorar a experiência do cliente, digitalizar o acompanhamento de serviços automotivos e fortalecer a comunicação entre oficina e consumidor.

O projeto foi idealizado como uma **demo funcional** de uma solução para oficinas mecânicas, permitindo que clientes acompanhem o andamento do serviço do veículo, recebam notificações importantes, solicitem orçamentos de pneus, peças e serviços, consultem o histórico de manutenções e sejam lembrados periodicamente sobre novas revisões.

---

## Sumário

* [Visão geral](#visão-geral)
* [Objetivo do projeto](#objetivo-do-projeto)
* [Problema que o app resolve](#problema-que-o-app-resolve)
* [Solução proposta](#solução-proposta)
* [Principais funcionalidades](#principais-funcionalidades)
* [Fluxos principais do usuário](#fluxos-principais-do-usuário)
* [Telas do aplicativo](#telas-do-aplicativo)
* [Painel administrativo](#painel-administrativo)
* [Arquitetura da solução](#arquitetura-da-solução)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Estrutura do projeto](#estrutura-do-projeto)
* [Modelagem inicial de entidades](#modelagem-inicial-de-entidades)
* [Requisitos funcionais](#requisitos-funcionais)
* [Requisitos não funcionais](#requisitos-não-funcionais)
* [Protótipo de jornadas](#protótipo-de-jornadas)
* [Notificações do sistema](#notificações-do-sistema)
* [Possíveis integrações futuras](#possíveis-integrações-futuras)
* [Diferenciais do projeto](#diferenciais-do-projeto)
* [MVP do projeto](#mvp-do-projeto)
* [Como executar o projeto](#como-executar-o-projeto)
* [Scripts úteis](#scripts-úteis)
* [Roadmap](#roadmap)
* [Melhorias futuras](#melhorias-futuras)
* [Contribuição](#contribuição)
* [Licença](#licença)
* [Autor](#autor)

---

## Visão geral

A proposta deste aplicativo é oferecer aos clientes da **Impacto Prime** uma experiência digital moderna, prática e transparente no relacionamento com a oficina.

Por meio do app, o cliente pode:

* acompanhar o status do serviço do seu veículo em tempo real;
* receber notificações quando o carro estiver pronto para retirada;
* visualizar promoções e campanhas da oficina;
* solicitar orçamento para pneus, peças e serviços;
* consultar o histórico de serviços realizados em seu veículo;
* receber lembretes periódicos para nova revisão preventiva.

Além da experiência do cliente, o sistema também prevê uma área administrativa para que a oficina gerencie os atendimentos, atualize o status dos serviços, receba pedidos de orçamento e envie notificações.

### Objetivo resumido do aplicativo

**Cliente**

* receber notificações de promoções;
* acompanhar o status do serviço do carro em tempo real;
* ser notificado quando o veículo estiver pronto para retirada;
* consultar e solicitar orçamento de pneus, peças e serviços;
* visualizar o histórico de serviços realizados;
* receber lembretes periódicos de revisão, como a cada 3 meses.

**Empresa / área administrativa**

* gerenciar atendimentos;
* controlar orçamentos;
* atualizar status de serviços;
* disparar notificações promocionais, transacionais e recorrentes.

---

## Objetivo do projeto

O principal objetivo deste projeto é demonstrar, por meio de uma aplicação mobile, como uma oficina mecânica pode melhorar seus processos internos e sua comunicação com o cliente através da tecnologia.

A solução busca:

* aumentar a transparência durante o serviço do veículo;
* melhorar a experiência do cliente;
* gerar recorrência com lembretes de revisão;
* aumentar vendas de pneus, peças e serviços adicionais;
* centralizar informações de manutenção do veículo;
* facilitar o contato entre cliente e oficina.

---

## Problema que o app resolve

Em muitas oficinas, o processo de atendimento ainda depende de ligações, mensagens manuais e acompanhamento informal. Isso pode gerar dúvidas, atrasos na comunicação e baixa fidelização do cliente.

Os principais problemas mapeados são:

* falta de visibilidade sobre o andamento do serviço;
* dificuldade em comunicar promoções e campanhas;
* falta de histórico organizado por veículo;
* processo manual para solicitar orçamentos;
* ausência de lembretes automáticos de revisão;
* comunicação descentralizada entre cliente e oficina.

---

## Solução proposta

O **Impacto Prime App** propõe uma plataforma mobile para aproximar o cliente da oficina, centralizando informações importantes sobre manutenção automotiva, comunicação, vendas e relacionamento.

A solução é composta por:

* **Aplicativo do cliente** em React Native com **Expo**, **TypeScript**, **React Navigation**, **Axios** e **Zustand**;
* **Painel administrativo** em **React.js** com **Material UI**;
* **Backend/API** preferencialmente em **Firebase** para a demo inicial, com trilha de evolução para **Node.js + Express ou NestJS**;
* **Sistema de notificações push** com **Firebase Cloud Messaging (FCM)**;
* **Autenticação** com **Firebase Auth** no protótipo, preservando compatibilidade com **JWT** em uma futura API própria.

---

## Principais funcionalidades

### 1. Cadastro e autenticação

O cliente pode:

* criar conta;
* realizar login;
* recuperar acesso;
* editar seus dados cadastrais.

### 2. Cadastro de veículos

Cada cliente pode cadastrar um ou mais veículos com informações como:

* placa;
* modelo;
* marca;
* ano;
* quilometragem;
* observações.

### 3. Promoções e campanhas

A oficina pode divulgar promoções no aplicativo, como:

* troca de óleo;
* alinhamento e balanceamento;
* revisão preventiva;
* pneus em oferta;
* campanhas sazonais.

### 4. Acompanhamento de serviço

O cliente pode acompanhar o status do serviço do carro por etapas.

Exemplo de fluxo de status:

* veículo recebido;
* em análise;
* orçamento em preparação;
* aguardando aprovação;
* serviço em execução;
* finalizado;
* pronto para retirada.

### 5. Notificação de retirada

Quando o serviço for concluído, o cliente recebe uma notificação informando que o veículo está pronto para ser retirado. A mensagem também pode apresentar valor final, horário de funcionamento da unidade e observações do técnico para dar mais contexto no momento da retirada.

### 6. Catálogo de pneus e peças

O app disponibiliza uma área de consulta de produtos e serviços com categorias como:

* pneus;
* baterias;
* freios;
* filtros;
* lubrificantes;
* peças em geral.

### 7. Solicitação de orçamento

O usuário pode selecionar produtos ou serviços e enviar uma solicitação de orçamento para a equipe administrativa da oficina.

### 8. Histórico de serviços

O cliente pode acessar o histórico completo de serviços realizados em cada veículo cadastrado.

### 9. Lembrete de revisão periódica

O sistema pode notificar o cliente a cada 3 meses para lembrar sobre a necessidade de nova revisão.

---

## Fluxos principais do usuário

### Fluxo 1 — acompanhamento do serviço

1. Cliente leva o carro à oficina.
2. Admin cadastra entrada do veículo.
3. Status é atualizado no sistema.
4. Cliente acompanha pelo app.
5. Quando finalizar, recebe notificação de retirada.

### Fluxo 2 — solicitação de orçamento

1. Cliente entra na área de pneus/peças.
2. Seleciona item ou serviço.
3. Clica em solicitar orçamento.
4. Pedido vai para o admin.
5. Admin analisa e responde.

### Fluxo 3 — revisão periódica

1. Serviço concluído e salvo no histórico.
2. Sistema registra data da última revisão.
3. Após 3 meses, cliente recebe lembrete automático.

---

## Telas do aplicativo

### Splash Screen

Tela inicial com logo da Impacto Prime.

### Login

Tela de autenticação do usuário.

### Cadastro

Tela para criação de conta.

### Home

Tela inicial do app com:

* destaques promocionais;
* atalhos rápidos;
* status de serviços ativos;
* lembretes e notificações.

### Meus veículos

Tela para listar e cadastrar veículos.

### Acompanhamento do serviço

Tela com status atualizado, observações e progresso do atendimento.

### Loja / Catálogo

Tela com pneus, peças e serviços em geral.

### Solicitar orçamento

Formulário para envio de pedido de orçamento.

### Histórico de serviços

Tela com os registros anteriores de manutenção do veículo.

### Notificações

Tela com alertas, promoções e lembretes.

### Perfil

Tela com dados do cliente e preferências.

---

## Painel administrativo

Além do aplicativo para o cliente, a solução prevê um painel administrativo para a oficina, com funcionalidades como:

* cadastro e gerenciamento de clientes;
* cadastro de veículos;
* atualização do status dos serviços;
* recebimento e gestão de solicitações de orçamento;
* publicação de promoções;
* envio de notificações;
* gerenciamento do catálogo de pneus e peças;
* consulta ao histórico de serviços.

Esse painel pode ser implementado como aplicação web em React.

---

## Arquitetura da solução

Para atender ao stack solicitado e acelerar a entrega de uma demo funcional, a arquitetura recomendada para este projeto fica assim:

### Mobile do cliente

* **React Native**
* **Expo** para acelerar setup, builds e testes do MVP
* **TypeScript** para tipagem e manutenção
* **React Navigation** para fluxo entre autenticação, home, veículos, status, histórico e perfil
* **Axios** para padronizar comunicação com API/serviços
* **Zustand** para estado global leve, simples e fácil de escalar

### Backend do MVP

Para a primeira demo, a opção mais rápida e adequada é:

* **Firebase**
* **Firestore** para persistência inicial
* **Firebase Auth** para login/cadastro
* **Firebase Cloud Messaging (FCM)** para notificações de promoções, carro pronto e lembretes

### Evolução para produção

Quando o projeto exigir regras mais complexas, integrações com ERP, multiunidade, auditoria, filas e relatórios, a evolução natural é:

* **Node.js + Express** ou **NestJS**
* **PostgreSQL**
* **JWT** para autenticação desacoplada do provedor mobile

### Painel administrativo

Para o time interno da oficina, o recomendado é um painel separado em:

* **React.js**
* **Material UI**

Esse painel deve compartilhar a mesma fonte de dados do app mobile e permitir:

* cadastro e atualização de serviços;
* resposta a solicitações de orçamento;
* publicação de promoções;
* envio de campanhas;
* acompanhamento do histórico dos clientes;
* gestão de veículos, atendimentos e notificações.

### Decisão recomendada para esta fase

Como o objetivo do projeto é uma **demo funcional rápida**, a recomendação principal é:

* **React Native + Expo + TypeScript** no app;
* **React Navigation** para navegação;
* **Axios** para camada de requests;
* **Zustand** para estado global;
* **Firebase + Firestore + Firebase Auth + FCM** no backend do MVP;
* **React.js + Material UI** no painel administrativo.

Assim, o projeto atende ao stack solicitado com menor tempo de implementação e mantém um caminho claro para migrar depois para **Node.js/NestJS + PostgreSQL + JWT** se necessário.

## Tecnologias utilizadas

### Mobile

* React Native
* Expo
* TypeScript
* React Navigation
* Axios
* Zustand

### Backend do protótipo

* Firebase
* Firestore
* Firebase Auth
* Firebase Cloud Messaging (FCM)

### Backend de evolução

* Node.js
* Express ou NestJS
* PostgreSQL
* JWT

### Painel administrativo

* React.js
* Material UI

## Estrutura do projeto

```text
src/
  assets/
  components/
  screens/
    Splash/
    Login/
    Register/
    Home/
    Vehicles/
    ServiceStatus/
    Catalog/
    QuoteRequest/
    History/
    Notifications/
    Profile/
  navigation/
  services/
    api/
    auth/
    notifications/
  hooks/
  store/
  types/
  utils/
```

### Descrição das pastas

* **assets/**: imagens, ícones, logos e recursos visuais.
* **components/**: componentes reutilizáveis da interface.
* **screens/**: telas da aplicação.
* **navigation/**: configuração de rotas e navegação.
* **services/**: chamadas para API, autenticação e notificações.
* **hooks/**: hooks customizados.
* **store/**: gerenciamento de estado global.
* **types/**: tipagens e interfaces TypeScript.
* **utils/**: funções auxiliares.

---

## Modelagem inicial de entidades

### Cliente

* id
* nome
* email
* telefone
* senha
* dataCriacao

### Veículo

* id
* clienteId
* placa
* marca
* modelo
* ano
* quilometragem
* observacoes

### Serviço

* id
* veiculoId
* titulo
* descricao
* status
* dataEntrada
* dataConclusao
* valorEstimado
* valorFinal

### Histórico de serviço

* id
* servicoId
* veiculoId
* descricao
* dataExecucao
* observacoes

### Produto

* id
* nome
* categoria
* descricao
* preco
* imagem
* estoque

### Solicitação de orçamento

* id
* clienteId
* veiculoId
* tipo
* descricao
* status
* dataSolicitacao

### Promoção

* id
* titulo
* descricao
* imagem
* dataInicio
* dataFim

### Notificação

* id
* clienteId
* titulo
* mensagem
* tipo
* lida
* dataEnvio

---

## Requisitos funcionais

Os requisitos funcionais definidos para o aplicativo são:

* **RF01:** o sistema deve permitir cadastro e login de clientes.
* **RF02:** o sistema deve permitir cadastrar veículos vinculados ao cliente.
* **RF03:** o sistema deve exibir promoções enviadas pela oficina.
* **RF04:** o sistema deve permitir acompanhar o status do serviço do veículo.
* **RF05:** o sistema deve notificar quando o veículo estiver pronto para retirada.
* **RF06:** o sistema deve exibir catálogo de pneus e peças.
* **RF07:** o sistema deve permitir solicitar orçamento de produtos e serviços.
* **RF08:** o sistema deve enviar a solicitação de orçamento para o administrador.
* **RF09:** o sistema deve mostrar o histórico de serviços do veículo.
* **RF10:** o sistema deve enviar lembrete de revisão periódica a cada 3 meses.

### Matriz de rastreabilidade dos requisitos

| Requisito | Implementação demonstrada | Evidência no app demo |
| --- | --- | --- |
| RF01 | Cadastro e login do cliente | Jornada inicial e card de autenticação na home |
| RF02 | Cadastro e listagem de veículos vinculados | Seção **Meus veículos** |
| RF03 | Promoções publicadas pela oficina | Seção **Promoções e campanhas** |
| RF04 | Timeline do serviço em andamento | Cards de **Serviço ativo** |
| RF05 | Aviso de retirada | Notificação do tipo **pickup** |
| RF06 | Catálogo de pneus, peças e serviços | Seção **Loja / catálogo** |
| RF07 | Solicitação de orçamento pelo cliente | Formulário **Solicitar orçamento** |
| RF08 | Encaminhamento para administração | Mock API + seção **Painel administrativo** |
| RF09 | Histórico de manutenção por veículo | Seção **Histórico de serviços** |
| RF10 | Lembrete trimestral de revisão | Notificação do tipo **revision** |

## Requisitos não funcionais

* App multiplataforma com React Native.
* Interface simples e intuitiva.
* Tempo de resposta rápido.
* Segurança de dados e autenticação.
* Notificações push.
* Integração com backend via API REST.
* Escalável para futuras funcionalidades.

---

## Protótipo de jornadas

### Jornada do cliente

* cria conta;
* cadastra veículo;
* acompanha serviço;
* solicita orçamento;
* consulta histórico;
* recebe promoções e lembretes.

### Jornada do administrador

* cadastra cliente e veículo;
* atualiza status do serviço;
* responde solicitação de orçamento;
* publica promoções;
* dispara notificações.

---

## Notificações do sistema

O sistema poderá trabalhar com diferentes tipos de notificação:

* **Promoções:** ofertas e campanhas da oficina.
* **Status do serviço:** mudança de etapa do atendimento.
* **Retirada do veículo:** aviso de conclusão.
* **Revisão periódica:** lembrete automático após 3 meses.
* **Retorno de orçamento:** resposta da equipe administrativa.

### Notificações de promoções

A empresa poderá enviar promoções como:

* troca de óleo com desconto;
* alinhamento e balanceamento em promoção;
* ofertas de pneus;
* revisão preventiva;
* campanhas sazonais.

**Exemplo de notificação**

> Impacto Prime: revisão completa com 15% de desconto nesta semana. Aproveite!

**Tecnologia sugerida:** Firebase Cloud Messaging (FCM) para push notifications.

---

## Possíveis integrações futuras

* WhatsApp para comunicação direta com o cliente;
* gateway de pagamento;
* integração com ERP da oficina;
* geolocalização e rota até a oficina;
* agendamento online de serviços;
* assinatura digital de aprovação de orçamento;
* histórico com anexos de fotos e laudos.

---

## Diferenciais do projeto

* aumenta a confiança do cliente;
* melhora a comunicação entre oficina e consumidor;
* gera mais retorno com promoções e revisões recorrentes;
* organiza o histórico do veículo;
* digitaliza o processo de orçamento e acompanhamento.

---

## MVP do projeto

A versão inicial do projeto pode focar em:

* autenticação;
* cadastro de veículo;
* home com promoções;
* acompanhamento de serviço;
* notificação de retirada;
* catálogo simplificado;
* solicitação de orçamento;
* histórico de serviços;
* lembrete de revisão.

---

## Status atual do demo implementado

A versão atual do app demonstra em uma experiência única de dashboard os principais pontos do projeto pedido para a **Impacto Prime: Taboão da Serra**:

* hero inicial com branding da unidade e próxima revisão do cliente;
* resumo do MVP com indicadores de negócio;
* jornada do cliente com login/cadastro, atalhos e múltiplos veículos;
* acompanhamento do serviço com timeline visual;
* promoções, catálogo e fluxo de solicitação de orçamento;
* histórico de serviços, notificações e visão resumida do painel administrativo.

Essa abordagem mantém o demo simples para apresentação, sem exigir backend real neste estágio, mas já organiza o front-end para futura integração com API REST, Firebase ou backend Node.js.

---

## Como executar o projeto

### Pré-requisitos

* Node.js 18+
* npm ou yarn
* Expo CLI via `npx expo`

### Instalação

```bash
npm install
```

> Observação: o `package.json` já está preparado para o stack solicitado, incluindo `React Navigation`, `Axios` e `Zustand`.

### Executar o app

```bash
npm run start
```

Depois, você pode abrir em:

* Android Emulator
* iOS Simulator
* Expo Go
* navegador com `npm run web`

### Configuração do Expo / EAS

O projeto já está vinculado ao EAS com o `projectId` `c15bbf4a-6423-4579-b407-ab4020da5bfd` no `app.json`, então você não precisa rodar novamente o `eas init` para conectar este app ao painel do Expo.

Se quiser publicar builds depois, use por exemplo:

```bash
npx eas build --platform android
npx eas build --platform ios
```

### Stack alvo do MVP

Para seguir exatamente a stack pedida, a próxima etapa de implementação deve conectar esta interface a:

* Firebase Auth
* Firestore
* Firebase Cloud Messaging
* painel admin em React.js com Material UI

## Scripts úteis

```bash
npm start
npm run android
npm run ios
npm run web
```

> Os scripts podem variar conforme a configuração adotada no projeto.

---

## Roadmap

### Fase 1

* definição do escopo;
* modelagem das telas;
* criação do fluxo do cliente.

### Fase 2

* desenvolvimento da interface mobile;
* implementação de autenticação;
* cadastro de veículos;
* tela de acompanhamento do serviço.

### Fase 3

* integração com backend;
* solicitação de orçamento;
* histórico de serviços;
* notificações push.

### Fase 4

* criação do painel administrativo;
* integração entre app e admin;
* refinamento visual;
* preparação da demo.

---

## Melhorias futuras

* múltiplas oficinas/filiais;
* chat interno entre cliente e oficina;
* aprovação digital de orçamento;
* pagamento pelo app;
* agendamento de revisões;
* recomendação de serviços com base em quilometragem;
* upload de fotos do veículo e peças;
* programa de fidelidade.

---

## Contribuição

Este projeto foi desenvolvido como proposta demo. Sugestões, melhorias e adaptações podem ser feitas de acordo com a evolução do produto.

Caso o projeto evolua para desenvolvimento colaborativo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature.
3. Realize os commits.
4. Abra um Pull Request.

---

## Licença

Este projeto pode ser definido com a licença mais adequada conforme o objetivo do repositório.

Exemplo:

```text
MIT License
```

---

## Autor

Desenvolvido por **David Fernandes**.

Projeto demo criado para apresentar uma solução digital para a oficina **Impacto Prime: Taboão da Serra**.

---

## Observações finais

Este repositório representa a proposta de um aplicativo voltado para o setor automotivo, com foco em experiência do cliente, organização operacional e comunicação inteligente entre oficina e consumidor.

A estrutura apresentada pode ser utilizada tanto como base para um MVP quanto como ponto de partida para um produto real, escalável e preparado para evolução futura.
