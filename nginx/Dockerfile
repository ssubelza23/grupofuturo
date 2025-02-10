FROM nginx:latest

# Copia el archivo de configuración del servidor virtual de Nginx
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copia el archivo de configuración principal de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expone los puertos en los que Nginx servirá la aplicación
EXPOSE 80
EXPOSE 443

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]