#!/usr/bin/env bash

echo "Removing preinstalled bloatware..."

wp plugin is-installed akismet --quiet && wp plugin uninstall --deactivate akismet
wp plugin is-installed hello --quiet && wp plugin uninstall --deactivate hello

wp theme is-installed twentytwenty --quiet && wp theme delete twentytwenty
wp theme is-installed twentytwentyone --quiet && wp theme delete twentytwentyone
wp theme is-installed twentytwentytwo --quiet && wp theme delete twentytwentytwo

wp post exists 1 --quiet && wp post delete 1 --force
wp post exists 2 --quiet && wp post delete 2 --force
wp post exists 3 --quiet && wp post delete 3 --force
