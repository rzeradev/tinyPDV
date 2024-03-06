#!/bin/bash

source ./util/util.sh

beeblock_header "tinyPDV"
beeblock_echo "Bringing Docker Containers Down!"

docker compose -p tiny_pdv down --remove-orphans
docker system prune -f
