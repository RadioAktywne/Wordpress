#!/usr/bin/env bash

url="${WORDPRESS_PUBLIC_URL:-http://localhost:20000}"
title="${WORDPRESS_SITE_TITLE:-Radio Aktywne}"

echo "Updating site info..."

old_siteurl="$(wp option get siteurl)"
old_home="$(wp option get home)"

if [[ ${old_siteurl} != "${url}" || ${old_home} != "${url}" ]]; then
	wp option update siteurl "${url}"
	wp option update home "${url}"
	wp search-replace "${old_siteurl}" "${url}" --skip-columns=guid
	wp search-replace "${old_home}" "${url}" --skip-columns=guid
fi

blogname="$(wp option get blogname)"
[[ ${blogname} == "${title}" ]] || wp option update blogname "${title}"
