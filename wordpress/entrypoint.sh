#!/usr/bin/env bash

# Add new non-root user
groupadd wordpress
useradd -g wordpress -G www-data wordpress

# Own every important file
chown -R wordpress:wordpress \
  ./ \
  /run/ \
  /tmp/ \
  /var/log/apache2/
chown wordpress:wordpress /dev/std*

# Run as non-root user
su wordpress -s /bin/bash "$@"
