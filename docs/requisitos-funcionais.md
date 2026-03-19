# Especificação funcional

Este documento detalha os requisitos funcionais do aplicativo **Impacto Prime App**, complementando a visão resumida apresentada no `README.md`.

## Objetivo

Transformar os requisitos RF01–RF10 em uma referência prática para:

- alinhamento entre produto, design e desenvolvimento;
- validação da demo e evolução para MVP;
- definição de critérios mínimos de aceite;
- rastreabilidade entre funcionalidade esperada e evidência no app.

## Perfis envolvidos

### Cliente

Usuário final do aplicativo que consulta informações do veículo, acompanha serviços, solicita orçamento e recebe notificações.

### Administrador da oficina

Responsável por receber solicitações, atualizar serviços, publicar promoções e acionar notificações transacionais e recorrentes.

## Requisitos funcionais detalhados

### RF01 — Cadastro e login de clientes

**Descrição:** o sistema deve permitir cadastro e login de clientes.

**Regras de negócio**
- O cliente deve conseguir criar conta com dados básicos de identificação e contato.
- O cliente deve conseguir autenticar-se para acessar informações personalizadas.
- O sistema deve manter o vínculo entre o usuário autenticado e seus veículos, notificações e histórico.

**Critérios de aceite**
- Dado que o cliente ainda não possui conta, quando preencher os dados obrigatórios, então o sistema deve permitir o cadastro.
- Dado que o cliente possui credenciais válidas, quando realizar login, então deve acessar a área autenticada do app.
- Dado que o cliente está autenticado, quando retornar ao aplicativo, então seus dados devem aparecer vinculados ao perfil correto.

### RF02 — Cadastro de veículos vinculados ao cliente

**Descrição:** o sistema deve permitir cadastrar veículos vinculados ao cliente.

**Regras de negócio**
- Um cliente pode possuir um ou mais veículos.
- Cada veículo deve conter ao menos identificação suficiente para atendimento, como placa, modelo e ano.
- O veículo deve ser associado ao cliente autenticado.

**Critérios de aceite**
- Dado que o cliente está autenticado, quando cadastrar um veículo com dados válidos, então o veículo deve aparecer em sua lista.
- Dado que o cliente possui mais de um veículo, quando acessar a área de veículos, então deve visualizar todos os vínculos cadastrados.
- Dado que um orçamento ou serviço é aberto, quando o cliente selecionar um veículo, então o registro deve ficar associado ao veículo escolhido.

### RF03 — Exibição de promoções enviadas pela oficina

**Descrição:** o sistema deve exibir promoções enviadas pela oficina.

**Regras de negócio**
- Promoções podem ser campanhas comerciais, descontos ou ofertas sazonais.
- As promoções devem ser disponibilizadas para consulta no app.
- O conteúdo promocional pode conter título, descrição, vigência e chamada para ação.

**Critérios de aceite**
- Dado que existam promoções ativas, quando o cliente acessar a seção promocional, então deve visualizar a lista de campanhas.
- Dado que uma promoção possua período de vigência, quando estiver expirada, então não deve ser priorizada como campanha ativa.
- Dado que a oficina publique uma nova campanha, quando o app sincronizar os dados, então a promoção deve ficar disponível para o cliente.

### RF04 — Acompanhamento do status do serviço do veículo

**Descrição:** o sistema deve permitir acompanhar o status do serviço do veículo.

**Regras de negócio**
- O serviço deve possuir etapas claras, como recepção, análise, aprovação, execução e finalização.
- O cliente deve consultar o status do serviço por veículo.
- O histórico de atualização deve ser exibido de forma compreensível para reduzir dúvidas no atendimento.

**Critérios de aceite**
- Dado que exista um serviço em andamento, quando o cliente acessar o veículo correspondente, então deve ver o status atual.
- Dado que a oficina atualize a etapa do serviço, quando os dados forem sincronizados, então o novo status deve ser mostrado ao cliente.
- Dado que o cliente consulte um serviço concluído, quando abrir os detalhes, então deve entender a sequência de etapas realizadas.

### RF05 — Notificação de veículo pronto para retirada

**Descrição:** o sistema deve notificar quando o veículo estiver pronto para retirada.

**Regras de negócio**
- A oficina deve conseguir sinalizar a conclusão do atendimento.
- O sistema deve gerar uma notificação específica para retirada do veículo.
- A mensagem deve ser apresentada de forma destacada na central de notificações.

**Critérios de aceite**
- Dado que o serviço seja finalizado, quando o administrador marcar o veículo como liberado, então o cliente deve receber um aviso de retirada.
- Dado que o cliente abra a central de notificações, quando houver um aviso de retirada, então ele deve aparecer identificado como prioridade operacional.
- Dado que o cliente visualize a notificação, quando consultar os detalhes do veículo, então o status deve ser coerente com a liberação para retirada.

### RF06 — Catálogo de pneus e peças

**Descrição:** o sistema deve exibir catálogo de pneus e peças.

**Regras de negócio**
- O catálogo deve listar itens comercializados pela oficina, incluindo pneus, peças e serviços relacionados.
- Os itens devem conter informações suficientes para avaliação inicial, como nome, categoria, preço de referência e disponibilidade.
- O catálogo deve apoiar tanto consulta quanto início de uma solicitação de orçamento.

**Critérios de aceite**
- Dado que o cliente acesse a área de catálogo, quando houver itens disponíveis, então deve visualizar os produtos listados.
- Dado que existam categorias diferentes, quando o cliente navegar pelo catálogo, então deve conseguir distinguir pneus, peças e serviços.
- Dado que o cliente tenha interesse em um item, quando iniciar o pedido, então o item deve poder alimentar uma solicitação de orçamento.

### RF07 — Solicitação de orçamento de produtos e serviços

**Descrição:** o sistema deve permitir solicitar orçamento de produtos e serviços.

**Regras de negócio**
- A solicitação deve ser iniciada pelo cliente com seleção do veículo e descrição da necessidade.
- O pedido pode incluir itens do catálogo ou uma descrição livre do problema/serviço desejado.
- O sistema deve registrar o pedido para acompanhamento posterior.

**Critérios de aceite**
- Dado que o cliente esteja autenticado, quando preencher a solicitação com veículo e necessidade, então o pedido deve ser registrado.
- Dado que o cliente escolha um item do catálogo, quando enviar o pedido, então o item deve constar na solicitação.
- Dado que a solicitação seja enviada, quando o cliente consultar seu andamento, então deve existir um protocolo ou registro correspondente.

### RF08 — Envio da solicitação de orçamento para o administrador

**Descrição:** o sistema deve enviar a solicitação de orçamento para o administrador.

**Regras de negócio**
- Toda solicitação aberta pelo cliente deve entrar no fluxo administrativo.
- O administrador deve conseguir visualizar os pedidos recebidos e seus dados principais.
- O encaminhamento deve preservar vínculo com cliente, veículo e itens solicitados.

**Critérios de aceite**
- Dado que o cliente envie uma solicitação de orçamento, quando o fluxo for processado, então o pedido deve aparecer na área administrativa.
- Dado que o administrador consulte os pedidos recebidos, quando abrir uma solicitação, então deve ver cliente, veículo e necessidade informada.
- Dado que o pedido tenha sido recebido, quando o administrador iniciar atendimento, então o registro deve continuar rastreável pelo protocolo gerado.

### RF09 — Histórico de serviços do veículo

**Descrição:** o sistema deve mostrar o histórico de serviços do veículo.

**Regras de negócio**
- O histórico deve ser organizado por veículo.
- Cada registro deve informar ao menos data, tipo de serviço e resumo do atendimento.
- O histórico deve servir de referência para manutenção futura e relacionamento com o cliente.

**Critérios de aceite**
- Dado que um veículo possua atendimentos anteriores, quando o cliente acessar o histórico, então deve visualizar os registros existentes.
- Dado que o cliente possua mais de um veículo, quando alternar entre eles, então o histórico exibido deve refletir somente o veículo selecionado.
- Dado que um novo serviço seja concluído, quando os dados forem consolidados, então ele deve poder compor o histórico do veículo.

### RF10 — Lembrete de revisão periódica a cada 3 meses

**Descrição:** o sistema deve enviar lembrete de revisão periódica a cada 3 meses.

**Regras de negócio**
- O sistema deve controlar uma cadência recorrente de manutenção preventiva.
- O lembrete deve considerar o cliente e o veículo elegível para revisão.
- A comunicação deve incentivar o retorno do cliente para nova avaliação.

**Critérios de aceite**
- Dado que um veículo esteja elegível para revisão periódica, quando completar 3 meses da referência definida, então o sistema deve gerar lembrete.
- Dado que o lembrete tenha sido gerado, quando o cliente acessar o app, então deve visualizá-lo na central de notificações ou área equivalente.
- Dado que a oficina trabalhe com campanhas recorrentes, quando o calendário de manutenção for executado, então o cliente deve receber a comunicação prevista sem depender de abertura manual de serviço.

## Matriz de rastreabilidade resumida

| Requisito | Capacidade principal | Área do app |
| --- | --- | --- |
| RF01 | Acesso autenticado do cliente | Jornada inicial |
| RF02 | Gestão dos veículos do cliente | Meus veículos |
| RF03 | Comunicação promocional | Promoções e campanhas |
| RF04 | Transparência sobre o atendimento | Serviço ativo |
| RF05 | Aviso de retirada | Central de notificações |
| RF06 | Consulta de itens comercializados | Loja / catálogo |
| RF07 | Abertura de pedido comercial | Solicitar orçamento |
| RF08 | Encaminhamento ao backoffice | Painel administrativo |
| RF09 | Consulta de histórico automotivo | Histórico de serviços |
| RF10 | Relacionamento recorrente pós-serviço | Central de notificações |

## Observações para evolução do projeto

- Os requisitos acima descrevem o comportamento esperado em nível funcional, sem impor uma implementação técnica específica.
- Para evolução para produção, recomenda-se complementar este documento com regras de autenticação, integrações, notificações push, política de dados e fluxos de exceção.
- Os critérios de aceite podem ser convertidos em casos de teste, histórias de usuário ou cenários BDD.
