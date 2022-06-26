#!/usr/bin/env bash

echo "Registering custom types..."

wp plugin is-installed advanced-custom-fields --quiet || wp plugin install advanced-custom-fields

wp plugin is-active advanced-custom-fields --quiet || wp plugin activate advanced-custom-fields

wp plugin is-active ra-custom-types --quiet || wp plugin activate ra-custom-types
