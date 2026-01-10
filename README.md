# 🎫 Sistema de Gestão de Tickets

Sistema de alta performance para gestão de chamados, otimizado para lidar com volumes de +30k registos, utilizando Node.js, React e SQLite.

## 🚀 Como Rodar o Projeto (Docker)

A forma mais rápida de subir o sistema completo (Frontend + Backend + Banco de Dados) é utilizando o Docker Compose.

1.  **Pré-requisitos:** Docker e Docker Compose instalados.
2.  **Comando Pra rodar (Nova Engine do Docker Compose):**
    ```bash
    docker compose up -d --build
    ```
3.  **Comando Pra rodar (Engine Antiga do Docker Compose):**
    ```bash
    docker-compose up -d --build
    ```
4.  **Acesso:**
    - **Frontend:** [http://localhost](http://localhost)
    - **Backend (API):** [http://localhost:3333](http://localhost:3333)

## 📁 Estrutura do Repositório

- [**Backend (Node.js)**](./api/README.md): API REST com Prisma e SQLite.
- [**Frontend (React)**](./ui/README.md): Dashboard moderno com Shadcn UI e Vite.

## 🛠️ Comandos Úteis

- `docker compose down`: Parar todos os serviços (Nova Engine do Docker Compose).
- `docker-compose down`: Parar todos os serviços (Engine Antiga do Docker Compose).
