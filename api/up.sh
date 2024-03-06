#!/bin/bash

source ./util/util.sh

beeblock_header "tinyPDV"
beeblock_echo "Bringing Docker Containers Up!"

./docker/generate_docker_env.sh
docker compose -p tiny_pdv up -d
