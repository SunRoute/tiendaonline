#!/bin/bash

apt update

apt install -y mysql-server apache2 php libapache2-mod-php php-mysql php-curl php-gd php-mbstring php-xml php-xmlrpc php-soap php-intl php-zip

PHP_VERSION=$(php --ini | grep Loaded | cut -d'/' -f4)

sed -i 's/upload_max_filesize = .*/upload_max_filesize = 100M/' /etc/php/$PHP_VERSION/apache2/php.ini
sed -i 's/max_execution_time = .*/max_execution_time = 120/' /etc/php/$PHP_VERSION/apache2/php.ini
sed -i 's/max_input_vars = .*/max_input_vars = 3000/' /etc/php/$PHP_VERSION/apache2/php.ini

read -p  "Ingresa un nombre para crear la base de datos (minusculas y sin espacios):" NAMEDB
read -p  "Ingresa un nombre de usuario para la base de datos (minusculas y sin espacios):"  USERDB
read -p "Ingresa una contraseña para la base de datos: " -s PASSDB

mysql -e "CREATE DATABASE ${NAMEDB} DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;"
mysql -e "CREATE USER ${USERDB}@'%' IDENTIFIED BY '${PASSDB}';"
mysql -e "GRANT ALL ON ${NAMEDB}.* TO '${USERDB}'@'%';"
mysql -e "FLUSH PRIVILEGES;"

sed -i "s/\/var\/www\/html/\/var\/www\/html\/$NAMEDB/" /etc/apache2/sites-available/000-default.conf

a2enmod rewrite
systemctl restart apache2

cd /tmp
curl -O https://wordpress.org/latest.tar.gz
tar xf latest.tar.gz -C /var/www/html/
chown -R www-data:www-data /var/www/html/$NAMEDB/

cp /var/www/html/$NAMEDB/wp-config-sample.php /var/www/html/$NAMEDB/wp-config.php

sed -i "s/database_name_here/$NAMEDB/" /var/www/html/$NAMEDB/wp-config.php
sed -i "s/username_here/$USERDB/" /var/www/html/$NAMEDB/wp-config.php
sed -i "s/password_here/$PASSDB/" /var/www/html/$NAMEDB/wp-config.php
