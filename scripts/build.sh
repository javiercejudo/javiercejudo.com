#!/usr/bin/env bash

set -e
set -x

npx nf -e .env,.env.prod.local run ./scripts/build-pages.js

npx parcel build \
  --public-url '.' \
  --experimental-scope-hoisting \
  src/static/**/**/*.html

# Necessary because Parcel hashes XML files like the RSS feed so we opt
# out of having Parcel process it by referencing it with an absolut URL
npx cpy '**/*.xml' '../../dist/' --cwd=src/static --parents
