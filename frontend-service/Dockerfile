# Usa una imagen base de Node.js
FROM node:20 AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen de servidor web para servir la aplicación
FROM nginx:alpine

# Copia los archivos estáticos construidos en la etapa anterior
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
