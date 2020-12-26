#!/usr/bin/env bash

npx nodemon \
  --watch src/layouts \
  --watch src/pages \
  --watch src/static/css \
  --watch src/static/js \
  --watch scripts \
  -e mustache,html,css,js,sh \
  -x ./scripts/dev.sh
