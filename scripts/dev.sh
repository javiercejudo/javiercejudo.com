#!/usr/bin/env bash

set -x

npx nf -e .env,.env.local run ./scripts/build-pages.js
