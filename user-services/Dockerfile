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

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:latest

# Copia los archivos construidos desde la etapa de construcción al directorio de Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copia el archivo de configuración del servidor virtual de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Expone el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]