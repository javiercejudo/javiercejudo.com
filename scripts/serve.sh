#!/usr/bin/env bash

npx http-server . --gzip --brotli --silent -c-1 -o src/static/
