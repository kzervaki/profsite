#!/bin/bash

git checkout deployment
git rebase master
npm run build
git add docs
git commit -m "Generate artifacts"
git push origin deployment --force-with-lease
git checkout -
