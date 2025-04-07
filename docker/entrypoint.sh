#!/bin/bash

# Esperar a que MySQL esté listo
echo "Esperando a que MySQL esté listo..."
while ! nc -z db 3306; do
    sleep 1
done
echo "MySQL está listo!"

# Instalar dependencias de Composer
composer install

# Instalar dependencias de Node.js
npm install
npm run build

# Generar key de la aplicación si no existe
php artisan key:generate --no-interaction --force

# Ejecutar migraciones
php artisan migrate --force

# Limpiar y optimizar
php artisan optimize:clear
php artisan optimize

# Iniciar PHP-FPM
php-fpm 