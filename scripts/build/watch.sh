#!/usr/bin/env bash

npx nodemon \
  --watch src/layouts \
  --watch src/pages \
  --watch src/static/css \
  --watch src/static/js \
  --watch scripts/build \
  -e mustache,html,css,js \
  -x ./scripts/build/index.sh
