#!/bin/sh

MYSQL_ROOT_PASSWORD="${DATABASE_ROOT_PASSWORD:-password}" \
	MYSQL_USER="${DATABASE_USER:-user}" \
	MYSQL_PASSWORD="${DATABASE_PASSWORD:-password}" \
	MYSQL_DATABASE="${DATABASE_NAME:-database}" \
	\
	docker-entrypoint.sh \
	mysqld \
	--defaults-extra-file=./cfg/config.cnf
