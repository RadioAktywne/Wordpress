#!/usr/bin/env bash

username="${WORDPRESS_ADMIN_USERNAME:-username}"
password="${WORDPRESS_ADMIN_PASSWORD:-password}"
email="${WORDPRESS_ADMIN_EMAIL:-example@example.com}"

echo "Updating admin credentials..."

wp user update 1 \
	--user_pass="${password}" \
	--user_email="${email}" \
	--skip-email

wp db query "UPDATE wp_users SET user_login = '${username}' WHERE ID = 1"

admin_email="$(wp option get admin_email)"
[[ ${admin_email} == "${email}" ]] || wp option update admin_email "${email}"
