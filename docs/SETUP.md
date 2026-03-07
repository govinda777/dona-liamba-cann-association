# Guia de Instalação e Configuração

Este guia detalha os passos necessários para configurar o ambiente de desenvolvimento local do Protocolo Dona Liamba.

## 1. Pré-requisitos
Antes de começar, certifique-se de ter instalado:
*   **Node.js** (v18.0.0 ou superior)
*   **pnpm** (Gerenciador de pacotes recomendado)
*   **Git**

## 2. Clonando o Repositório
```bash
git clone https://github.com/seu-usuario/dona-liamba-cann-association.git
cd dona-liamba-cann-association
```

## 3. Instalação de Dependências
O projeto utiliza um monorepo gerenciado pelo **Turbo**. Instale as dependências da raiz para que todos os pacotes sejam configurados:
```bash
pnpm install
```

## 4. Configuração das Variáveis de Ambiente
O frontend requer algumas chaves de API para funcionar (Banco de Dados, Autenticação e Memed).

1. Vá para a pasta do frontend:
   ```bash
   cd apps/frontend
   ```
2. Crie o arquivo `.env.local` (utilize o `.env.example` como referência):
   ```bash
   cp .env.example .env.local
   ```
3. Preencha as variáveis no `.env.local`:
   *   `DATABASE_URL`: Sua string de conexão do PostgreSQL (Neon ou Local).
   *   `NEXT_PUBLIC_PRIVY_APP_ID`: Seu ID do painel do [Privy](https://dashboard.privy.io).
   *   `MEMED_API_KEY`: (Opcional por enquanto) Sua chave de integração com a Memed.

## 5. Configuração do Banco de Dados (Drizzle)
Com a `DATABASE_URL` corretamente configurada no `.env.local`, você precisa sincronizar as tabelas do banco de dados:
```bash
# Dentro de apps/frontend
pnpm db:push
```
*Dica: Você pode usar o `pnpm db:studio` para abrir uma interface visual do seu banco de dados no navegador.*

## 6. Executando o Projeto
Para iniciar o ambiente de desenvolvimento:
```bash
# Na raiz do projeto
pnpm dev
```
O frontend estará acessível em: `http://localhost:3000`

---

## Estrutura do Projeto
*   **/apps/frontend**: Aplicação Next.js principal.
    *   `/src/app`: Rotas e páginas (App Router).
    *   `/src/components`: Componentes de UI (Shadcn/UI).
    *   `/src/lib`: Configurações de banco (Drizzle), API e utilitários.
*   **/docs**: Documentação de arquitetura, instalação e processos.

## Comandos Úteis
| Comando | Descrição |
| :--- | :--- |
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Gera o build de produção |
| `pnpm db:push` | Sincroniza o schema do Drizzle com o banco |
| `pnpm db:studio` | Abre o visualizador de banco de dados |
