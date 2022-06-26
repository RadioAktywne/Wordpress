#!/usr/bin/env bash

web_url="${WORDPRESS_INITIAL_WEB_URL:-http://localhost:3000}"
root_url="${WORDPRESS_INITIAL_ROOT_URL:-http://localhost}"
title="${WORDPRESS_INITIAL_SITE_TITLE:-Radio Aktywne}"
username="${WORDPRESS_INITIAL_ADMIN_USERNAME:-username}"
password="${WORDPRESS_INITIAL_ADMIN_PASSWORD:-password}"
email="${WORDPRESS_INITIAL_ADMIN_EMAIL:-example@example.com}"

wp core install \
  "--url=$root_url" \
  "--title=$title" \
  "--admin_user=$username" \
  "--admin_email=$email" \
  --prompt=admin_password <<<"$password" >/dev/null || exit 1
wp option update home "$web_url"

exit 0
