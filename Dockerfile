# Usa la imagen oficial de PHP
FROM php:8.0-fpm

# Instalar las dependencias necesarias para Laravel
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git

# Instalar extensiones PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd pdo pdo_mysql

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Establecer el directorio de trabajo
WORKDIR /var/www

# Copiar el archivo composer.json y composer.lock
COPY composer.json composer.lock ./

# Instalar dependencias de Laravel
RUN composer install

# Copiar todo el proyecto en el contenedor
COPY . .

# Establecer los permisos para Laravel
RUN chown -R www-data:www-data /var/www
RUN chmod -R 775 /var/www/storage

# Exponer el puerto en el que Laravel estará escuchando
EXPOSE 9000

CMD ["php-fpm"]
