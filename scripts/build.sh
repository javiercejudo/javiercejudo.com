#!/usr/bin/env bash

set -e
set -x

npx nf -e .env,.env.prod run ./scripts/build-pages.js

npx parcel build \
  --public-url '.' \
  --experimental-scope-hoisting \
  src/static/**/*.html
