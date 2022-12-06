#!/usr/bin/env bash

echo "Configuring theme..."

wp theme is-active ra-redirect --quiet || wp theme activate ra-redirect
