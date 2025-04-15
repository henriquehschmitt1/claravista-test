# Estágio de construção
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NEXT_PUBLIC_API_URL=http://localhost:3000
ENV NODE_ENV=development

# Expose the development port
EXPOSE 3001

# Run the development server
CMD ["npx", "next", "dev", "--turbopack", "-p", "3001"]