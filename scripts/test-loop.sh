#!/bin/bash

SUCCESS=0;
COUNT=0;
ITERATIONS=1;

if [ -n "$1" ]; then
    let ITERATIONS=$1
fi

while [ $COUNT -lt $ITERATIONS ]; do
    let COUNT+=1

    if grunt karma:dev; then
        let SUCCESS+=1
    fi

    echo Success rate: $SUCCESS/$COUNT
done

if hash notify-send 2>/dev/null; then
    notify-send "JavierCejudo.com test loop" "Success rate: $SUCCESS/$ITERATIONS"
fi
