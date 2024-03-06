# Use an official PHP-FPM runtime as a parent image
FROM php:8.1-fpm

LABEL maintainer="Raoni Gomes <suporte@beeblock.com.br>"

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libmcrypt-dev \
    default-mysql-client \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    && docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install -j$(nproc) pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install npm
RUN apt-get update && apt-get install -y \
    software-properties-common \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Copy the current directory contents into the container at /var/www/html
COPY ./ /var/www/html

# For file based opcaching
RUN mkdir -p /var/www/opcache

# Get our php.ini file into the image
COPY ./docker/php/php.ini "$PHP_INI_DIR/php.ini"
COPY ./docker/php/conf.d/opcache.ini "$PHP_INI_DIR/conf.d/opcache.ini"
# COPY ./docker/php/conf.d/msgpack.ini "$PHP_INI_DIR/conf.d/msgpack.ini"
# COPY ./docker/php/conf.d/igbinary.ini "$PHP_INI_DIR/conf.d/igbinary.ini"
COPY ./docker/php/www.conf "/usr/local/etc/php-fpm.d/www.conf"

# Set the working directory to /var/www/html
WORKDIR /var/www/html

RUN cp .env.deploy .env

# Make port 9000 available to the world outside this container
EXPOSE 9000

RUN chmod -R 775 storage && \
    chown -R www-data:www-data storage

CMD ["./docker/php/run.sh"]
