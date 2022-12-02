#!/usr/bin/env bash

echo "Setting defaults..."

home="$(wp post list --post_type=page --name=home --field=ID)"

if [ -z "$home" ]; then
  wp post create --post_type=page --post_title='Strona główna' --post_status=publish
  home="$(wp post list --post_type=page --name=home --field=ID)"
fi

blog="$(wp post list --post_type=page --name=publicystyka --field=ID)"

if [ -z "$blog" ]; then
  wp post create --post_type=page --post_title='Publicystyka' --post_status=publish
  blog="$(wp post list --post_type=page --name=publicystyka --field=ID)"
fi

about="$(wp post list --post_type=page --name=o-nas --field=ID)"

if [ -z "$about" ]; then
  wp post create --post_type=page --post_title='O nas' --post_status=publish
  about="$(wp post list --post_type=page --name=o-nas --field=ID)"
fi

[ "$(wp option get show_on_front)" == "page" ] || wp option update show_on_front page
[ "$(wp option get page_on_front)" == "$home" ] || wp option update page_on_front "$home"
[ "$(wp option get page_for_posts)" == "$blog" ] || wp option update page_for_posts "$blog"