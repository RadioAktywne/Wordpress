#!/usr/bin/env bash

echo "Disabling comments..."

wp plugin is-installed disable-comments --quiet || wp plugin install disable-comments

wp plugin is-active disable-comments --quiet || wp plugin activate disable-comments

wp disable-comments settings --types=all
