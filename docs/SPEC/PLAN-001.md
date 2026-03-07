# PLAN-001: Implementação da Jornada de Consulta e Integração Memed

- **Baseado em:** [SPEC-001](./SPEC-001.md)
- **Status:** Planejado
- **Data:** 2026-03-06

## Épico 1: Infraestrutura de Dados e Backend Core

### Tarefa 1.1: Atualização do Schema (Prisma/PostgreSQL)
- Criar modelos `ConsultationSlot`, `Booking`, `ConsultationSession` e `PrescriptionMetadata`.
- Executar migração do banco de dados.
- **Arquivos:** `prisma/schema.prisma`.

### Tarefa 1.2: Serviços de Backend (Módulos Lógicos)
- Implementar `services/scheduling.ts` (Lógica de slots e reservas).
- Implementar `services/payments.ts` (Integração Gateway PIX e chamadas a Smart Contracts).
- Implementar `services/memed.ts` (Polling e Matching algorithm).
- **Arquivos:** `src/lib/services/*.ts`.

## Épico 2: Fluxo de Pagamento e Escrow

### Tarefa 2.1: Integração PIX (Fiat)
- Configurar rotas de API para geração de cobrança PIX via PSP.
- Implementar webhook para confirmação de pagamento.
- **Arquivos:** `src/app/api/payments/pix/route.ts`, `src/app/api/webhooks/pix/route.ts`.

### Tarefa 2.2: Fluxo Cripto
- Integrar chamadas ao `EscrowMarketplace.sol` via Wagmi/Viem.
- Implementar tela de checkout para pagamento em USDC/ETH.
- **Arquivos:** `src/components/CheckoutCrypto.tsx`.

## Épico 3: Sala de Consulta e Evidências

### Tarefa 3.1: Integração com Sala Virtual
- Implementar geração de links Jitsi com JWT para autorização.
- Criar interface da sala de consulta com cronômetro de permanência.
- **Arquivos:** `src/app/consultation/[id]/page.tsx`.

### Tarefa 3.2: Log de Presença e Finalização
- Implementar salvamento de `AttendanceLog` e trigger para finalizar consulta.
- **Arquivos:** `src/app/api/sessions/[id]/end/route.ts`.

## Épico 4: Sincronização Memed

### Tarefa 4.1: Algoritmo de Matching
- Implementar job assíncrono que consome a API Memed filtrando por CPF e data.
- Salvar metadados da prescrição vinculados à consulta.
- **Arquivos:** `src/lib/jobs/sync-memed.ts`.

## Épico 5: Interfaces (Dashboards)

### Tarefa 5.1: Visão do Médico
- Criar painel de gestão de agenda e lista de consultas realizadas com status de receita.
- **Arquivos:** `src/app/doctor/dashboard/page.tsx`.

### Tarefa 5.2: Visão do Paciente
- Criar histórico de consultas e "Minha Carteira de Receitas".
- **Arquivos:** `src/app/patient/dashboard/page.tsx`.

## Critérios de Verificação (QA)
- [ ] Rodar testes de unidade nos serviços de agendamento.
- [ ] Validar fluxo de webhook PIX em ambiente de sandbox.
- [ ] Validar matching de prescrição mockada da Memed.
- [ ] Verificar dedução da taxa de 2% no split.
