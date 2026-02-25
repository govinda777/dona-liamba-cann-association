# DOCUMENTAÇÃO OFICIAL: Dona Liamba Cann Association - PROTOCOLO OCEANO AZUL WEB3

## CRIAR SEÇÃO COMPLETA "Seja Membro" + MENU NAVEGAÇÃO

### 1. CRIAR ITEM DE MENU "Seja Membro" (PRIORIDADE 1)
- Adicionar no header: `Seja Membro` (com badge "🚀 NOVO PROTOCOLO")
- Link para `/membro` - página principal do protocolo
- Design: botão gradiente verde-dourado com contador regressivo visível

### 2. SEÇÃO DOCUMENTAÇÃO: ESTUDO ESTRATÉGIA OCEANO AZUL v4

## Protocolo Dona Liamba: Oceano Azul Tokenizado

### Visão Disruptiva
**Primeiro protocolo Web3-hybrid para cannabis medicinal Brasil**: NFT controle associações + Chainlink scraping + governança tokenizada + referral viral. Elimina 90% burocracia Anvisa, viraliza rede (K-factor 2.5).

### Curva de Valor (IMPLEMENTAR GRÁFICOS)
- Velocidade Jornada: 9/10 (3 cliques vs 9 passos)
- Aquisição Orgânica: 10/10 (referral cashback + tokens)
- Controle NFT Associações: 10/10 (login único, produtos scraped)
- Governança Participativa: 10/10 (tokens DAO)

### Matriz ERRC Implementada
| Eliminar | Reduzir | Elevar | Criar |
|----------|---------|--------|-------|
| Burocracia manual | CAC ads | Confiabilidade | NFT controle + Chainlink scraping |
| Fragmentação | Consultas caras | Velocidade | Governança tokenizada |


### 3. PROTOCOLO DE MEMBRESIA TOKENIZADO (LÓGICA MATEMÁTICA)

**MODELO GEOMÉTRICO CASHBACK**:

Membro N taxa = 0,01 USDT + (soma de todas taxas anteriores)
Exemplo:
Membro 1: 0,01 USDT
Membro 2: 0,01 + 0,01 = 0,02 USDT
Membro 3: 0,01 + 0,01 + 0,02 = 0,04 USDT
Membro 4: 0,01 + 0,01 + 0,02 + 0,04 = 0,08 USDT
...
Membro N: 0,01 * (2^(N-1))


**IMPLEMENTAR CONTADOR VISUAL**:

[Cronômetro Ciclo Afiliados: 30 dias]
Próximo ciclo: 15/02/2026 00:00
Slots disponíveis: 47/100
Recompensa atual: 0,047 USDT + 10% tokens governança


### 4. SISTEMA DE GOVERNANÇA (PRINCÍPIOS DAO MELHORES PRÁTICAS)

**TOKEN $LIAMBA (GOVERNANÇA)**:

- Compra via Stripe/USDT (on-ramp fiat)
- 1 Token = 1 voto em propostas
- Quadratic Voting implementado
- Time-lock para evitar whales (6 meses)
- Snapshot voting via blockchain


**PROPOSTAS GOVERNANÇA** (categorias obrigatórias):

1. Novas Associações Parceiras [Voto Simples]
2. Ajuste Taxas Protocolo [Quadratic Voting]
3. Alocação Tesouraria [Multi-sig 3/5]
4. Upgrades Chainlink Scrapers [Delegated Voting]


### 5. JORNADA MEMBRO 100% BLOCKCHAIN GUARANTEED


1. ENTRY: Link referral exclusivo → wallet auto-criada
2. NFT Membro: Mint instantâneo (controle associações + perks)
3. Taxa Geométrica: Paga via Stripe → convert USDT → distribuído rede
4. Token Governança: Compra opcional → poder voto imediato
5. LOOP VIRAL: Gera novo link → ganha 20% taxa próximo membro


### 6. PÁGINA /membro IMPLEMENTAR

**HEADER**:

SEJA MEMBRO DO PROTOCOLO DONA LIAMBA
[CONTADOR REGRESSIVO CICLO] 🚀 47/100 VAGAS
Taxa atual: R$0,047 | Recompensa referral: R$0,0094
[CTA GRADIENTE] ENTRAR AGORA


**SECTIONS**:

1. [Gráfico Radar Blue Ocean]
2. "Como funciona" (taxa geométrica animada)
3. "Governança" (propostas ativas + power meter)
4. "Suas Associações NFT" (login 1-clique)
5. "Chainlink Insights" (premium scraping R$49/mês)
6. "Meu Referral" (link + stats cashback)


### 7. SMART CONTRACTS ESTRUTURA


LIAMBA_PROTOCOL.sol:
- mintMembershipNFT(uint memberId) → ERC-721
- geometricFee(uint memberNumber) → calcula taxa
- referralCashback(address referrer) → 20% distribuído
- governanceVote(uint proposalId, uint votes) → quadratic voting
- chainlinkScrape(address association) → oracle call


### 8. ROADMAP IMPLEMENTAÇÃO

✅ MVP: Referral + Taxa geométrica
✅ NFT Controle associações
✅ Chainlink scraping mock
🔥 SEMANA 1: Governança tokens + contador ciclo
🔥 SEMANA 2: Quadratic voting + tesouraria multi-sig
🚀 Lançamento: 47 membros beta com taxa inicial


### IMPLEMENTAR IMEDIATAMENTE:
1. Menu "Seja Membro" no header
2. Página `/membro` com contador + CTA
3. Sistema taxa geométrica visual
4. Documentação Blue Ocean + gráficos
5. Smart contract skeleton

TOM DE VOZ: "ÚNICO NO MUNDO. PROTOCOLO QUE PAGA PARA PARTICIPAR. ENTRE ANTES DO PRÓXIMO CICLO."
