ARG WORDPRESS_IMAGE_TAG=5.9.3-php7.4-apache

FROM wordpress:$WORDPRESS_IMAGE_TAG

WORKDIR /app

RUN set -eux; \
	find /etc/apache2 -name '*.conf' -type f -exec sed -ri -e "s!/var/www/html!$PWD!g" -e "s!Directory /var/www/!Directory $PWD!g" '{}' +;

COPY ./start.sh ./start.sh
RUN chmod +x ./start.sh

COPY ./wp-config.php ./wp-config.php

ENV WORDPRESS_DATABASE_NAME=database \
    WORDPRESS_DATABASE_USER=user \
    WORDPRESS_DATABASE_PASSWORD=password \
    WORDPRESS_DATABASE_HOST=database \
    WORDPRESS_DATABASE_CHARSET=utf8 \
    WORDPRESS_DB_COLLATE='' \
    WORDPRESS_AUTH_KEY=auth-key \
    WORDPRESS_SECURE_AUTH_KEY=secure-auth-key \
    WORDPRESS_LOGGED_IN_KEY=logged-in-key \
    WORDPRESS_NONCE_KEY=nonce-key \
    WORDPRESS_AUTH_SALT=auth-salt \
    WORDPRESS_SECURE_AUTH_SALT=secure-auth-salt \
    WORDPRESS_LOGGED_IN_SALT=logged-in-salt \
    WORDPRESS_NONCE_SALT=nonce-salt \
    WORDPRESS_TABLE_PREFIX=wp_ \
    WORDPRESS_DEBUG='' \
    WORDPRESS_CONFIG_EXTRA=''

EXPOSE 80

ENTRYPOINT ["./start.sh"]
CMD []