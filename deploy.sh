#!/bin/bash 
set -x

read commitMsg

cp ./build/index.html ./
npm run build >/dev/null
rm -rf ./static
rm ./index.html
cp -r ./dist/* ./
git add .
git commit -a -m "$commitMsg"
git push origin master
