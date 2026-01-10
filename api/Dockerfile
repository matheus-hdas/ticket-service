FROM node:20-slim

# Essencial para o binário do Prisma rodar no Linux
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Instala as dependências
COPY package*.json ./
RUN npm install

# Copia o código e garante a existência da pasta do banco
COPY . .
RUN mkdir -p /app/db

EXPOSE 3333

# O seu npm start já vai disparar: prisma generate + migrate deploy + node server
CMD ["npm", "start"]