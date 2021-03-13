#!/usr/bin/env bash

set -x

npx nf run ./scripts/build-pages.js

mv molino-registry.txt molino-registry-2.txt
npx neek -i molino-registry-2.txt -o molino-registry.txt
rm -f molino-registry-2.txt
