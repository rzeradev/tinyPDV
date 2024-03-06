#!/bin/bash

source ./util/util.sh

beeblock_header "tinyPDV"

if [ $# -eq 0 ]; then
    beeblock_echo "Logging tinyPDV Containers"
    docker compose -p tiny_pdv logs -f
elif [ "$1" = "php" ]; then
    beeblock_echo "Logging PHP Container"
    docker compose -p tiny_pdv logs -f tinypdv-php
elif [ "$1" = "nginx" ]; then
    beeblock_echo "Logging nginx Container"
    docker compose -p tiny_pdv logs -f tinypdv-nginx
fi
