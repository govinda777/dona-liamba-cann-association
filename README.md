# Dona Liamba Cann Association

Uma plataforma Web3 nativa para conectar médicos prescritores, fabricantes e pacientes no ecossistema de cannabis medicinal.

## Arquitetura

O projeto é um monorepo gerenciado por TurboRepo:

*   **`apps/frontend`**: Next.js 14+ (App Router), Shadcn/UI, TailwindCSS.
    *   **Autenticação**: Privy (Email + Embedded Wallets).
    *   **Web3 Integration**: Wagmi + Viem.
*   **`apps/contracts`**: Hardhat, Solidity 0.8.20.
    *   **MedicalNFT**: ERC-721 Soulbound (Intransferível) para prescrições.
    *   **EscrowMarketplace**: Sistema de pagamentos com retenção (Escrow) e divisão de taxas.

## Segurança

*   **Dados Médicos**: O `MedicalNFT` armazena apenas um hash criptografado (`dataHashStr`). **Nunca armazene dados médicos sensíveis (PII/PHI) diretamente on-chain.** A criptografia deve ocorrer off-chain (client-side) antes do minting.
*   **Pagamentos**: O `EscrowMarketplace` utiliza o padrão *Checks-Effects-Interactions* e `ReentrancyGuard` para prevenir ataques.
*   **Soulbound**: Prescrições são intransferíveis para garantir que apenas o paciente original possua o token.

## Setup e Instalação

### Pré-requisitos

*   Node.js v18+
*   pnpm

### 1. Instalar Dependências

```bash
pnpm install
```

### 2. Configurar Variáveis de Ambiente

**Frontend**:
Copie o exemplo e adicione seu Privy App ID (obtenha em dashboard.privy.io):

```bash
cp apps/frontend/.env.local.example apps/frontend/.env.local
# Edite apps/frontend/.env.local com NEXT_PUBLIC_PRIVY_APP_ID
```

**Contracts**:
Copie o exemplo e adicione sua chave privada e chaves de API:

```bash
cp apps/contracts/.env.example apps/contracts/.env
# Edite apps/contracts/.env
```

### 3. Rodar Localmente (Desenvolvimento)

Inicie o nó Hardhat local e a interface frontend:

```bash
# Terminal 1: Hardhat Node
cd apps/contracts
npx hardhat node

# Terminal 2: Deploy Contracts (em outra aba)
cd apps/contracts
npx hardhat run scripts/deploy.ts --network localhost

# Terminal 3: Frontend
cd apps/frontend
pnpm dev
```

O frontend estará disponível em `http://localhost:3000`.

### 4. Deploy para Testnet (Polygon Amoy)

```bash
cd apps/contracts
npx hardhat run scripts/deploy.ts --network amoy
```

## Documentação Oficial

*   [**Protocolo Oceano Azul Web3**](docs/BLUE_OCEAN_PROTOCOL.md): Detalhes sobre o modelo de governança tokenizada, taxas geométricas e estratégia de crescimento viral.

## Funcionalidades MVP

1.  **Login**: Autenticação via Email (Privy) com criação automática de carteira.
2.  **Dashboard**:
    *   **Minhas Prescrições**: Visualizar e emitir (demo) novos NFTs de prescrição.
    *   **Marketplace**: Comprar produtos fictícios usando ETH de teste, com fundos retidos em Escrow até confirmação.

## Contribuição

1.  Crie uma branch para sua feature (`git checkout -b feat/nova-feature`).
2.  Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`).
3.  Push para a branch (`git push origin feat/nova-feature`).
4.  Abra um Pull Request.
