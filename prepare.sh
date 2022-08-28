# this builds :latest tag
docker build -t "beenoob-protocol/explorer" .
# this assigns :latest to proper semver tag
docker tag "beenoob-protocol/explorer" "beenoob-protocol/explorer:$1"
