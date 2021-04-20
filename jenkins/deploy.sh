#!/bin/sh
set -x
sudo pm2 stop "patron-vanilla"
sudo pm2 delete "patron-vanilla"
sudo pm2 start npm --name "patron-vanilla" -- start
sleep 30
echo "Server Started at 8000"