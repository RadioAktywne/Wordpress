#!/bin/bash

web_url="${WORDPRESS_WEB_URL:-http://localhost:3000}"
root_url="${WORDPRESS_ROOT_URL:-http://localhost}"
title="${WORDPRESS_SITE_TITLE:-Radio Aktywne}"
username="${WORDPRESS_ADMIN_USERNAME:-username}"
password="${WORDPRESS_ADMIN_PASSWORD:-password}"
email="${WORDPRESS_ADMIN_EMAIL:-example@example.com}"

docker-entrypoint.sh apache2-foreground &
pid="$!"

# wait until wordpress is ready
until curl -sLf 'http://localhost:80' >/dev/null; do
  echo "WordPress is unavailable - sleeping for 1 second"
  sleep 1
done

echo "WordPress available. Setting up..."

if ! wp core is-installed --allow-root &>/dev/null; then
  echo "WordPress not yet installed. Installing..."
  wp core install --allow-root \
    "--url=$root_url" \
    "--title=$title" \
    "--admin_user=$username" \
    "--admin_email=$email" \
    --prompt=admin_password <<<"$password" >/dev/null || exit 1
  wp option update home "$web_url" --allow-root
else
  echo "WordPress is already installed. Url, title and admin user won't be changed even if configuration is different."
fi

echo "Configuring theme..."
wp theme activate ra-redirect --allow-root

echo "Removing preinstalled bloatware..."

wp plugin uninstall --deactivate --allow-root \
  akismet \
  hello
wp theme delete --allow-root \
  twentytwenty \
  twentytwentyone \
  twentytwentytwo
wp post delete 1 2 3 --force --allow-root

echo "Configuring plugins..."

wp plugin install --activate --allow-root \
  disable-comments \
  disable-blog
wp plugin activate --allow-root \
  ra-fix-rest \
  ra-hide-admin-items \
  ra-remove-redirects
wp disable-comments settings --types=all --allow-root

echo "WordPress is set up!"

wait "$pid"
