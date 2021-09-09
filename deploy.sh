#!/bin/bash
rm -rf public/*;

cd client;
rm -rf .next out/*;
npm run build;
cp -r ./out/* ../public;
cd ..;
rm -rf ~/staging/*
cp -r ./ ~/staging;

cd ~/staging;
rm -rf node_modules client webpack.config.js jsconfig.json README.md .vscode .idea dist uploads/* deploy.sh screenshots/;
sed -i '/uploads/d' .gitignore;
git init;
git add .;
git commit -am "prod";
heroku git:remote -a auth-app2;
git push heroku main;
heroku logs --tail