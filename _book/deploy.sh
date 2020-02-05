# git checkout 20190709_17357_1
# git pull --no-edit origin 20190709_17357_1
# git merge dev
# npm run lint
# npm run build
# git add .
# git commit -m 'deploy release'
# git push origin 20190709_17357_1
# git checkout dev

# git checkout 20190926_692_1
git pull --no-edit origin master
git merge dev
# npm run lint
npm run build
git add .
git commit -m 'deploy release'
git push origin 20190926_692_1
git checkout dev

