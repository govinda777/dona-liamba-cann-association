# Diagnóstico e Reestruturação de CI/CD - Dona Liamba

## Diagnóstico da Causa-Raiz das Falhas no GitHub Actions

A análise do repositório identificou que a arquitetura original de CI/CD em `.github/workflows/deploy.yml` apresentava problemas estruturais graves de duplicidade de concorrência e falha de contexto de ambiente:

1. **Conflito de Responsabilidades (CI/CD Duplicado):**
   - O projeto já possui a plataforma Vercel conectada ao repositório para o deploy automático via integração nativa a cada *push* ou *Pull Request*.
   - Em paralelo, o GitHub Actions continha *jobs* (`deploy-frontend` e `deploy-api`) tentando realizar deploy manual com a Vercel CLI (`vercel deploy`).
   - Essa abordagem gerava *race conditions* (condições de corrida), concorrência e uso desnecessário de minutos de automação, visto que a Vercel já disparava o build de forma independente do GitHub Actions.

2. **Falha por Variáveis de Ambiente Ausentes:**
   - O *job* tentava injetar `VERCEL_TOKEN` e `VERCEL_ORG_ID` para autenticar a Vercel CLI. A ausência (ou preenchimento inadequado) desses *secrets* no GitHub causava a quebra dos fluxos, gerando o erro de falta de preenchimento (`exit 1` direto do script de verificação do workflow).

3. **Falta de Escopo Efetivo no Monorepo:**
   - O uso de comandos imperativos isolados em scripts sem orquestração (em vez de usar a topologia de *cache* e dependências do Turborepo) enfraquece o propósito de um ambiente Monorepo, ignorando ferramentas nativas de inteligência de *build*.

## Solução Adotada (Arquitetura de Qualidade)

A estratégia foi reestruturada para alinhar o repositório às boas práticas de **Monorepo** e **GitOps/IaC**, separando claramente as funções de Integração Contínua (CI) e Entrega Contínua (CD).

### 1. GitHub Actions como "Quality Gate" (CI)
- O arquivo de deploy via actions foi refatorado e renomeado para `.github/workflows/ci.yml`.
- Toda a lógica da CLI de deploy (`vercel deploy`) foi **removida**.
- O fluxo de automação do GitHub Actions passou a ser exclusivamente voltado para testes, tipagem, *lint* e verificação do empacotamento:
  - Comando central: `pnpm turbo run lint test build`
- Isso garante que qualquer PR seja submetido a rigorosos processos de qualidade, com tempo de execução otimizado graças aos *caches* locais persistidos (`.turbo`).

### 2. Vercel como Hospedagem e CD Nativo
- A Vercel deve assumir a responsabilidade única pelo ciclo final de vida da aplicação na Nuvem (CD).
- É recomendada a configuração de **Ignored Build Step** usando o `npx turbo-ignore` diretamente nas configurações de projeto na Vercel (para os apps em `apps/frontend` e `apps/api`).
  - Isso garante que a Vercel cancelará *builds* de projetos que não sofreram alterações em um *commit* (ex: alterar um componente apenas no *frontend* cancelará graciosamente o *build* na aplicação *API*, e vice-versa).
