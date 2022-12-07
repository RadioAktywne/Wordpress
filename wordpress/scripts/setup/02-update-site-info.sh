#!/usr/bin/env bash

url="${WORDPRESS_PUBLIC_URL:-http://localhost:80}"
web_url="${WORDPRESS_WEB_PUBLIC_URL:-http://localhost:3000}"
title="${WORDPRESS_SITE_TITLE:-Radio Aktywne}"

echo "Updating site info..."

[ "$(wp option get siteurl)" == "$url" ] || wp option update siteurl "$url"
[ "$(wp option get home)" == "$web_url" ] || wp option update home "$web_url"
[ "$(wp option get blogname)" == "$title" ] || wp option update blogname "$title"
