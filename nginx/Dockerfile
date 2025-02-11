# Usa una imagen base de Nginx
FROM nginx:latest

# Copia el archivo de configuración de Nginx
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

# Expone los puertos en los que Nginx servirá la aplicación
EXPOSE 80
EXPOSE 443

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]