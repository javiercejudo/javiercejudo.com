#!/usr/bin/env bash

set -x

npx http-server . \
  --gzip \
  --brotli \
  --silent \
  -c-1 \
  -o src/static/
