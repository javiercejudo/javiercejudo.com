#!/usr/bin/env bash

set -x

npx nf -e .env,.env.local run npx nodemon ./serve-dev.js &
npx open-cli http:localhost:8081/src/static/index.html
