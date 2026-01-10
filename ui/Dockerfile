# Estágio 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza cache das camadas)
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Injeta a URL do backend durante o build (necessário para o Vite)
# Isso permite que você mude o backend sem mexer no código
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_TIMEOUT
ENV VITE_TIMEOUT=$VITE_TIMEOUT

RUN npm run build

# Estágio 2: Produção
FROM nginx:stable-alpine

# Copia o build do estágio anterior para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia uma configuração para o Nginx não dar erro 404 em rotas do React
# Se não tiver o arquivo customizado, pode remover a linha abaixo por enquanto
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]