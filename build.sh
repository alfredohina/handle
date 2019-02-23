#!/bin/bash
rm -rf ./client/WebProject2/build
rm -rf ./server/public/
cd client/WebProject2
npm install
npm run build
cd ..
cp -r ./client/WebProject2/build/ ./server/public
echo "*" > ./server/public/.gitignore
echo "Done build & copy!"