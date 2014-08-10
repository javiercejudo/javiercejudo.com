#!/bin/bash

function jcecho {
    echo "==> javiercejudo.com: $1"
}

{
    while [ ! -e /tmp/heroku.fcgi.5000.sock ]; do
        sleep 1
    done;

    jcecho "Application ready!"
    sudo chmod 666 /tmp/heroku.fcgi.5000.sock
} &

jcecho "Starting application..."

sudo foreman start

jcecho "Goodbye!"
