#!/bin/bash

# Run from the repository root regardless of where the script is invoked
cd "$(dirname "$0")/.."

git checkout deployment
git rebase master
git reset --hard master
npm run build
git add docs
git commit -m "Generate artifacts"
git push origin deployment --force
git checkout -
