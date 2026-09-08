# Design System & Diretrizes de Prototipagem - Hub de Medicina Dona Liamba

## Princípio Arquitetural Absoluto
**"Web3 como Cérebro Decisório e Orquestrador, Banco/Pix como Executor"**

O usuário final não deve enfrentar atrito com compra de criptoativos, taxas de gás ou gestão manual de chaves. A experiência é orquestrada sob um modelo dual de interface, guiada por um Portal de Onboarding Unificado.

---

## O Conceito Duplo: Luz e Sombra

O Design System opera com base em duas abordagens visuais e funcionais interligadas, alternadas por um componente de **Toggle Switch** ("Ver Bastidores" / "Developer Mode").

### ☀️ A Luz (UX Humanizada & Front-end)
Foco na experiência do usuário leigo. Transmite saúde, calma, acolhimento institucional e facilidade de uso, ocultando a complexidade tecnológica subjacente.
* **Cores Principais:** Fundos claros (Off-White/Cream), tons acolhedores (Verde sálvia, tons terrosos suaves).
* **Tipografia:** Sem serifa, geométrica e amigável (ex: *Inter*, para excelente legibilidade de laudos longos).
* **Bordas:** Modais e botões com bordas arredondadas (radius 12px-16px).
* **Espaçamento:** Interfaces limpas com amplo *white space*.

### 🌑 A Sombra (Infra Web3 & Tech/Bastidores)
Foco na transparência arquitetural, smart contracts, governança e compliance. Revela a tecnologia Web3, orquestração e legalidade por trás de cada ação.
* **Cores Principais:** *Dark Mode* profundo (Gris ardósia, Preto absoluto) com linhas de neon sutis (Verde matriz, Roxo blockchain, Azul elétrico) para diagramas e fluxos.
* **Tipografia:** Monoespaçada para componentes de log, hashes de carteiras e metadados de contratos (ex: *Fira Code*).
* **Elementos Visuais:** *Bounding boxes* em formato de diagrama, revelando fluxogramas técnicos e integrações de protocolos.

---

## Jornadas dos Usuários (Dualidade)

### Jornada 1: O Paciente (Acolhimento e Tratamento)
* **Luz (A Experiência):** Login unificado (e-mail/redes sociais via Privy). Agendamento fluido integrado ao Pix instantâneo, com liberação automática de sala de teleconsulta. Menu com "Vault Pessoal de Saúde" para laudos e receitas.
* **Sombra (Os Bastidores):** Account Abstraction (Privy) provisionando carteira ERC-4337 na Base L2. Oráculo Middleware monitorando API do Pix para split de pagamentos. Assinaturas off-chain via EIP-712 sem taxas (patrocinadas via Paymaster) para Termos/TCLE. Separação de dados sensíveis (Neon SQL) de registros imutáveis (hash SHA-256 na L2).

### Jornada 2: O Médico (Prescrição Segura e Independência)
* **Luz (O Atendimento):** Dashboard ágil com agenda, anamnese fluida. Destaque para o "Copiloto de IA" com sugestões clínicas. Assinatura digital padrão ICP-Brasil para receitas.
* **Sombra (Ética e DeSci):** Médico assinando compromisso off-chain (EIP-712) para CFM. Motor IA RAG puxando dados de base vetorial (Sanity CMS). Cargos on-chain via Soulbound Tokens (SBTs) permitindo tokens de reputação (DeSci) sem mercantilização.

### Jornada 3: A Associação (Conformidade, Governança e Cultivo)
* **Luz (Centro de Controle):** Checklist regulatório automatizado (Anvisa/HC). Telemetria "Plantio & Cura" com IoT. Painel logístico Kanban para análise laboratorial e fórum de governança.
* **Sombra (DAO e Tesouraria):** Estrutura on-chain sem fins lucrativos. Tesouraria Gnosis Safe Multi-sig (2-de-3). "Proof of Humanity" via Guild.xyz/Gitcoin Passport para votos gasless via Snapshot.

### Jornada 4: A Importadora (Parceiros e Lotes de Qualidade)
* **Luz (Vitrine B2B):** Painel B2B para gerenciar catálogo. Transações de anuidade e upload de CoAs em PDF via drag-and-drop.
* **Sombra (Inviolabilidade Regulatória):** Token-gating via Unlock Protocol (NFTs de acesso temporal). CoAs convertidos em prova criptográfica on-chain (EIP-712) via Ethereum Attestation Service (EAS) para evitar adulteração e conformidade Anvisa.

---

## Transição (A "Virada")
O protótipo utilizará *Smart Animate* para transição Luz/Sombra. Quando acionado, elementos humanizados sofrem um *dissolve* suave, enquanto *bounding boxes* em formato de diagrama emergem para revelar os protocolos e fluxos técnicos por trás daquela coordenada específica da interface, alterando layouts estruturais sutilmente (ex: Avatar de Usuário ➡️ Hash de Carteira; Carrinho ➡️ Multi-sig Treasury).
