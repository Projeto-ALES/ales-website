#!/bin/sh
set -eu

envsubst '${API_HOST} ${API_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"