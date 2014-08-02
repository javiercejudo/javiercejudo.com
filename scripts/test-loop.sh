#!/bin/bash

SUCCESS=0;
FAILURES=0;
TOTAL=0;
ITERATIONS=1;

if [ -n "$1" ]; then
    let ITERATIONS=$1
fi

while [ $TOTAL -lt $ITERATIONS ]; do
    let TOTAL+=1

    if grunt karma:dev; then
        let SUCCESS+=1
    else
        let FAILURES+=1
    fi

    echo Success rate: $SUCCESS/$TOTAL
done

if hash notify-send 2>/dev/null; then
    notify-send "Test loop" "Done ($SUCCESS/$TOTAL)"
fi
