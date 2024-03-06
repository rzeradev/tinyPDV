#!/bin/bash
set -eo pipefail
IFS=$'\n\t'

# Source environment and format environment variables from .env into the format
# required for .env.deploy
export $(cat .env | sed -r "/^\s*$/d" | sed "s/^/BEE_/" | xargs -0)

# populate .env.docker with the contents from your environment
cat .env.deploy | envsubst | sed "s/^/BEE_/" > .env.docker
