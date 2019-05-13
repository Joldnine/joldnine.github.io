#!/bin/bash 
set -x

read commitMsg

npm run build >/dev/null
cp -r ./dist/* ../
rm -rf ./dist
git add .
git commit -a -m "$commitMsg"
git push origin master
