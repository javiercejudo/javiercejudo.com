#!/usr/bin/env bash

set -e

./scripts/build/pages/index.js
npx parcel build --public-url '.' src/static/**/*.html
