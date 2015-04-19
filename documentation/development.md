
## Debugging 
### Homestead
```` bash
php -dxdebug.remote_autostart=on -dxdebug.remote_connect_back=off -dxdebug.remote_host=10.0.2.2 artisan migrate:refresh --seed --verbose
````
