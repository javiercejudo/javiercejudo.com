#!/usr/bin/env bash

set -x

# npx http-server dist \
#   --gzip \
#   --brotli
npx nf -e .env,.env.local run node ./serve-prod.js
