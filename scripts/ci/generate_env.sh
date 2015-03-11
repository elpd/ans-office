#!/usr/bin/env bash

cp ./scripts/ci/example.env .env

sed -i 's/{{db_username}}/'$MYSQL_USER'/g' .env
sed -i 's/{{db_password}}/'$MYSQL_PASSWORD'/g' .env
