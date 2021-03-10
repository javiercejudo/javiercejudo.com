#!/usr/bin/env bash

set -x

npx nodemon \
  --watch src/layouts \
  --watch src/pages \
  --watch src/static/css \
  --watch src/static/js \
  --watch lib \
  --watch scripts \
  -e mustache,html,css,js,sh,md \
  -x ./scripts/dev.sh
