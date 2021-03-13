#!/usr/bin/env bash

set -x

npx nodemon ./serve-dev.js &
npx open-cli http:localhost:8081/src/static/index.html
