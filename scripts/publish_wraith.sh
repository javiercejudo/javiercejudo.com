#!/bin/bash

if [ "$TRAVIS_BRANCH" = "staging" ]; then
    gem install wraith
    cd wraith/
    wraith capture live-vs-staging
    cd ..
    gulp publish-wraith
fi
