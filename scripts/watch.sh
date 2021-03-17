#!/usr/bin/env bash

set -x

npx nodemon \
  --watch src/layouts \
  --watch src/pages \
  --watch src/components \
  --watch src/static/assets \
  --watch lib \
  --watch scripts \
  -e mustache,html,css,js,sh,md \
  -x ./scripts/dev.sh
