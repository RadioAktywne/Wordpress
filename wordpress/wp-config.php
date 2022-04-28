<?php
/**
 * The base configuration for WordPress
 *
 * @link https://github.com/docker-library/wordpress/blob/master/wp-config-docker.php
 *
 * @package WordPress
 */

// a helper function to lookup "env_FILE", "env", then fallback
if (!function_exists('getenv_docker')) {
	function getenv_docker($env, $default) {
		if ($fileEnv = getenv($env . '_FILE')) {
			return rtrim(file_get_contents($fileEnv), "\r\n");
		}
		else if (($val = getenv($env)) !== false) {
			return $val;
		}
		else {
			return $default;
		}
	}
}

/** The name of the database for WordPress */
define( 'DB_NAME', getenv_docker('WORDPRESS_DATABASE_NAME', 'database') );

/** Database username */
define( 'DB_USER', getenv_docker('WORDPRESS_DATABASE_USER', 'user') );

/** Database password */
define( 'DB_PASSWORD', getenv_docker('WORDPRESS_DATABASE_PASSWORD', 'password') );

/** Database hostname */
define( 'DB_HOST', getenv_docker('WORDPRESS_DATABASE_HOST', 'database') );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', getenv_docker('WORDPRESS_DATABASE_CHARSET', 'utf8') );

/** The database collate type. */
define( 'DB_COLLATE', getenv_docker('WORDPRESS_DB_COLLATE', '') );

/** Authentication unique keys and salts. */
define( 'AUTH_KEY',         getenv_docker('WORDPRESS_AUTH_KEY',         'auth-key') );
define( 'SECURE_AUTH_KEY',  getenv_docker('WORDPRESS_SECURE_AUTH_KEY',  'secure-auth-key') );
define( 'LOGGED_IN_KEY',    getenv_docker('WORDPRESS_LOGGED_IN_KEY',    'logged-in-key') );
define( 'NONCE_KEY',        getenv_docker('WORDPRESS_NONCE_KEY',        'nonce-key') );
define( 'AUTH_SALT',        getenv_docker('WORDPRESS_AUTH_SALT',        'auth-salt') );
define( 'SECURE_AUTH_SALT', getenv_docker('WORDPRESS_SECURE_AUTH_SALT', 'secure-auth-salt') );
define( 'LOGGED_IN_SALT',   getenv_docker('WORDPRESS_LOGGED_IN_SALT',   'logged-in-salt') );
define( 'NONCE_SALT',       getenv_docker('WORDPRESS_NONCE_SALT',       'nonce-salt') );

/** WordPress database table prefix. */
$table_prefix = getenv_docker('WORDPRESS_TABLE_PREFIX', 'wp_');

/** WordPress debugging mode. */
define( 'WP_DEBUG', !!getenv_docker('WORDPRESS_DEBUG', '') );

// If we're behind a proxy server and using HTTPS, we need to alert WordPress of that fact
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strpos($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false) {
	$_SERVER['HTTPS'] = 'on';
}

if ($configExtra = getenv_docker('WORDPRESS_CONFIG_EXTRA', '')) {
	eval($configExtra);
}

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
