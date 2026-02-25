# Desenvolvimento Local

## Pré-requisitos
- Node.js 20+
- pnpm 9+
- Supabase account (free)
- Vercel account

## Setup
```bash
cp .env.example .env.local
pnpm install
pnpm turbo dev
```

## Estrutura Monorepo
```
apps/
├── fe/          # npm run dev:fe → localhost:3000
├── api/         # npm run dev:api → localhost:3001
└── admin/       # npm run dev:admin → localhost:3002
```

## Scripts Turbo
```bash
pnpm turbo build --filter=fe        # Build só FE
pnpm turbo affected:test            # Testa só mudanças
pnpm turbo lint                     # Lint tudo
```
