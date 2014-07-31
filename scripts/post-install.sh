#!/bin/bash

bower install
gulp

if [ "$CONTINUOUS_INTEGRATION" = "true" ] || ["$ENV" = "live" ]; then
    gulp publish-build
fi
