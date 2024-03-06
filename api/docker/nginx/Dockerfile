FROM nginx:1.24.0-alpine

LABEL maintainer="Raoni Gomes <suporte@beeblock.com.br>"

ARG PHP_HOST=tinypdv-php

RUN apk --no-cache add curl

COPY ./docker/nginx/conf/ /etc/nginx/

RUN envsubst '${PHP_HOST}' < /etc/nginx/nginxconfig.io/php_fastcgi.conf > fastcgi.conf && \
    rm /etc/nginx/nginxconfig.io/php_fastcgi.conf && \
    mv fastcgi.conf /etc/nginx/nginxconfig.io/php_fastcgi.conf && \
    rm /etc/nginx/conf.d/default.conf && \
    adduser -u 1000 -D -S -G www-data www-data

COPY ./ /var/www/html

WORKDIR /var/www/html