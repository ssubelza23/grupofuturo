# Utiliza una imagen base de Node.js para construir la aplicación
FROM node:20 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Utiliza una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]