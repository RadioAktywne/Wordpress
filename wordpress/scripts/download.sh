#!/bin/bash

set -e

if [[ $# -ne 2 || ($1 != "plugin" && $1 != "theme") ]]; then
	echo "USAGE: $0 (plugin|theme) <slug>"
	exit 1
fi

type=$1
slug=$2

echo "Obtaining ${type} info..."
data="$(curl -gs "https://api.wordpress.org/${type}s/info/1.2/?action=${type}_information&request[slug]=${slug}")"
download_url="$(echo "${data}" | jq -r .download_link 2>/dev/null || echo "null")"

if [[ ${download_url} == "null" ]]; then
	echo "${type} '${slug}' was not found"
	exit 1
fi

echo "Downloading ${type} ..."
tmpfile=$(mktemp)
curl -s "${download_url}" >"${tmpfile}"

echo "Unpacking ${type} ..."
mkdir -p "./wp-content/${type}s"
unzip -qq -d "./wp-content/${type}s" "${tmpfile}"
rm "${tmpfile}"

echo "${type} '${slug}' successfully installed."
