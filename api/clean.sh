#!/bin/bash

echo "Running commands"

# Run php artisan route:cache
php artisan route:cache
php artisan config:clear

echo "Done!!"
