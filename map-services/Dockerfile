# Usa una imagen base de Node.js para construir la aplicación
FROM node:20 AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que la aplicación servirá
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["node", "src/app.js"]