#!/usr/bin/env bash

set -e

npx nf -e .env,.env.prod run ./scripts/build-pages.js
npx parcel build --public-url '.' src/static/**/*.html
