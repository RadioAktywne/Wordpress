#!/usr/bin/env bash

echo "Setting defaults..."

home="$(wp post list --post_type=page --name=home --field=ID)"

if [ -z "$home" ]; then
  wp post create --post_type=page --post_title='Home' --post_status=publish
  home="$(wp post list --post_type=page --name=home --field=ID)"
fi

blog="$(wp post list --post_type=page --name=blog --field=ID)"

if [ -z "$blog" ]; then
  wp post create --post_type=page --post_title='Blog' --post_status=publish
  blog="$(wp post list --post_type=page --name=blog --field=ID)"
fi

about="$(wp post list --post_type=page --name=about --field=ID)"

if [ -z "$about" ]; then
  wp post create --post_type=page --post_title='About' --post_status=publish
  about="$(wp post list --post_type=page --name=about --field=ID)"
fi

[ "$(wp option get show_on_front)" == "page" ] || wp option update show_on_front page
[ "$(wp option get page_on_front)" == "$home" ] || wp option update page_on_front "$home"
[ "$(wp option get page_for_posts)" == "$blog" ] || wp option update page_for_posts "$blog"