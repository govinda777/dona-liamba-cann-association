# Arquitetura do Sistema

## Visão Geral

O projeto é estruturado como um monorepo usando Turborepo, permitindo o compartilhamento de código e configurações entre diferentes aplicações.

```mermaid
graph TB
  subgraph Apps
    FE[Frontend (Next.js)]
    Admin[Admin Panel (Next.js)]
    API[API Service (Next.js)]
    Docs[Documentation (Next.js)]
  end

  subgraph Packages
    UI[Shared UI]
    Config[Shared Config]
    Types[Shared Types]
  end

  subgraph Infrastructure
    DB[(Supabase PostgreSQL)]
    Blockchain[Smart Contracts (Polygon/Amoy)]
  end

  FE --> UI
  Admin --> UI
  FE --> API
  Admin --> API
  API --> DB
  API --> Blockchain
```

## Fluxo de Dados

1. **Frontend** interage com a **API** para dados off-chain e diretamente com a **Blockchain** (via Wagmi/Viem) para transações on-chain.
2. **API** gerencia a persistência de dados no **Supabase** e pode atuar como oracle ou indexador para eventos da blockchain.
3. **Smart Contracts** gerenciam a lógica de negócios descentralizada (NFTs, Escrow).
