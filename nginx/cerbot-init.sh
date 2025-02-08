#!/bin/bash

# filepath: /c:/Recuperado/grupoFuturo/nginx/certbot-init.sh
docker-compose run --rm --entrypoint "\
  certbot certonly --webroot --webroot-path=/var/www/certbot \
  --email ssubelza23@gmail.com --agree-tos --no-eff-email \
  -d www.grupofuturo.com.ar -d grupofuturo.com.ar" certbot