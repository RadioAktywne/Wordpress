#!/usr/bin/env bash

apache2-foreground &
pid="$!"

# wait until wordpress is ready
until curl -sLf 'http://localhost' >/dev/null; do
  echo "WordPress is unavailable - sleeping for 1 second"
  sleep 1
done

echo "WordPress available!"

if ! wp core is-installed --quiet; then
  echo "WordPress not yet installed. Installing..."
  ./scripts/install.sh || exit $?
else
  echo "WordPress is already installed."
fi

echo "Setting up..."

for script in ./scripts/setup/*.sh; do
  "$script"
done

echo "Applying migrations..."

for migration in ./scripts/migrations/*.sh; do
  "$migration"
done

echo "WordPress is set up!"

wait "$pid"
