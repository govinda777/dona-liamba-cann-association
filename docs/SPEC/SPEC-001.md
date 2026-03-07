# SPEC-001: Jornada de Consulta, Pagamentos e Integração Memed

- **Referência:** [ADR-001](./ADR/ADR-001.md)
- **Status:** Draft
- **Propósito:** Definir a especificação técnica e de negócio para a implementação da monetização via consultas, fluxos de pagamento e integração com Memed.

## 1. Regras de Negócio

### 1.1 Modelo de Receita
- A plataforma cobra uma comissão sobre cada consulta paga.
- Taxa de plataforma: 2% (definida em `EscrowMarketplace.sol`).
- Split de pagamento automático no momento da liquidação.

### 1.2 Fluxo de Pagamento
- Suporte a PIX (FIAT) e Cripto (USDC, WBTC, ETH).
- Pagamento retido em Escrow até a confirmação da realização da consulta.
- Saques: Médicos podem sacar saldo líquido em cripto para carteiras externas a qualquer momento.

### 1.3 Ciclo de Vida da Consulta
- Estados: `AGENDADA` -> `PAGA` -> `REALIZADA` -> `CONCLUÍDA` (pagamento liberado).
- Critério de "Realizada":
  - Presença de médico e paciente por no mínimo 5 minutos.
  - Finalização manual pelo médico na interface.

### 1.4 Integração Memed
- A plataforma não gera prescrições, apenas captura metadados.
- Sincronização automática via polling da API Memed após a consulta ser marcada como "Realizada".
- Janela de matching: 48 horas após o fim da consulta.

## 2. Requisitos Técnicos

### 2.1 Backend (Next.js API Routes / Server Actions)
- **Módulo SCHED:** Gestão de agenda (slots) e reservas (bookings).
- **Módulo PAY:** Integração com Gateway PIX e Smart Contracts (EVM).
- **Módulo SESSION:** Integração com Jitsi/Twilio para sala virtual.
- **Módulo DOCS:** Serviço de sincronização e matching com Memed API.

### 2.2 Frontend (Next.js 14+)
- Dashboard do Médico: Gestão de agenda, sala de consulta, histórico de receitas.
- Dashboard do Paciente: Agendamento, pagamento, sala de consulta, minha carteira de receitas.

### 2.3 Banco de Dados (PostgreSQL + Prisma)
- Entidades: `User`, `ConsultationSlot`, `Booking`, `Payment`, `ConsultationSession`, `PrescriptionMetadata`.

## 3. Contratos de API (Rascunho)

### POST `/api/v1/bookings`
- Input: `slotId`, `patientId`, `paymentMethod`.
- Output: `bookingId`, `paymentData` (QR Code PIX ou TX hash cripto).

### GET `/api/v1/sessions/{id}`
- Proteção: Apenas participantes vinculados ao `booking`.
- Output: `token`, `roomUrl`, `status`.

## 4. Critérios de Aceitação (AC)

- **AC1:** Paciente consegue agendar e pagar consulta via PIX e ver o status como "CONFIRMADO".
- **AC2:** Médico e Paciente entram na sala virtual e o sistema registra o tempo de permanência.
- **AC3:** Após o médico encerrar a consulta, o job de sincronização encontra a prescrição na Memed (usando CPF/CRM) e a vincula ao histórico.
- **AC4:** O médico consegue visualizar o saldo acumulado e realizar o saque para uma carteira externa (se em cripto).
- **AC5:** A comissão de 2% da plataforma é corretamente deduzida no split.

## 5. Constraints & Guidelines
- **Segurança:** Dados sensíveis (CPF) devem ser criptografados.
- **Web3:** Uso de Privy para abstração de conta (Embedded Wallets).
- **Performance:** Polling da Memed não deve bloquear threads principais (uso de background jobs).
