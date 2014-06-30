#!/bin/bash

echo 'Australia/Sydney' | sudo tee /etc/timezone
sudo dpkg-reconfigure --frontend noninteractive tzdata
