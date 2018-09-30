#!/bin/bash 
set -x

npm run build >/dev/null
rm -rf ./static
rm ./index.html
cp -r ./dist/* ./
git add .
git commit -a -m "deploy"
git push origin master
