#!/usr/bin/env bash

set -x

npx http-server dist \
  --gzip \
  --brotli
