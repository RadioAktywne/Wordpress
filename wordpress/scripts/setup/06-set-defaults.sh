#!/usr/bin/env bash

echo "Setting defaults..."

home="$(wp post list --post_type=page --name=home --field=ID)"

if [ -z "$home" ]; then
  wp post create --post_type=page --post_title='Home' --post_status=publish
  home="$(wp post list --post_type=page --name=home --field=ID)"
fi

[ "$(wp option get show_on_front)" == "page" ] || wp option update show_on_front page
[ "$(wp option get page_on_front)" == "$home" ] || wp option update page_on_front "$home"
