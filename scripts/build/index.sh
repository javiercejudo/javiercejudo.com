#!/usr/bin/env bash

set -e

./scripts/build/pages.js
npx parcel build src/generated/**/*.html
