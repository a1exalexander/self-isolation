#!/usr/bin/env sh

set -e

npm run build

cd dist

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME

git init
git add .
git commit -m 'deploy'

git push -f git@github.com:a1exalexander/self-isolation.git master:gh-pages

cd -