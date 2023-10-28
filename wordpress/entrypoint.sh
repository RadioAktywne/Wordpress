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

# Create custom php.ini
cat >>/usr/local/etc/php/conf.d/custom.ini <<EOF
upload_max_filesize = ${WORDPRESS_MAX_UPLOAD_SIZE:-512M}
post_max_size = ${WORDPRESS_MAX_UPLOAD_SIZE:-512M}
memory_limit = ${WORDPRESS_MAX_UPLOAD_SIZE:-512M}
EOF

# Run as non-root user
su wordpress -s /bin/bash "$@"
