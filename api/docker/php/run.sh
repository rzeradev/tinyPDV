#!/bin/sh

cd /var/www/html

# until [ $(mysql -u${BEE_DB_USERNAME:-$DB_USERNAME} -p${BEE_DB_PASSWORD:-$DB_PASSWORD} -h${BEE_DB_HOST:-$DB_HOST} -P${BEE_DB_PORT:-$DB_PORT} ${BEE_DB_DATABASE:-$DB_DATABASE} -sse "select count(*) from migrations;") -gt 0 ];

# do
#     echo "Waiting for DB to be ready... Connection Refused errors are normal."
#     echo "$BEE_DB_USERNAME"
#     echo "$DB_USERNAME" # why is this empty
#     echo "$BEE_DB_PASSWORD"
#     echo "$DB_PASSWORD" # why is this empty
#     echo "$BEE_DB_HOST"
#     echo "$DB_HOST" # why is this empty
#     echo "$BEE_DB_DATABASE"
#     echo "$DB_DATABASE" # why is this empty
#     echo "$BEE_DB_PORT"
#     sleep 5s
# done

# php artisan migrate --force
# chmod -R 0775 storage
# chown -R www-data:www-data storage

# php artisan config:clear
# rm -rf ./bootstrap/cache/*
# php artisan cache:clear

# # Let's cache the routes
# php artisan route:cache

# # Let's cache the views
# php artisan view:cache

# # Let's cache the config
# php artisan config:cache

# Let's dispose and rebuild the meilisearch indexes
# php artisan bee:sync:scout-meilisearch --flush

php-fpm
