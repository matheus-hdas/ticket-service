# Backend API - Ticket Management System

Esta é a API de alta performance responsável pela lógica de negócio e persistência de dados do sistema de chamados. Construída com Node.js e Prisma ORM, ela foi projetada para realizar operações eficientes em volumes superiores a 30.000 registros utilizando SQLite.

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js v20+
- **Framework:** Express
- **ORM:** Prisma
- **Banco de Dados:** SQLite
- **Linguagem:** TypeScript

## 🔧 Variáveis de Ambiente

O sistema utiliza as seguintes variáveis para configuração. Certifique-se de configurá-las no seu arquivo `.env` ou passá-las diretamente ao container Docker:

| Variável       | Descrição                                    | Valor Padrão           |
| -------------- | -------------------------------------------- | ---------------------- |
| `PORT`         | Porta onde o servidor será executado         | `3333`                 |
| `DATABASE_URL` | String de conexão do Prisma (SQLite)         | `file:/app/db/prod.db` |
| `FRONTEND_URL` | URL de origem permitida pelo CORS            | `http://localhost`     |
| `JWT_SECRET`   | Chave para assinatura de tokens de segurança | `(sua_chave_secreta)`  |

## 🚀 Como Rodar via Docker (Independente)

Para executar apenas este serviço de forma isolada do restante do ecossistema:

### 1. Build da Imagem

Execute o comando dentro da pasta do backend:

```bash
docker build -t ticket-api .
```

### 2. Execução do Container

Para garantir que o banco de dados SQLite seja persistido fora do ciclo de vida do container, mapeie a pasta do banco como um volume:

```bash
docker run -d \
  --name tickets-api \
  -p 3333:3333 \
  -v $(pwd)/db:/app/db \
  -e PORT=3333 \
  -e FRONTEND_URL=http://localhost \
  -e DATABASE_URL=file:/app/db/prod.db \
  ticket-api
```

## 💻 Como Rodar Localmente (Desenvolvimento)

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar o Servidor

```bash
npm start
```

## 🛣️ Documentação da API

### Endpoints de Tickets (`/tickets`)

| Método | Rota           | Descrição                                        |
| ------ | -------------- | ------------------------------------------------ |
| GET    | `/tickets`     | Lista tickets com suporte a filtros e paginação. |
| POST   | `/tickets`     | Registra um novo chamado.                        |
| GET    | `/tickets/:id` | Retorna os detalhes de um chamado específico.    |
| PUT    | `/tickets/:id` | Atualiza os campos de um chamado existente.      |
| DELETE | `/tickets/:id` | Remove permanentemente um chamado da base.       |

### 🔍 Parâmetros de Filtro (Query Params)

Para buscas em larga escala (+30k registros), a rota `GET` aceita:

- **`q`**: Busca textual por nome ou descrição.
- **`prioridade`**: Filtra por nível (`baixa`, `media`, `alta`, `critica`).
- **`sort`**: Define o campo de ordenação (ex: `criadoEm`).
- **`order`**: Direção da ordenação (`asc` ou `desc`).
- **`limit`**: Quantidade de itens por página (Padrão: 50).
