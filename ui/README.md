# Frontend Web - Ticket Management Dashboard

Esta é a interface administrativa do sistema de gestão de chamados, desenvolvida com React e Vite. O dashboard foi projetado para oferecer uma experiência de usuário fluida e reativa, otimizada para a visualização e filtragem de grandes volumes de dados provenientes da API.

## 🛠️ Tecnologias Utilizadas

- **Framework:** React 18
- **Build Tool:** Vite
- **Data Fetching:** React Query (TanStack Query)
- **Estilização:** Tailwind CSS
- **Componentes:** Shadcn UI
- **Ícones:** Lucide React

## 🔧 Variáveis de Ambiente

As variáveis de ambiente do frontend são consumidas durante o tempo de build. Certifique-se de defini-las corretamente no seu arquivo `.env` ou como argumentos no Docker:

| Variável       | Descrição                                  | Valor Padrão            |
| -------------- | ------------------------------------------ | ----------------------- |
| `VITE_API_URL` | URL base para comunicação com o Backend    | `http://localhost:3333` |
| `VITE_TIMEOUT` | Tempo limite para requisições de rede (ms) | `5000`                  |

## 🚀 Como Rodar via Docker (Independente)

O frontend utiliza um build multi-estágio e é servido por um servidor Nginx Alpine para máxima performance.

### 1. Build da Imagem

Como as variáveis `VITE_` são injetadas no código estático, elas devem ser passadas como argumentos no build:

```bash
docker build -t ticket-frontend \
  --build-arg VITE_API_URL=http://localhost:3333 \
  --build-arg VITE_TIMEOUT=5000 .
```

### 2. Execução do Container

```bash
docker run -d \
  --name tickets-web \
  -p 80:80 \
  ticket-frontend
```

## 💻 Como Rodar Localmente (Desenvolvimento)

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível por padrão em `http://localhost:5173`.

## 📊 Funcionalidades do Dashboard

- **Visualização em Massa:** Tabela otimizada para renderizar grandes listas de chamados.
- **Busca Global:** Filtro em tempo real por termos contidos nos tickets.
- **Filtros Avançados:** Segmentação por nível de prioridade e status.
- **Ordenação Dinâmica:** Organização por data de criação, ID ou prioridade.
- **Gestão de Cache:** Sincronização automática com o backend via React Query para evitar carregamentos desnecessários.

## 📦 Estrutura de Produção

Ao realizar o build para produção, o Nginx é configurado para lidar com o roteamento do Single Page Application (SPA), garantindo que as rotas internas do React funcionem corretamente em Refresh ou acesso direto via URL.
