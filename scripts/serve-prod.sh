#!/usr/bin/env bash

set -x

# npx http-server dist \
#   --gzip \
#   --brotli
npx nf -e .env,.env.prod run node ./serve-prod.js
