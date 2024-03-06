#!/bin/bash

function beeblock_echo {
    echo -e "\n\033[1m\033[92mBEEBLOCK ===========>\033[0m \033[1m\033[97m$1 \033[0m\033[1m\033[92m"
}

function beeblock_error {
    echo -e "\n\033[1m\033[92mBEEBLOCK ===========>\033[0m \033[1m\033[97m$1 \033[0m\033[1m\033[92m"
}

function beeblock_header () {
    fonts=("standard" "speed" "larry3d" "basic" "doom")

    font_count=${#fonts[@]}

    random_index=$((RANDOM % font_count))

    selected_font=${fonts[$random_index]}

    figlet -f "$selected_font" -w 92 $1 | lolcat
}