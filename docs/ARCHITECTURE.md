
## **ARQUITETURA DO PROTOCOLO DONA LIAMBA (MVP v1.0)**
### Plataforma de Organização e Comunicação para o Ecossistema Canábico

***

## **VISÃO MACRO DA ARQUITETURA**

### **Propósito Central**
Conectar **médicos**, **pacientes** e **associações** através de uma plataforma robusta que:
- Organiza e valida prescrições médicas digitais via integração com a **Memed**.
- Facilita a comunicação direta entre os atores do ecossistema.
- Centraliza documentação legal (Habeas Corpus, laudos) para associações e pacientes.
- Mapeia associações disponíveis por região e especialidade.
- Fornece conteúdo educacional para novos pacientes.

### **Stack Tecnológica Simplificada**
- **Frontend**: Next.js 14+ (App Router), Shadcn/UI, TailwindCSS.
- **Backend/API**: Next.js Server Actions & API Routes.
- **Autenticação**: Privy Auth (Email + Embedded Wallets para futuras features de cashback).
- **Web3 Identity**: Privy (Abstração de conta e gerenciamento de chaves).
- **Banco de Dados**: PostgreSQL (Prisma ORM).
- **Storage de Documentos**: AWS S3 (Armazenamento seguro de laudos e documentos).
- **Integração de Prescrição**: Memed API (Ecossistema regulamentado).

***

## **CAMADAS DA ARQUITETURA**

### **1. Camada de Apresentação (Frontend)**

**Web App Unificado (Next.js)**
- Dashboard multi-perfil com rotas protegidas:
  - `/patient/*` - Área do paciente (gestão de prescrições e documentos).
  - `/doctor/*` - Área do médico (validação e acompanhamento de pacientes).
  - `/association/*` - Área da associação (gestão de novos membros e conformidade).
  - `/education/*` - Trilhas educacionais e FAQs.
- Design System baseado em Radix UI (Shadcn/UI) para acessibilidade e consistência.
- Responsividade total para uso em dispositivos móveis (Mobile-first).

### **2. Camada de Autenticação e Identidade Web3**

**Privy Auth**
- Login via email (sem senha complexa) ou redes sociais.
- Criação automática de **Embedded Wallets** para cada usuário.
- Pilar para futuras implementações de **Cashback**, governança e recompensas no ecossistema.
- Multi-perfil: um usuário pode ter múltiplos papéis (ex: paciente + médico).

**Gestão de Perfis**
- Perfis de acesso baseados em Roles (RBAC):
  - **Paciente**: Gerencia seus dados, compartilha prescrições e acumula recompensas.
  - **Médico**: Valida CRM e acompanha prescrições na Memed.
  - **Associação**: Gere sua base de dados de pacientes vinculados.

***

## **CAMADA CORE - MÓDULOS DE NEGÓCIO**

#### **Módulo 1: Gestão de Prescrições (Integração Memed)**

**Funcionalidades:**
- **Importação Memed**: Paciente vincula o ID da prescrição emitida pela Memed no Protocolo Dona Liamba.
- **Validação em Tempo Real**: Uso da API da Memed para confirmar validade, data e medicação.
- **Dashboard de Saúde**: Histórico cronológico de prescrições para o paciente.
- **Alertas de Renovação**: Notificações automáticas baseadas na data de emissão e validade da prescrição.

**Fluxo Técnico:**
```
Médico emite prescrição na plataforma Memed → 
Paciente recebe link/PDF da Memed → 
Paciente insere ID/Link no Protocolo Dona Liamba → 
Backend consulta Memed API → 
Dados básicos (medicamento/validade) salvos no PostgreSQL → 
Prescrição validada para compartilhamento com associações.
```

#### **Módulo 2: Catálogo e Mapa de Associações**

**Funcionalidades:**
- Cadastro georreferenciado de associações.
- Filtros avançados: Tipo de óleo/produto, estado, suporte jurídico (Habeas Corpus).
- Perfil detalhado da associação com requisitos de entrada.
- Central de ajuda para novos pacientes encontrarem a associação ideal.

#### **Módulo 3: Documentação e Conformidade (LGPD Compliance)**

**Funcionalidades:**
- **Vault de Documentos**: Upload seguro de laudos médicos e documentos pessoais para AWS S3.
- **Gestão de Habeas Corpus**: Repositório para associações e pacientes organizarem suas ordens judiciais.
- **Criptografia em Repouso**: Todos os documentos sensíveis são criptografados no S3 (Server-Side Encryption).
- **Trilha de Auditoria**: Registro de quem acessou documentos sensíveis (médico ou associação).

#### **Módulo 4: Comunicação e Fluxos de Trabalho**

**Funcionalidades:**
- Chat interno para dúvidas operacionais entre Paciente ↔ Associação.
- Sistema de tickets para suporte jurídico e médico.
- Notificações de status de renovação e novas diretrizes de tratamento.

***

## **INFRAESTRUTURA E DADOS**

### **Banco de Dados (PostgreSQL)**
- `users`: Dados básicos e papéis.
- `profiles`: Dados específicos por tipo (CRM, CNPJ, histórico).
- `prescriptions`: Metadados das prescrições Memed (ID, validade, status).
- `documents`: Referências para arquivos no S3 e permissões de acesso.
- `associations`: Dados do catálogo e geolocalização.

### **Storage (AWS S3)**
- Bucket privado para documentos médicos e laudos.
- Bucket público para assets do site e vídeos educacionais.

***

## **INTEGRAÇÕES EXTERNAS**

1. **Memed API**: Core para gestão e validação de prescrições digitais.
2. **Serviço de Email (Amazon SES / SendGrid)**: Notificações e recuperação de senha.
3. **Google Maps API**: Georreferenciamento de associações e médicos.
4. **AWS S3**: Armazenamento seguro de documentos.

***

## **SEGURANÇA E CONFORMIDADE**

- **LGPD**: Implementação de logs de auditoria e consentimento explícito para compartilhamento de dados médicos entre usuário e associação.
- **Hipesegurança**: Dados de saúde nunca são expostos em APIs públicas.
- **Memed Compliance**: Utilizamos a infraestrutura da Memed que já está em conformidade com as normas do CFM e ITI.

***

## **DIAGRAMAS DE FLUXO ATUALIZADOS**

### **FLUXO 1: PACIENTE - Registro e Vinculação de Prescrição**

```
1. Paciente acessa o Protocolo Dona Liamba e cria conta via Email.
2. No dashboard, seleciona "Vincular Nova Prescrição".
3. O paciente informa o identificador da prescrição emitida na MEMED.
4. O sistema valida via API e exibe os detalhes para confirmação.
5. O paciente faz o upload do Laudo Médico (Obrigatório) para o AWS S3.
6. A prescrição agora consta como "Ativa" no perfil do paciente.
```

### **FLUXO 2: COMPARTILHAMENTO COM ASSOCIAÇÃO**

```
1. Paciente escolhe uma Associação no Mapa/Catálogo.
2. Clica em "Solicitar Adesão".
3. O paciente autoriza o compartilhamento da sua Prescrição Memed e do Laudo Médico.
4. A Associação recebe uma notificação e visualiza o prontuário organizado.
5. A Associação valida a autenticidade e processa a entrada do paciente.
```

### **FLUXO 3: MÉDICO - Atuação no Ecossistema**

```
1. Médico utiliza sua plataforma habitual da MEMED para emitir a receita.
2. No Protocolo Dona Liamba, o médico pode se cadastrar como "Prescritor Parceiro".
3. O médico visualiza os pacientes que o autorizaram, acompanhando se a prescrição foi vinculada ou se precisa de renovação.
```

***

## **PRÓXIMOS PASSOS DE IMPLEMENTAÇÃO**

### **Fase 1: Core Web (Atual)**
- Configuração do Dashboard Next.js e Auth.
- Schema do Banco de Dados PostgreSQL.
- Implementação do Catálogo de Associações.

### **Fase 2: Integração Memed**
- Implementação da consulta à API da Memed.
- Lógica de validação de prescrições no Backend.
- Notificações de expiração.

### **Fase 3: Documentação e Vault**
- Integração com AWS S3 para upload de laudos.
- Sistema de permissões Granulares (quem pode ver qual documento).

### **Fase 4: Expansão**
- Chat interno e trilhas educacionais.
- Melhoria do Mapa e filtros de busca.
