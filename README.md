<div align="center">

# 💰 Comparador Financeiro

**Ferramenta profissional para análise e comparação de investimentos: Imóveis vs Tesouro Direto**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[Características](#-características) • [Demo](#-demo) • [Instalação](#-instalação) • [Como Usar](#-como-usar) • [Cálculos Financeiros](#-cálculos-financeiros) • [Stack](#-stack-tecnológica)

</div>

---

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Sobre o Desenvolvedor](#-sobre-o-desenvolvedor)
- [Características](#-características)
- [Stack Tecnológica](#-stack-tecnológica)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Cálculos Financeiros](#-cálculos-financeiros)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Build para Produção](#-build-para-produção)
- [Contribuindo](#-contribuindo)

---

## 🎯 Visão Geral

O **Comparador Financeiro** é uma aplicação web de nível profissional desenvolvida para auxiliar investidores na tomada de decisão entre **investir em imóveis para aluguel** ou aplicar no **Tesouro Direto**. A ferramenta oferece análises financeiras completas e precisas, considerando todos os custos, impostos e variáveis relevantes do mercado brasileiro.

### Por que usar esta ferramenta?

Investir em imóveis ou Tesouro Direto? Esta é uma das decisões financeiras mais importantes e complexas. Esta aplicação elimina as suposições e fornece dados concretos baseados em cálculos financeiros profissionais:

- **TIR (Taxa Interna de Retorno)**: Compare a rentabilidade real de cada investimento
- **VPL (Valor Presente Líquido)**: Entenda o valor presente dos fluxos futuros
- **Renda Mensal Equivalente (RME)**: Veja quanto cada investimento "pagaria" mensalmente
- **Simulação de Cenários**: Ajuste variáveis e veja impactos em tempo real
- **Análise Completa de Custos**: ITBI, corretagem, manutenção, vacância, IR regressivo e mais

### Diferenciais

✅ **Cálculos Profissionais**: Motor financeiro completo com TIR, VPL e fluxo de caixa descontado  
✅ **IR Regressivo Automático**: Considera a tabela regressiva do Tesouro Direto (22,5% → 15%)  
✅ **Todos os Custos Incluídos**: IPTU, condomínio, seguro, manutenção, vacância, inadimplência  
✅ **Interface Moderna**: Design responsivo e intuitivo com gráficos interativos  
✅ **100% Gratuito**: Open source e sem limitações

---

## 👨‍💻 Sobre o Desenvolvedor

<div align="center">

**Desenvolvido por Rafael Vieira (TechBeme)**

[![GitHub](https://img.shields.io/badge/GitHub-TechBeme-181717?logo=github)](https://github.com/TechBeme)
[![Fiverr](https://img.shields.io/badge/Fiverr-Tech__Be-1DBF73?logo=fiverr)](https://www.fiverr.com/tech_be)
[![Upwork](https://img.shields.io/badge/Upwork-Profile-14a800?logo=upwork)](https://www.upwork.com/freelancers/~01f0abcf70bbd95376)
[![Email](https://img.shields.io/badge/Email-contact@techbe.me-EA4335?logo=gmail)](mailto:contact@techbe.me)

### 🚀 Precisa de uma Aplicação Web Personalizada?

Especializado em **aplicações financeiras**, **dashboards interativos**, **automação** e **ferramentas empresariais**.

**Desenvolvedor Full Stack** com expertise em:
- 💰 **Aplicações Financeiras**: Calculadoras, dashboards, análise de investimentos
- 🎨 **Frontend Moderno**: React, Next.js, TypeScript, Tailwind CSS
- ⚡ **Performance**: Vite, otimização de build, SEO
- 📊 **Visualização de Dados**: Recharts, gráficos interativos, relatórios
- 🔄 **Integrações**: APIs REST, webhooks, automação de processos

**Entre em contato para transformar sua ideia em realidade!**

📧 [contact@techbe.me](mailto:contact@techbe.me)

</div>

---

## ✨ Características

### 🏠 Análise de Imóvel para Aluguel

- **Preço do Imóvel**: Valor de compra e custos de aquisição (ITBI, cartório, etc)
- **Receita de Aluguel**: Valor mensal, reajuste anual, vacância, inadimplência
- **Valorização**: Taxa de apreciação do imóvel ao longo do tempo
- **Despesas Operacionais**: 
  - Condomínio, IPTU, seguro (configurável quem paga)
  - Taxa de administração imobiliária
  - Manutenção preventiva e corretiva
  - Corretagem na locação
- **Impostos**: Imposto de Renda sobre aluguel (cálculo simplificado ou carnê-leão)

### 📈 Análise de Tesouro Direto

- **Investimento Inicial**: Sincronizado automaticamente com o custo total do imóvel
- **Aportes Mensais**: Valor mensal de contribuição adicional
- **Tipos de Título**:
  - **Tesouro Selic**: Taxa pós-fixada
  - **Tesouro IPCA+**: Taxa real + inflação
  - **Tesouro Prefixado**: Taxa fixa
- **Taxas**: Corretagem e custódia B3 (padrão 0,20% a.a.)
- **IR Regressivo**: Automático (22,5% → 20% → 17,5% → 15%)

### 📊 Métricas Financeiras

| Métrica | Descrição |
|---------|-----------|
| **TIR** | Taxa Interna de Retorno - rentabilidade anual efetiva |
| **VPL** | Valor Presente Líquido - valor atual dos fluxos futuros |
| **RME** | Renda Mensal Equivalente - "salário" que o investimento paga |
| **Retorno Total** | Ganho/perda absoluto no horizonte de tempo |
| **Patrimônio Final** | Valor total do ativo + caixa acumulado |

### 📉 Visualizações

- **Gráfico de Evolução Patrimonial**: Compare o crescimento dos dois investimentos
- **Gráfico Líquido vs Bruto**: Veja o patrimônio descontando os aportes iniciais
- **Tabela de Fluxo de Caixa**: Acompanhe mês a mês receitas, despesas e saldos
- **Cards Comparativos**: Visualize métricas lado a lado com indicador de melhor opção

---

## 🛠️ Stack Tecnológica

### Core

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | 5.8.3 | Linguagem principal com tipagem estática |
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) | 18.3.1 | Biblioteca para construção de UI |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | 7.3.1 | Build tool e dev server ultra-rápido |

### UI & Design

| Ferramenta | Versão | Uso |
|------------|--------|-----|
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) | 3.4.17 | Framework CSS utilitário |
| **shadcn/ui** | - | Componentes acessíveis e customizáveis |
| **Radix UI** | - | Primitivas de UI sem estilo |
| **Lucide Icons** | 0.462.0 | Ícones SVG modernos |

### Gráficos & Dados

| Biblioteca | Versão | Uso |
|------------|--------|-----|
| **Recharts** | 2.15.4 | Gráficos interativos responsivos |
| **React Hook Form** | 7.61.1 | Gerenciamento de formulários |
| **Zod** | 3.25.76 | Validação de schemas TypeScript-first |

### Otimizações

- **Tree-shaking**: Bundling otimizado com Vite
- **Code-splitting**: Carregamento lazy de rotas
- **CSS Purge**: Tailwind remove classes não utilizadas
- **TypeScript Strict Mode**: Máxima segurança de tipos

---

## 📦 Instalação

### Pré-requisitos

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+ ou **yarn** v1.22+
- **Git** ([Download](https://git-scm.com/))

### Instalação Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/TechBeme/Comparador-Financeiro.git
cd Comparador-Financeiro

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Acesse no navegador
# http://localhost:5173
```

### Alternativas de Instalação

**Usando Yarn:**
```bash
yarn install
yarn dev
```

**Usando Bun:**
```bash
bun install
bun run dev
```

---

## 🎮 Como Usar

### 1. Configuração Inicial

Ao abrir a aplicação, você verá três seções principais:

#### 📍 Parâmetros Gerais
- **Horizonte de Investimento**: Período de análise (1-30 anos)
- **Taxa de Desconto**: Taxa para cálculo do VPL (sugestão: IPCA + 6% a.a.)

#### 🏠 Dados do Imóvel
Configure o investimento imobiliário:
- Valor do imóvel e custos de aquisição
- Aluguel mensal esperado e reajuste anual
- Despesas (condomínio, IPTU, seguro, manutenção)
- Taxas (administração, corretagem)
- Parâmetros de risco (vacância, inadimplência)

#### 📊 Dados do Tesouro Direto
Configure o investimento em renda fixa:
- O valor inicial é sincronizado automaticamente com o custo do imóvel
- Escolha o tipo de título (Selic, IPCA+ ou Prefixado)
- Configure aportes mensais (opcional)
- Taxas são pré-configuradas (custódia B3 0,20% a.a.)

### 2. Análise dos Resultados

#### Cartões de Métricas

Visualize lado a lado:
- **Patrimônio Final**: Valor total após o período
- **Retorno Total**: Ganho absoluto e percentual
- **TIR**: Taxa Interna de Retorno (rentabilidade anual)
- **VPL**: Valor Presente Líquido
- **Renda Mensal Equivalente**: "Salário" que o investimento paga

🏆 **Indicador de Vencedor**: O melhor investimento é destacado em verde

#### Gráficos Interativos

**Evolução Patrimonial**
- Linha azul: Imóvel (valor do ativo + caixa operacional)
- Linha verde: Tesouro Direto (valor aplicado + rendimentos)
- Passe o mouse para ver valores detalhados

**Patrimônio Líquido vs Bruto**
- Compare o patrimônio bruto (total) com o líquido (descontando aportes)
- Veja o verdadeiro ganho de cada investimento

### 3. Simulação de Cenários

Experimente diferentes cenários ajustando:

**Cenário Conservador:**
- Aluguel: valor mais baixo
- Vacância: 1-2 meses/ano
- Valorização: 3-4% a.a.
- Tesouro: IPCA+ 6%

**Cenário Moderado:**
- Aluguel: valor médio de mercado
- Vacância: 0,5 meses/ano
- Valorização: 5% a.a.
- Tesouro: IPCA+ 6,5%

**Cenário Otimista:**
- Aluguel: valor acima da média
- Vacância: 0 meses
- Valorização: 7% a.a.
- Tesouro: IPCA+ 7%

### 4. Interpretação das Métricas

| Métrica | Como Interpretar | Quando é Bom |
|---------|------------------|--------------|
| **TIR** | Rentabilidade anual efetiva | > Taxa de desconto + 2% |
| **VPL** | Valor presente dos ganhos futuros | > 0 (positivo) |
| **RME** | Renda mensal que o investimento "paga" | Quanto maior, melhor |
| **Retorno Total** | Ganho absoluto no período | > 100% do investimento |

**Exemplo de Análise:**
- TIR Imóvel: 12,5% a.a. vs TIR Tesouro: 10,2% a.a.
- ✅ Imóvel é 2,3 p.p. mais rentável
- VPL Imóvel: R$ 85.000 vs VPL Tesouro: R$ 62.000
- ✅ Imóvel agrega R$ 23.000 mais de valor presente

---

## 🧮 Cálculos Financeiros

### Metodologia

A aplicação utiliza conceitos avançados de matemática financeira para fornecer análises precisas:

#### 1. Fluxo de Caixa Mensal

**Imóvel:**
```
Receita Mensal = Aluguel × (1 - Vacância) × (1 - Inadimplência)
Despesas = Condomínio + IPTU + Seguro/12 + Administração + Manutenção
IR Mensal = (Receita - Despesas Dedutíveis) × Alíquota
Fluxo Líquido = Receita - Despesas - IR
```

**Tesouro Direto:**
```
Rendimento Mensal = Saldo × (1 + TaxaMensal) - Saldo
Custódia Mensal = Saldo × 0,20% / 12
IR = Rendimento Semestral × Alíquota Regressiva
Fluxo Líquido = Rendimento - Custódia - IR
```

#### 2. Taxa Interna de Retorno (TIR)

Equação fundamental:
```
VPL = Σ [FCt / (1 + TIR)^t] = 0
```
Onde:
- `FCt` = Fluxo de caixa no período t
- `TIR` = Taxa Interna de Retorno
- `t` = Período (mês)

**Interpretação:**
- TIR > Taxa de desconto: Investimento viável
- TIR > CDI/Selic: Supera renda fixa conservadora
- TIR > Inflação + 6%: Excelente rentabilidade real

#### 3. Valor Presente Líquido (VPL)

Fórmula:
```
VPL = Σ [FCt / (1 + r)^t] - Investimento Inicial
```
Onde:
- `r` = Taxa de desconto
- `FCt` = Fluxo de caixa do período t

**Interpretação:**
- VPL > 0: Investimento agrega valor
- VPL < 0: Destrói valor, evitar
- VPL maior = melhor investimento

#### 4. Renda Mensal Equivalente (RME)

Calculada usando a fórmula PMT (anuidade):
```
RME = VPL × [r × (1 + r)^n] / [(1 + r)^n - 1]
```

Representa quanto você receberia mensalmente se o VPL fosse convertido em uma renda perpétua.

#### 5. IR Regressivo (Tesouro Direto)

| Prazo | Alíquota |
|-------|----------|
| Até 180 dias | 22,5% |
| 181 a 360 dias | 20% |
| 361 a 720 dias | 17,5% |
| Acima de 720 dias | 15% |

Aplicado automaticamente sobre os rendimentos semestrais.

#### 6. Valorização do Imóvel

Calculada mensalmente com juros compostos:
```
ValorMês = ValorInicial × (1 + TaxaMensal)^mês
TaxaMensal = (1 + TaxaAnual)^(1/12) - 1
```

### Premissas e Limitações

#### Premissas Adotadas

✅ **Inflação**: Não considerada explicitamente (use taxas reais ou nominais consistentes)  
✅ **Liquidez**: Tesouro tem liquidez diária, imóvel demora 3-6 meses para vender  
✅ **Custos de Saída**: Não incluídos (corretagem de venda do imóvel ~6%, Tesouro isento)  
✅ **Aluguel**: Considerado pago regularmente (desconta vacância e inadimplência)  
✅ **Manutenção**: Calculada como % do valor do imóvel (padrão 0,6% a.a.)

#### Limitações

⚠️ **Impostos Simplificados**: IR sobre aluguel usa alíquota efetiva (não considera carnê-leão completo)  
⚠️ **Custos Extraordinários**: Reformas grandes e despesas judiciais não incluídos  
⚠️ **Risco de Mercado**: Não considera crises, mudanças econômicas ou oscilações bruscas  
⚠️ **Localização**: Premissas baseadas em mercado urbano desenvolvido (SP, RJ, etc)

---

## 📂 Estrutura do Projeto

```
Comparador-Financeiro/
├── public/                    # Arquivos estáticos
│   └── robots.txt
├── src/
│   ├── components/           # Componentes React
│   │   ├── ComparisonChart.tsx      # Gráficos de comparação
│   │   ├── MetricCard.tsx           # Cards de métricas
│   │   ├── RealEstateForm.tsx       # Formulário imóvel
│   │   ├── TesouroForm.tsx          # Formulário Tesouro
│   │   └── ui/                      # Componentes shadcn/ui
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── switch.tsx
│   │       └── ...
│   ├── hooks/                # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                  # Utilitários e lógica de negócio
│   │   ├── financial-calculator.ts  # Motor de cálculo financeiro
│   │   └── utils.ts                  # Funções utilitárias
│   ├── pages/                # Páginas da aplicação
│   │   ├── Index.tsx                # Página principal
│   │   └── NotFound.tsx             # Página 404
│   ├── App.tsx               # Componente raiz
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globais
├── components.json           # Configuração shadcn/ui
├── eslint.config.js          # Configuração ESLint
├── index.html                # HTML raiz
├── package.json              # Dependências e scripts
├── postcss.config.js         # Configuração PostCSS
├── tailwind.config.ts        # Configuração Tailwind CSS
├── tsconfig.json             # Configuração TypeScript
├── vite.config.ts            # Configuração Vite
└── README.md                 # Este arquivo
```

### Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| `src/lib/financial-calculator.ts` | Motor de cálculo com TIR, VPL, fluxos de caixa |
| `src/pages/Index.tsx` | Página principal com formulários e resultados |
| `src/components/ComparisonChart.tsx` | Gráficos Recharts para visualização |
| `src/components/MetricCard.tsx` | Cards comparativos de métricas |
| `src/components/RealEstateForm.tsx` | Formulário de configuração do imóvel |
| `src/components/TesouroForm.tsx` | Formulário de configuração do Tesouro |

---

## 🏭 Build para Produção

### Build Local

```bash
# Gerar build otimizado
npm run build

# O output estará em dist/
# Testar o build localmente
npm run preview
```

### Deploy

A aplicação pode ser deployada em qualquer serviço de hospedagem estática:

#### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy em produção
vercel --prod
```

#### Netlify

```bash
# Build
npm run build

# No Netlify:
# - Build command: npm run build
# - Publish directory: dist
```

#### GitHub Pages

```bash
# Configurar base no vite.config.ts
base: '/Comparador-Financeiro/'

# Build
npm run build

# Deploy para gh-pages branch
npx gh-pages -d dist
```

#### Docker

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build imagem
docker build -t comparador-financeiro .

# Rodar container
docker run -p 8080:80 comparador-financeiro
```

### Otimizações de Build

O projeto já vem configurado com:

✅ **Tree-shaking**: Remove código não utilizado  
✅ **Minificação**: JavaScript e CSS minificados  
✅ **Code-splitting**: Carregamento lazy de rotas  
✅ **CSS Purge**: Tailwind remove classes não usadas  
✅ **Compression**: Gzip automático no Vite  

**Tamanho do bundle:** ~150KB gzipped

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você encontrou um bug ou tem uma sugestão:

### Como Contribuir

1. **Fork o projeto**
```bash
git clone https://github.com/TechBeme/Comparador-Financeiro.git
```

2. **Crie uma branch para sua feature**
```bash
git checkout -b feature/minha-feature
```

3. **Faça commit das mudanças**
```bash
git commit -m "feat: adiciona nova funcionalidade"
```

4. **Push para o GitHub**
```bash
git push origin feature/minha-feature
```

5. **Abra um Pull Request**

### Convenções de Código

- **TypeScript Strict Mode**: Sempre tipado
- **ESLint**: Seguir regras configuradas
- **Commits Semânticos**:
  - `feat:` Nova funcionalidade
  - `fix:` Correção de bug
  - `docs:` Documentação
  - `style:` Formatação
  - `refactor:` Refatoração
  - `test:` Testes
  - `chore:` Manutenção

### Ideias para Contribuição

- 📊 Adicionar mais tipos de gráficos
- 💰 Incluir outros investimentos (ações, FIIs, CDBs)
- 📱 Melhorar responsividade mobile
- 🌍 Internacionalização (i18n)
- 📤 Exportar relatórios em PDF
- 💾 Salvar simulações no localStorage
- 🧪 Adicionar testes unitários

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Suporte

Encontrou algum problema ou tem dúvidas?

- 🐛 **Issues**: [GitHub Issues](https://github.com/TechBeme/Comparador-Financeiro/issues)
- 📧 **Email**: [contact@techbe.me](mailto:contact@techbe.me)
- 💼 **Fiverr**: [Tech_Be](https://www.fiverr.com/tech_be)
- 💼 **Upwork**: [Rafael Vieira](https://www.upwork.com/freelancers/~01f0abcf70bbd95376)

---

## ⭐ Mostre seu apoio

Se este projeto foi útil para você, considere:

- ⭐ Dar uma estrela no GitHub
- 🔄 Compartilhar com amigos investidores
- 🐦 Tweetar sobre o projeto
- 💰 [Me pagar um café](https://www.buymeacoffee.com/techbeme) ☕

---

<div align="center">

**Desenvolvido com ❤️ por [Rafael Vieira](https://github.com/TechBeme)**

[![GitHub](https://img.shields.io/badge/GitHub-TechBeme-181717?logo=github)](https://github.com/TechBeme)
[![Fiverr](https://img.shields.io/badge/Fiverr-Tech__Be-1DBF73?logo=fiverr)](https://www.fiverr.com/tech_be)
[![Email](https://img.shields.io/badge/Email-contact@techbe.me-EA4335?logo=gmail)](mailto:contact@techbe.me)

</div>


A aplicação estará disponível em `http://localhost:5173`

## 🏗️ Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## 📝 Como Usar

1. **Dados do Imóvel**: Insira o valor do imóvel, aluguel esperado, custos de aquisição
2. **Parâmetros do Tesouro**: Configure a taxa de juros e período de investimento
3. **Análise**: Visualize os resultados comparativos com gráficos e métricas
4. **Decisão**: Use as análises de TIR, VPL e fluxo de caixa para tomar sua decisão

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**TechBe**
- GitHub: [@TechBeme](https://github.com/TechBeme)

## 🌟 Mostre seu Apoio

Se este projeto te ajudou, considere dar uma ⭐️!

---

Desenvolvido com 💙 por [TechBe](https://github.com/TechBeme)
