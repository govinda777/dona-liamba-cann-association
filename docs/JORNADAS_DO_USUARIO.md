# Jornadas do Usuário - Dona Liamba

Esta documentação descreve as jornadas dos principais atores da plataforma Dona Liamba, detalhando desde o onboarding até o acompanhamento contínuo do tratamento.

## Premissas da Plataforma
- **Hub Integrado:** Conecta pacientes, médicos e associações em um ecossistema único.
- **Fluxo Guiado:** O paciente é conduzido por 4 passos claros: necessidades, médico, associação e dashboard.
- **Segurança e Verificação:** A Dona Liamba atua como garantidora, verificando médicos e associações para proporcionar um ambiente seguro.

---

## 1. Jornada do Paciente

### 0. Onboarding do Paciente (Implementado)
- **Entrada:** O usuário inicia via landing page em botões como "Começar Tratamento Agora".
- **Fluxo:**
  - Cadastro via formulário em `/cadastro-paciente`.
  - Preenchimento de necessidades (sintomas, condições, localização).
  - O sistema sugere médicos e associações compatíveis imediatamente após a triagem.
- **Resultado:** Conta criada e recomendações personalizadas prontas.

### 1. Descoberta e Entendimento
- **Ações:** Navegação pela landing page, leitura de benefícios, visualização de depoimentos e prova social.
- **Objetivo:** Estabelecer confiança para iniciar o tratamento legal.

### 2. Busca e Seleção de Médico
- **Ações:** Filtros por especialidade, avaliação, valor de consulta e agenda.
- **Resultado:** Agendamento confirmado com integração à agenda interna da plataforma.

### 3. Conexão com Associação
- **Ações:** Após obter a prescrição, o paciente visualiza associações compatíveis, compara planos, catálogos e custos.
- **Resultado:** Escolha da associação e definição da logística de recebimento do produto.

### 4. Dashboard e Organização
- **Ações:** Acesso centralizado a prescrições, histórico de pedidos, lembretes de dosagem e chat com associações.
- **Resultado:** Acompanhamento contínuo e visão 360º do tratamento.

---

## 2. Jornada do Médico

### 0. Onboarding do Médico (Implementado)
- **Ações:** Cadastro em `/onboarding/doctor`, autenticação via Privy, envio de CRM e documentos para verificação.
- **Objetivo:** Tornar-se um "Médico Verificado" para receber indicações do sistema de triagem.

### 1. Receber Pacientes Qualificados
- **Ações:** Recebimento de solicitações de pacientes que já passaram pela triagem inicial de necessidades.
- **Resultado:** Agenda otimizada com pacientes de perfil adequado.

### 2. Consulta e Prescrição
- **Ações:** Realização da consulta (via plataforma ou presencial) e emissão de prescrição digital (padrão ANVISA/Memed).
- **Resultado:** Prescrição integrada ao dashboard do paciente e disponível para associações parceiras.

### 3. Acompanhamento
- **Ações:** Monitoramento da evolução do paciente e ajuste de dosagem através do histórico clínico na plataforma.

---

## 3. Jornada da Associação

### 0. Onboarding da Associação (Implementado)
- **Ações:** Cadastro em `/onboarding/association`, envio de CNPJ/Estatuto e validação pela plataforma.
- **Objetivo:** Listagem no catálogo de "Associações Verificadas" e disponibilidade para pacientes com prescrição.

### 1. Receber Prescrições e Pacientes
- **Ações:** Recepção de indicações de pacientes, apresentação de planos de adesão e catálogo de produtos.
- **Resultado:** Formalização do vínculo associativo e venda de produtos.

### 2. Gestão de Tratamento e Associados
- **Ações:** Atualização de status de pedidos, gestão de entregas, renovações e suporte via chat.
- **Resultado:** Operação centralizada e transparente para o associado.

---

## Visão Comparativa dos Pontos-Chave

| Tipo        | Onboarding Atual (Estado de Implementação) | Primeiro Momento-Chave                          |
|------------|--------------------------------------------|------------------------------------------------|
| **Paciente**   | `/cadastro-paciente` + Triagem de necessidades | Sugestão imediata de médicos e associações |
| **Médico**     | `/onboarding/doctor` + Verificação de CRM | Recepção de pacientes já triados           |
| **Associação** | `/onboarding/association` + Verificação de CNPJ | Recepção de prescrições e oferta de planos |

**Nota sobre Implementação:** Todos os fluxos de onboarding (Paciente, Médico e Associação) já possuem interfaces funcionais e integração com o backend de triagem e autenticação.
