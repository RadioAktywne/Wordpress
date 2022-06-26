#!/usr/bin/env bash

# https://wordpress.org/support/article/htaccess/
if [ ! -e /usr/src/wordpress/.htaccess ]; then
  {
    echo '# BEGIN WordPress'
    echo ''
    echo 'RewriteEngine On'
    echo 'RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]'
    echo 'RewriteBase /'
    echo 'RewriteRule ^index\.php$ - [L]'
    echo 'RewriteCond %{REQUEST_FILENAME} !-f'
    echo 'RewriteCond %{REQUEST_FILENAME} !-d'
    echo 'RewriteRule . /index.php [L]'
    echo ''
    echo '# END WordPress'
  } >.htaccess
fi

apache2-foreground &
pid="$!"

# wait until wordpress is ready
until curl -sLf 'http://localhost:80' >/dev/null; do
  echo "WordPress is unavailable - sleeping for 1 second"
  sleep 1
done

echo "WordPress available!"

if ! wp core is-installed --quiet; then
  echo "WordPress not yet installed. Installing..."
  ./scripts/install.sh || exit $?
else
  echo "WordPress is already installed. Url, title and admin user won't be changed even if configuration is different."
fi

echo "Setting up..."

for script in ./scripts/setup/*.sh; do
  "$script"
done

echo "Applying migrations..."

for migration in ./scripts/migrations/*.sh; do
  "$migration"
done

echo "WordPress is set up!"

wait "$pid"
