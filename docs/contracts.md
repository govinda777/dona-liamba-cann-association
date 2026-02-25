# Smart Contracts

Os contratos inteligentes estão localizados no diretório `contracts/` e utilizam **Hardhat** para desenvolvimento e testes.

## Setup

```bash
cd contracts
pnpm install
```

## Testes

```bash
npx hardhat test
```

## Deploy

Para fazer deploy na rede Polygon Amoy (Testnet):

```bash
npx hardhat run scripts/deploy.ts --network amoy
```

Certifique-se de configurar `PRIVATE_KEY` e `RPC_URL` no arquivo `.env`.

## Endereços de Contrato (Testnet)

- **MedicalNFT:** `0x...`
- **EscrowMarketplace:** `0x...`
