#!/usr/bin/env bash

echo "Disabling blog..."

wp plugin is-installed disable-comments --quiet || wp plugin install disable-comments
wp plugin is-installed disable-blog --quiet || wp plugin install disable-blog

wp plugin is-active disable-comments --quiet || wp plugin activate disable-comments
wp plugin is-active disable-blog --quiet || wp plugin activate disable-blog

wp disable-comments settings --types=all
