#!/bin/sh

envsub() {
  eval "cat <<EOF
$(cat "$1")
EOF
" 2>/dev/null
}

# shellcheck disable=SC2005
echo "$(envsub traefik.yaml)" >traefik.yaml

/entrypoint.sh traefik --configFile=traefik.yaml
