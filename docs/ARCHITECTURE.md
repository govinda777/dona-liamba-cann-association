# Arquitetura do Protocolo Dona Liamba

Este documento descreve a arquitetura técnica do protocolo Dona Liamba, focando na integração entre o Frontend, Smart Contracts e serviços off-chain.

## 1. Visão Geral

O protocolo Dona Liamba visa criar um ecossistema descentralizado para o tratamento com cannabis medicinal, conectando pacientes, médicos e associações de forma segura e transparente.

### Componentes Principais

1.  **Frontend (Next.js)**: Interface do usuário para pacientes, médicos e associações.
2.  **Smart Contracts (Solidity)**: Lógica de negócios imutável, incluindo prescrições (NFTs) e marketplace.
3.  **IPFS (Pinata)**: Armazenamento descentralizado de documentos sensíveis (prescrições médicas) e metadados.
4.  **Auth (Privy)**: Autenticação híbrida (Web2/Web3) e gerenciamento de carteiras embedded.

## 2. Smart Contracts

### 2.1 MedicalNFT.sol (ERC-721 Soulbound)

O contrato `MedicalNFT` representa a prescrição médica digital.

*   **Padrão**: ERC-721 com extensões de URI de armazenamento.
*   **Soulbound**: Os tokens são intransferíveis. Uma vez mintado para um paciente, o NFT não pode ser transferido para outra carteira.
*   **Controle de Acesso**:
    *   `DOCTOR_ROLE`: Permissão necessária para mintar novos tokens (prescrições).
    *   `DEFAULT_ADMIN_ROLE`: Gerencia as roles.
*   **Co-Ownership**:
    *   Permite que associações sejam adicionadas como "co-proprietárias" ou visualizadoras autorizadas de uma prescrição específica.
    *   Isso facilita o acesso da associação aos dados da prescrição para dispensação dos produtos.
*   **Privacidade**:
    *   Nenhum dado médico sensível é armazenado on-chain.
    *   O contrato armazena apenas o hash IPFS (ou hash criptografado) do documento da prescrição.
    *   A desencriptação ocorre off-chain (no cliente ou backend seguro) usando chaves apropriadas.

**Estrutura de Dados:**

```solidity
struct Prescription {
    address doctor;
    address patient;
    string ipfsHash; // Hash do documento criptografado
    uint256 issueDate;
    uint256 expirationDate;
    bool isActive;
}
```

### 2.2 EscrowMarketplace.sol

Gerencia a compra e venda de produtos das associações.

*   **Fluxo de Compra**:
    1.  Paciente cria uma ordem (`createOrder`) enviando ETH/Tokens.
    2.  O valor fica travado no contrato (Escrow).
    3.  Associação confirma o envio.
    4.  Paciente confirma o recebimento (`confirmDelivery`).
    5.  O valor é liberado para a associação.
*   **Disputa**: Mecanismo básico para travar fundos em caso de desacordo (a ser expandido com governança futura).

## 3. Fluxo de Dados

### 3.1 Emissão de Prescrição

1.  **Médico (Frontend)**:
    *   Preenche formulário de prescrição.
    *   Faz upload do PDF.
    *   Frontend criptografa o PDF e metadados.
    *   Upload para IPFS (via Pinata).
    *   Recebe CID (Content ID).
2.  **Médico (Blockchain)**:
    *   Chama `MedicalNFT.mintPrescription(patientAddress, ipfsCid, expiration)`.
    *   Assina transação com sua carteira.
3.  **Resultado**:
    *   NFT mintado para a carteira do paciente.
    *   Evento `PrescriptionMinted` emitido.

### 3.2 Compra de Medicamento

1.  **Paciente (Frontend)**:
    *   Seleciona produto na associação.
    *   Seleciona a prescrição válida (NFT) que autoriza a compra.
2.  **Paciente (Blockchain)**:
    *   Chama `EscrowMarketplace.createOrder` enviando pagamento.
3.  **Associação**:
    *   Escuta evento `OrderCreated`.
    *   Verifica validade do NFT e estoque.
    *   Envia produto físico.
4.  **Conclusão**:
    *   Paciente confirma recebimento na blockchain.
    *   Pagamento liberado.

## 4. Decisões de Design

*   **Soulbound Tokens**: Escolhidos para evitar que prescrições sejam vendidas ou transferidas secundariamente, garantindo que apenas o paciente titular possa usá-la.
*   **IPFS + Encriptação**: Para garantir a conformidade com leis de proteção de dados (LGPD) e sigilo médico, nenhum dado legível é exposto na blockchain pública.
*   **Privy**: Utilizado para reduzir a fricção de entrada. Pacientes podem fazer login com email/Google e ter uma carteira criada automaticamente, sem precisar gerenciar chaves privadas complexas inicialmente.
*   **Hardhat**: Ambiente de desenvolvimento escolhido inicialmente pela familiaridade e robustez do ecossistema JavaScript/TypeScript. Migração para Foundry planejada para futuro.

## 5. Infraestrutura Futura (Backend)

*   **NestJS**: Será utilizado para indexar eventos da blockchain, fornecer API de leitura rápida para o frontend e gerenciar notificações off-chain (email/SMS).
*   **PostgreSQL**: Banco de dados para dados que não precisam estar on-chain (perfil de usuário detalhado, histórico de chat, logs de sistema).
