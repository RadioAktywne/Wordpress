#!/usr/bin/env bash

apache2-foreground &
pid="$!"

# wait until http server is up
until curl -s 'http://localhost:80' >/dev/null; do
  echo "HTTP server is unavailable - sleeping for 1 second"
  sleep 1
done

echo "HTTP server available!"

# wait until database is up
until wp db check >/dev/null 2>&1; do
  echo "Database is unavailable - sleeping for 1 second"
  sleep 1
done

echo "Database available!"

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
