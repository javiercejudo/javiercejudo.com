#!/bin/bash

if [ "$TRAVIS_BRANCH" = "staging" ]; then
    gem install wraith
fi

if [ "$TRAVIS_BRANCH" = "staging" -o "$ENV" = "dev" ]; then
    cd wraith/
    wraith capture live-vs-staging
    cd ..
    gulp publish-wraith
fi
