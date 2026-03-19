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

* **Aplicativo do cliente** em React Native;
* **Painel administrativo** para gestão das operações;
* **Backend/API** para integração de dados;
* **Sistema de notificações push** para alertas e promoções.

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

Quando o serviço for concluído, o cliente recebe uma notificação informando que o veículo está pronto para ser retirado.

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

### Fluxo 1: acompanhar serviço do veículo

1. O cliente leva o veículo até a oficina.
2. A equipe registra a entrada do carro no sistema.
3. O status do atendimento é atualizado ao longo do processo.
4. O cliente acompanha as etapas pelo aplicativo.
5. Ao final, recebe a notificação de retirada.

### Fluxo 2: solicitar orçamento

1. O cliente acessa a área de produtos e serviços.
2. Seleciona um item ou tipo de serviço.
3. Preenche os detalhes da solicitação.
4. Envia o pedido para a equipe administrativa.
5. A oficina analisa e entra em contato com o cliente.

### Fluxo 3: consultar histórico de manutenção

1. O cliente acessa a área de histórico.
2. Seleciona o veículo desejado.
3. Visualiza todos os serviços já realizados, com data e descrição.

### Fluxo 4: lembrete de revisão

1. A oficina finaliza um serviço no sistema.
2. O app registra a data da última manutenção.
3. Após 3 meses, o cliente recebe uma notificação sugerindo nova revisão.

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

A arquitetura sugerida para o projeto é dividida em três partes principais:

### 1. App Mobile

Responsável pela experiência do cliente.

### 2. Backend / API

Responsável por:

* autenticação;
* persistência de dados;
* regras de negócio;
* comunicação com o painel administrativo;
* disparo de notificações.

### 3. Painel Administrativo

Responsável pela operação da oficina e atualização das informações mostradas no app.

### Fluxo geral

```text
Cliente (App React Native)
        ↓
     API / Backend
        ↓
Banco de dados + Serviço de notificações
        ↑
Painel Admin (Web)
```

---

## Tecnologias utilizadas

### Mobile

* React Native
* Expo
* TypeScript
* React Navigation
* Axios
* React Query, Zustand ou Redux

### Backend

* Node.js
* Express ou NestJS
* JWT para autenticação
* Firebase Cloud Messaging para notificações

### Banco de dados

* PostgreSQL
  ou
* Firebase Firestore

### Admin

* React.js
* Ant Design ou Material UI

### Infraestrutura

* GitHub
* Vercel para landing page e/ou painel web
* Expo para pré-visualização mobile

---

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

* Permitir cadastro e autenticação de usuários.
* Permitir cadastro de um ou mais veículos por cliente.
* Exibir promoções e campanhas publicadas pela oficina.
* Mostrar o andamento do serviço do veículo.
* Notificar o cliente quando o veículo estiver pronto para retirada.
* Exibir um catálogo de pneus, peças e serviços.
* Permitir solicitar orçamento.
* Enviar a solicitação de orçamento ao administrador.
* Exibir histórico de manutenções realizadas.
* Enviar lembretes de revisão a cada 3 meses.

---

## Requisitos não funcionais

* Aplicação multiplataforma.
* Interface intuitiva e responsiva.
* Segurança no tráfego de dados.
* Suporte a notificações push.
* Escalabilidade para novas funcionalidades.
* Código organizado e de fácil manutenção.
* Compatibilidade com Android e iOS.

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

* acompanhamento do serviço em tempo real;
* centralização do histórico do veículo;
* comunicação mais clara entre cliente e oficina;
* estímulo à recorrência com lembretes de revisão;
* aumento de oportunidades de venda com catálogo e promoções;
* proposta moderna e escalável para oficinas mecânicas.

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

## Como executar o projeto

### Pré-requisitos

* Node.js instalado
* npm ou yarn
* Expo CLI ou ambiente Expo configurado
* emulador Android/iOS ou dispositivo físico com Expo Go

### Instalação

```bash
git clone <URL_DO_REPOSITORIO>
cd impacto-prime-app
npm install
```

### Executando o projeto

```bash
npm start
```

ou

```bash
npx expo start
```

Após iniciar, será possível:

* abrir no navegador;
* abrir no emulador;
* escanear o QR Code com o Expo Go no celular.

---

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
