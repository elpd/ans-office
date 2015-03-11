#!/usr/bin/env bash

# Create database schema.
mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} -e "CREATE DATABASE IF NOT EXISTS ans;"

# Create tables
php artisan migrate

# Seed tables
php artisan db:seed
