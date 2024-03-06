#!/bin/bash

source ./util/util.sh

beeblock_header "tinyPDV
beeblock_echo "Running PHP-CS-Fixer!"

php-cs-fixer fix --config=.php-cs-fixed.dist.php
