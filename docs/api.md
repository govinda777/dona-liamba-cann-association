# Documentação da API

A API é construída usando **Next.js API Routes** dentro do diretório `apps/api/app/api`.

## Endpoints

### `/api/v1/health`
- **Método:** GET
- **Descrição:** Verifica o status da API.

### `/api/v1/patients`
- **Método:** GET, POST
- **Descrição:** Gerencia registros de pacientes.

## Autenticação

A autenticação é gerenciada via headers (ex: `Authorization: Bearer <token>`) ou integração com Privy/Supabase.

## Database Schema (Prisma)

O esquema do banco de dados está localizado em `apps/api/prisma/schema.prisma`. Execute `pnpm prisma studio` para visualizar.
