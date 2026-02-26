
## **ARQUITETURA DO PROTOCOLO DONA LIAMBA (MVP v1.0)**
### Plataforma de Organização e Comunicação para o Ecossistema Canábico

***

## **VISÃO MACRO DA ARQUITETURA**

### **Propósito Central**
Conectar **médicos**, **pacientes** e **associações** através de uma plataforma que:
- Organiza prescrições médicas digitais
- Facilita comunicação entre os atores
- Centraliza documentação e habeas corpus
- Mapeia associações disponíveis por região
- Educa novatos sobre cannabis medicinal [github](https://github.com/soucannabis/ecosistemasoucannabis)

### **Stack Tecnológica Atual**
- **Frontend**: Next.js 14+ (App Router), Shadcn/UI, TailwindCSS
- **Autenticação**: Privy (Email + Embedded Wallets)
- **Web3**: Wagmi + Viem
- **Contratos**: Hardhat, Solidity 0.8.20
- **NFT de Prescrição**: ERC-721 Soulbound (intransferível)

***

## **CAMADAS DA ARQUITETURA**

### **1. Camada de Apresentação (Frontend)**

**Web App Unificado (Next.js)**
- Dashboard multi-perfil com rotas protegidas:
  - `/paciente/*` - Área do paciente
  - `/medico/*` - Área do médico
  - `/associacao/*` - Área da associação
  - `/novato/*` - Área educacional pública
- Componentes compartilhados (Shadcn/UI)
- Feature flags por papel de usuário
- PWA-ready para acesso mobile

### **2. Camada de Autenticação e Identidade**

**Privy Auth**
- Login via email (sem senha complexa)
- Login social (Google)
- Criação automática de carteira Web3
- Multi-perfil: um usuário pode ter múltiplos papéis (ex: paciente + médico)

**Gestão de Perfis**
- Tipo de usuário: `novato | paciente | medico | associacao | admin`
- Dados de perfil por tipo:
  - **Paciente**: nome, CPF, telefone, endereço, histórico médico básico
  - **Médico**: CRM, especialidade, estado de atuação, certificados
  - **Associação**: CNPJ, habeas corpus, documentação legal, região de atuação, capacidade de atendimento

### **3. Camada Core - Módulos de Negócio**

#### **Módulo 1: Prescrições Digitais (Medical NFT)** [memed.com](https://memed.com.br)

**Funcionalidades:**
- Médico cria prescrição vinculada ao paciente
- Dados sensíveis criptografados off-chain (client-side)
- NFT ERC-721 Soulbound armazena apenas hash da prescrição
- Anexos: laudos, exames (armazenados criptografados no IPFS ou storage seguro)
- Validade configurável da prescrição
- Histórico imutável de prescrições

**Fluxo Técnico:**
```
Médico preenche prescrição → 
Dados criptografados no cliente → 
Hash enviado para contrato MedicalNFT → 
NFT mintado para carteira do paciente → 
Metadados IPFS + notificação ao paciente
```

#### **Módulo 2: Catálogo de Associações** [cannabis-app](https://cannabis-app.com/associacao-medicinal-de-cannabis/)

**Funcionalidades:**
- Cadastro de associações com documentação
- Mapa interativo por estado/região
- Filtros: tipo de produto, capacidade, requisitos
- Status de fila/disponibilidade
- Informações de contato direto
- Avaliações e reputação (futura feature)

**Dados por Associação:**
- Informações legais (CNPJ, habeas corpus)
- Produtos disponíveis (informativo, sem venda)
- Capacidade de atendimento
- Processo de adesão
- Documentos necessários
- Contatos (WhatsApp, email, telefone)

#### **Módulo 3: Comunicação Centralizada** [clickup](https://clickup.com/pt-BR/blog/504936/plataformas-de-comunicacao-clinica)

**Funcionalidades:**
- Chat interno paciente ↔ médico
- Chat paciente ↔ associação
- Notificações por email/push
- Timeline de interações
- Lembretes de renovação de prescrição
- Avisos de atualização de documentos

**Tipos de Mensagem:**
- Dúvidas sobre prescrição
- Solicitação de renovação
- Confirmação de documentos
- Agendamento de consultas (futuro)

#### **Módulo 4: Documentação e Conformidade**

**Funcionalidades:**
- Upload seguro de documentos (criptografados)
- Gestão de habeas corpus (associações)
- Certificados médicos (CRM, especialização)
- Histórico auditável de acessos
- LGPD compliance (consentimentos, exclusão de dados)

**Armazenamento:**
- Documentos públicos: IPFS descentralizado
- Documentos sensíveis: Storage criptografado (AWS S3 + KMS ou similar)
- Hashes on-chain para prova de existência

#### **Módulo 5: Conteúdo Educacional** [cannabis-app](https://cannabis-app.com/associacao-medicinal-de-cannabis/)

**Funcionalidades:**
- Trilha educativa sobre cannabis medicinal
- Vídeos, artigos, FAQs
- Simulador de custo de tratamento (informativo)
- Diferenças entre associações por estado
- Requisitos legais para começar tratamento
- Glossário de termos

**Públicos:**
- Novatos/curiosos (público)
- Pacientes ativos (conteúdo avançado)
- Médicos (guidelines, estudos)

#### **Módulo 6: Mapa e Descoberta** [cannaid](https://cannaid.app/cadastro-associacao/)

**Funcionalidades:**
- Mapa interativo do Brasil
- Pin de associações por estado
- Filtros: disponibilidade, tipo de atendimento
- Lista de médicos prescritores parceiros
- Busca por região/CEP
- Comparação entre associações

***

## **INFRAESTRUTURA E DADOS**

### **Banco de Dados**
- **PostgreSQL** (dados estruturados):
  - Usuários e perfis
  - Metadados de prescrições
  - Catálogo de associações
  - Mensagens e notificações
  - Logs de auditoria

### **Storage Descentralizado**
- **IPFS**: Documentos públicos, metadados NFT
- **Arweave** (alternativa): Dados permanentes

### **Storage Criptografado**
- **AWS S3 + KMS** ou **Google Cloud Storage**:
  - Documentos médicos sensíveis
  - Anexos de prescrições
  - Comprovantes legais

### **Blockchain (Polygon/Amoy Testnet)**
- **MedicalNFT**: Registro imutável de prescrições
- Eventos on-chain para auditoria
- Baixo custo de transação (L2)

***

## **INTEGRAÇÕES EXTERNAS**

1. **Serviço de Email** (SendGrid, AWS SES)
   - Notificações de prescrição
   - Lembretes de renovação
   - Confirmações de cadastro

2. **Serviço de Push** (OneSignal, Firebase)
   - Notificações mobile
   - Alertas de mensagens

3. **API de Maps** (Google Maps, Mapbox)
   - Mapa de associações
   - Geolocalização

4. **Storage de Arquivos**
   - IPFS (Pinata, Web3.Storage)
   - AWS S3 ou similar

5. **Certificado Digital** (futura integração)
   - ICP-Brasil para assinatura de prescrições [prescricaoeletronica.cfm.org](https://prescricaoeletronica.cfm.org.br)

***

## **SEGURANÇA E CONFORMIDADE**

### **LGPD**
- Termo de consentimento explícito
- Direito de exclusão de dados
- Anonimização em relatórios
- Logs de acesso a dados sensíveis

### **Criptografia**
- End-to-end para documentos médicos
- HTTPS obrigatório
- Dados sensíveis nunca em plaintext on-chain

### **Auditoria**
- Event log de todas ações críticas
- Registro imutável on-chain (hash)
- Trilha de quem acessou quais dados

***

## **DIAGRAMAS DE FLUXO POR CASO DE USO**

Vou detalhar os principais fluxos simplificados para o MVP:

***

### **FLUXO 1: PACIENTE - Entrada e Primeira Prescrição**

```
1. CADASTRO
   Paciente acessa site → 
   Clica em "Começar" → 
   Insere email → 
   Privy cria conta + carteira automática → 
   Preenche perfil básico (nome, CPF, telefone) → 
   Aceita termos LGPD

2. EXPLORAÇÃO
   Dashboard exibe:
   - "Minhas Prescrições" (vazio inicialmente)
   - "Encontrar Médico"
   - "Encontrar Associação"
   - "Aprenda sobre Cannabis"

3. RECEBIMENTO DE PRESCRIÇÃO
   Médico emite prescrição (ver fluxo médico) → 
   Sistema minta NFT Soulbound → 
   Paciente recebe notificação (email + push) → 
   Acessa "Minhas Prescrições" → 
   Visualiza prescrição com:
   - Dados do médico
   - Medicação prescrita
   - Validade
   - Anexos (laudos)
   - Botão "Compartilhar com Associação"

4. BUSCA E CONTATO COM ASSOCIAÇÃO
   Paciente acessa "Mapa de Associações" → 
   Filtra por estado/região → 
   Visualiza detalhes da associação:
   - Contatos (WhatsApp, email, telefone)
   - Documentos necessários
   - Processo de adesão
   - Botão "Compartilhar Prescrição"
   
   Clica em "Compartilhar Prescrição" → 
   Sistema gera link temporário com hash da prescrição → 
   Paciente envia link via WhatsApp/email para associação → 
   Associação valida prescrição na plataforma
```

***

### **FLUXO 2: MÉDICO - Emissão de Prescrição Digital**

```
1. CADASTRO DO MÉDICO
   Médico acessa área de cadastro → 
   Preenche dados profissionais:
   - Nome completo
   - CRM + estado
   - Especialidade
   - Upload de certificado CRM (verificação futura)
   
   Sistema valida formato CRM → 
   Cria conta com perfil "médico"

2. EMISSÃO DE PRESCRIÇÃO
   Médico acessa "Emitir Prescrição" → 
   Busca paciente por email/CPF ou cria novo registro → 
   Preenche formulário:
   
   DADOS DO PACIENTE:
   - Nome completo
   - CPF
   - Data nascimento
   - Endereço
   
   DADOS DA PRESCRIÇÃO:
   - CID-10 (diagnóstico)
   - Medicação/concentração
   - Posologia
   - Validade (30/60/90 dias)
   - Observações
   
   ANEXOS:
   - Upload de laudos médicos
   - Exames complementares
   
   Médico confirma → 
   Sistema:
   1. Criptografa dados sensíveis no cliente
   2. Gera hash SHA-256 dos dados
   3. Chama contrato MedicalNFT
   4. Minta NFT para carteira do paciente
   5. Armazena metadados IPFS
   6. Salva dados criptografados no storage
   7. Envia notificação ao paciente

3. ACOMPANHAMENTO
   Médico acessa "Minhas Prescrições Emitidas" → 
   Visualiza lista com status:
   - Ativa
   - Próxima do vencimento (alertas automáticos)
   - Expirada
   
   Pode:
   - Renovar prescrição (novo NFT)
   - Ver histórico do paciente
   - Exportar relatório
```

***

### **FLUXO 3: ASSOCIAÇÃO - Cadastro e Validação de Prescrições**

```
1. CADASTRO DA ASSOCIAÇÃO
   Representante acessa "Cadastrar Associação" → 
   Preenche formulário:
   
   DADOS LEGAIS:
   - Nome da associação
   - CNPJ
   - Endereço completo
   - Estado de atuação
   
   DOCUMENTAÇÃO:
   - Upload de habeas corpus
   - Estatuto social
   - Ata de fundação
   - Comprovante de endereço
   
   INFORMAÇÕES OPERACIONAIS:
   - Capacidade de atendimento
   - Produtos disponíveis (descritivo)
   - Processo de adesão
   - Contatos (WhatsApp, email, telefone)
   
   Sistema:
   - Valida CNPJ
   - Armazena documentos criptografados
   - Status inicial: "Em análise"
   - Admin aprova manualmente (MVP)

2. RECEBIMENTO E VALIDAÇÃO DE PRESCRIÇÃO
   Paciente compartilha link de prescrição via WhatsApp → 
   Associação clica no link → 
   Sistema exibe:
   - Dados do paciente (nome, CPF)
   - Dados do médico (nome, CRM)
   - Prescrição (medicação, validade)
   - Status do NFT (ativo/expirado)
   - Hash on-chain (prova de autenticidade)
   
   Associação verifica autenticidade → 
   Pode:
   - Salvar prescrição nos registros
   - Iniciar processo de adesão
   - Entrar em contato direto com paciente (fora da plataforma)

3. GESTÃO DE PACIENTES
   Associação acessa "Meus Pacientes" → 
   Visualiza lista de pacientes que compartilharam prescrições → 
   Filtros: ativa, expirada, aguardando renovação
   
   Pode:
   - Ver histórico de prescrições
   - Enviar mensagem via chat interno
   - Lembrar paciente sobre renovação
```

***

### **FLUXO 4: NOVATO - Descoberta e Educação**

```
1. ENTRADA NO SITE (SEM LOGIN)
   Novato acessa home → 
   Visualiza:
   - "O que é Cannabis Medicinal?"
   - "Como Começar Seu Tratamento"
   - Mapa de Associações (público)
   - "Encontre um Médico Prescritor"
   - Depoimentos de pacientes

2. TRILHA EDUCATIVA
   Clica em "Aprenda Sobre Cannabis" → 
   Acessa módulos:
   
   MÓDULO 1: Introdução
   - O que é cannabis medicinal
   - Diferença entre CBD e THC
   - Indicações terapêuticas
   - Legislação brasileira
   
   MÓDULO 2: Jornada do Paciente
   - Como conseguir prescrição
   - Requisitos legais
   - Papel das associações
   - Custos envolvidos (simulador)
   
   MÓDULO 3: Associações vs Compra Legal
   - Diferenças entre modelos
   - Direitos do paciente
   - Como escolher associação
   - Documentação necessária

3. SIMULADOR DE CUSTO (INFORMATIVO)
   Novato acessa "Simular Custo" → 
   Informa:
   - Estado
   - Tipo de produto desejado
   - Frequência de uso estimada
   
   Sistema retorna:
   - Custo médio de consulta
   - Custo médio mensal (baseado em dados das associações)
   - Documentos necessários
   - Lista de associações próximas

4. CONVERSÃO PARA PACIENTE
   Novato decide começar tratamento → 
   Clica em "Criar Conta" → 
   Completa cadastro (ver Fluxo 1) → 
   Sistema atualiza perfil de "novato" para "paciente"
```

***

### **FLUXO 5: COMUNICAÇÃO INTERNA (CHAT)**

```
1. PACIENTE ENVIA MENSAGEM AO MÉDICO
   Paciente acessa prescrição → 
   Clica em "Falar com Dr. [Nome]" → 
   Escreve dúvida sobre medicação → 
   Envia
   
   Sistema:
   - Salva mensagem no DB
   - Notifica médico (email + push)
   - Médico recebe em "Mensagens"

2. MÉDICO RESPONDE
   Médico acessa "Mensagens" → 
   Vê notificação de paciente → 
   Lê histórico da conversa + prescrição relacionada → 
   Responde
   
   Sistema:
   - Salva resposta
   - Notifica paciente
   - Marca como "respondido"

3. PACIENTE CONTATA ASSOCIAÇÃO
   Paciente acessa perfil da associação → 
   Clica em "Enviar Mensagem" → 
   Pergunta sobre processo de adesão → 
   Envia
   
   Associação recebe notificação → 
   Responde via chat interno
   
   (ALTERNATIVA: Sistema pode direcionar para WhatsApp Business da associação)
```

***

### **FLUXO 6: RENOVAÇÃO DE PRESCRIÇÃO**

```
1. ALERTA AUTOMÁTICO (15 DIAS ANTES DO VENCIMENTO)
   Sistema identifica prescrições próximas do vencimento → 
   Envia notificações:
   - Email para paciente
   - Push notification
   - Notificação no dashboard
   - Email para médico prescritor

2. PACIENTE SOLICITA RENOVAÇÃO
   Paciente acessa prescrição → 
   Clica em "Solicitar Renovação" → 
   Escreve mensagem opcional ao médico → 
   Envia solicitação
   
   Médico recebe em "Solicitações de Renovação" → 
   Avalia necessidade → 
   Emite nova prescrição (novo NFT)

3. NOVA PRESCRIÇÃO VINCULADA
   Sistema cria relacionamento entre prescrições:
   - "Renovação de [prescrição anterior]"
   - Histórico preservado
   - Novo NFT mintado
```

***

## **PRÓXIMOS PASSOS DE IMPLEMENTAÇÃO**

### **Sprint 1: Fundação (2-3 semanas)**
1. Ajustar autenticação Privy com multi-perfil
2. Criar schemas do banco (usuários, prescrições, associações)
3. Implementar CRUD básico de perfis
4. Dashboard com rotas protegidas por papel

### **Sprint 2: Prescrições (2-3 semanas)**
1. Formulário de emissão de prescrição (médico)
2. Integração com MedicalNFT existente
3. Criptografia client-side de dados sensíveis
4. Upload de anexos (IPFS)
5. Visualização de prescrições (paciente)

### **Sprint 3: Associações e Mapa (2 semanas)**
1. Cadastro de associações
2. Mapa interativo (Google Maps API)
3. Página de detalhes da associação
4. Compartilhamento de prescrição (link temporário)
5. Validação de prescrição (associação)

### **Sprint 4: Comunicação (2 semanas)**
1. Chat interno básico (WebSocket ou Pusher)
2. Sistema de notificações (email + push)
3. Timeline de interações
4. Lembretes de renovação

### **Sprint 5: Conteúdo Educacional (1-2 semanas)**
1. CMS para conteúdo educativo
2. Trilha de cursos
3. Simulador de custo
4. FAQs

