 
## References
* https://www.digitalocean.com/community/tutorials/how-to-install-laravel-with-an-nginx-web-server-on-ubuntu-14-04

* 
https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04

* https://www.digitalocean.com/community/tutorials/how-to-install-laravel-with-an-nginx-web-server-on-ubuntu-14-04

## Installation

    sudo apt-get update
    sudo apt-get install nginx php5-fpm php5-cli php5-mcrypt git

sudo nano /etc/php5/fpm/php.ini

cgi.fix_pathinfo=0


sudo php5enmod mcrypt

sudo service php5-fpm restart


