# Use official Node.js image
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todos os arquivos do código para dentro do contêiner
COPY . .

# Garantir que as variáveis de ambiente estejam disponíveis
COPY .env .env

# Rodar o script de inicialização primeiro e depois o servidor
CMD ["sh", "-c", "node src/database/init.js && npm run dev"]

