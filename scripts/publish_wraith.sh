#!/bin/bash

if [ "$TRAVIS_BRANCH" = "staging" ]; then
    gem install wraith
    cd wraith/
    wraith capture config
    cd ..
    gulp publish-wraith
fi
