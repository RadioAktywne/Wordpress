#!/usr/bin/env bash

echo "Configuring theme..."

wp theme is-active ra-theme --quiet || wp theme activate ra-theme
