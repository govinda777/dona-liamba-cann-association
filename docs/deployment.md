# Deploy Automático (Zero Config)

## Vercel Projects
1. **dona-liamba-cann-association-frontend** → `apps/fe`
2. **dona-liamba-cann-association-api** → `apps/api`
3. **dona-liamba-cann-association-admin** → `apps/admin`
4. **dona-liamba-cann-association-docs** → `apps/docs`

## CI/CD GitHub Actions
- **Push/PR** → lint + test + deploy affected apps
- **Cache Turbo** → builds 70% mais rápidos
- **Preview URLs** → cada PR ganha deploy automático

## Environment Variables
Certifique-se de configurar as variáveis de ambiente em cada projeto na Vercel:
- `NEXT_PUBLIC_API_URL`
- `DATABASE_URL`
- `RPC_URL`
- `PRIVATE_KEY` (apenas em ambientes seguros)
