#!/usr/bin/env bash

url="${WORDPRESS_PUBLIC_URL:-http://localhost:20000}"
title="${WORDPRESS_SITE_TITLE:-Radio Aktywne}"
username="${WORDPRESS_ADMIN_USERNAME:-username}"
password="${WORDPRESS_ADMIN_PASSWORD:-password}"
email="${WORDPRESS_ADMIN_EMAIL:-example@example.com}"

wp core install \
	"--url=${url}" \
	"--title=${title}" \
	"--admin_user=${username}" \
	"--admin_email=${email}" \
	--prompt=admin_password <<<"${password}" >/dev/null || exit 1

exit 0
