#!/bin/bash

bower install
gulp

if [ "$CONTINUOUS_INTEGRATION" = "true" -o "$ENV" = "live" ]; then
    gulp publish-build
fi
