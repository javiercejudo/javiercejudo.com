#!/bin/bash

function jcecho {
    echo "==> javiercejudo.com: $1"
}

{
    while [[ ! -e /tmp/heroku.fcgi.5000.sock ]]; do
        sleep 1
    done;

    jcecho "Application ready!"
    sudo chmod o+w /tmp/heroku.fcgi.5000.sock
} &

jcecho "Starting application..."

if [[ $1 == "live" ]]
then sudo nf start --env=.env.live
else sudo nf start
fi

jcecho "Goodbye!"
