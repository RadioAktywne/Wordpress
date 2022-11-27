#!/usr/bin/env bash

echo "Fixing defaults..."

wp plugin update ra-fix-rest
wp plugin update ra-hide-admin-items
wp plugin update ra-remove-redirects

wp plugin is-active ra-fix-rest --quiet || wp plugin activate ra-fix-rest
wp plugin is-active ra-hide-admin-items --quiet || wp plugin activate ra-hide-admin-items
wp plugin is-active ra-remove-redirects --quiet || wp plugin activate ra-remove-redirects
