# Dockerfile for Node.js app
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copiar solo package.json y package-lock.json para instalar dependencias primero (cache eficiente)
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --production

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa la app
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "index.js"]
