# 📦 Self-Extracting HTML for QR Codes

Distribuição de páginas web completas dentro das limitações físicas de um QR Code, utilizando compressão e reconstrução dinâmica no frontend

# 📖 Visão Geral

QR Codes possuem uma limitação física rígida de armazenamento (≈3 KB no máximo teórico).
Este projeto demonstra uma arquitetura que permite embutir páginas HTML significativamente maiores dentro de um QR Code por meio de:

- Compressão agressiva
- Encoding otimizado
- Um loader HTML mínimo que descompacta e reconstrói a página no navegador.

O resultado é um artefato frontend autocontido, capaz de renderizar interfaces completas sem depender de servidores externos, CDNs ou conexões adicionais.

# 🎯 Objetivos
- Demonstrar a viabilidade técnica de HTML auto-descompactável
- Explorar limites de armazenamento de QR Codes
- Criar uma arquitetura reutilizável e profissional
- Permitir distribuição offline de conteúdo web
- Servir como base para estudos acadêmicos, PoCs e projetos experimentais

# 🧠 Conceito Central
O sistema funciona como um Self-Extracting Frontend Artifact, onde:
1. Um HTML mínimo (loader) é carregado
Um payload compactado é descompactado em tempo de execução
2. O DOM inteiro é reconstruído dinamicamente
3. Esse padrão é inspirado em executáveis auto-extraíveis e técnicas de bootstrapping.

# 🏗️ Arquitetura
┌────────────────────────────┐
│ QR Code / Offline Storage │
└────────────┬───────────────┘
             ↓
┌────────────────────────────┐
│ Loader Runtime (≤ 1 KB)    │
│ - JavaScript mínimo        │
│ - Função de descompressão  │
│ - Tratamento de erros      │
└────────────┬───────────────┘
             ↓
┌────────────────────────────┐
│ Payload Compactado         │
│ - HTML completo            │
│ - CSS inline               │
│ - JS inline                │
└────────────┬───────────────┘
             ↓
┌────────────────────────────┐
│ Reconstrução do DOM        │
│ - document.write / replace │
└────────────────────────────┘

# 📁 Estrutura do Projeto
project/
├─ src/
│  ├─ app.html        # Página HTML real (conteúdo)
│  ├─ loader.html     # Loader mínimo
│  └─ build.js        # Pipeline de build
│
├─ dist/
│  └─ index.html      # HTML final (QR-ready)
│
└─ README.md

#⚙️ Pipeline de Build

O processo de build segue as seguintes etapas:

1. Authoring

- HTML estático
- CSS inline
- JS inline

2. Minificação

- Remoção de espaços, quebras de linha e comentários

3. Compressão

- LZ-String (compressToEncodedURIComponent)

4. Encoding

- Seguro para inclusão direta em <script>

5. Injeção

- Payload compactado inserido no loader

6. Validação

- Tamanho final
- Teste de descompressão
- Compatibilidade com navegadores móveis

# 🚀 Como Usar

1. Pré-requisitos

- Node.js ≥ 18
- npm ou yarn

2. Instalação

- npm install lz-string

3. Build

- node src/build.js

O arquivo final será gerado em:

dist/index.html

Este arquivo pode ser:
- Convertido diretamente em QR Code
- Armazenado offline
- Distribuído sem servidor

# 📏 Limitações Conhecidas

- Tamanho máximo prático do QR Code: ~1.2 KB – 2 KB
- Não recomendado para:
    - Frameworks frontend (React, Vue, Angular)
    - Imagens raster grandes
    - Fontes externas
- Todo o conteúdo deve ser autocontido

# 🔐 Considerações de Segurança
- Não utiliza eval
- Nenhuma dependência externa no runtime
- Loader imutável
- Payload gerado em build time
- Execução restrita ao contexto do navegador
Opcionalmente:
- Hash do payload
- Verificação de integridade

# 📈 Casos de Uso

- Educação offline
- QR Codes em museus e exposições
- Cartões de visita digitais
- Sistemas embarcados
- Arte generativa
- Capture The Flag (CTF)
- Provas de conceito acadêmicas

# 🧪 Métricas Relevantes

- Taxa de leitura do QR
- Tempo de descompressão
- Compatibilidade mobile
- Densidade visual do QR Code

# 🧩 Possíveis Extensões

- Base45 para maior eficiência
- Suporte a múltiplos payloads
- Assinatura criptográfica
- Geração automática de QR
- Fallback progressivo
- Suporte a NFC