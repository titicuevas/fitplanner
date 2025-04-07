FROM php:8.2-fpm

# Argumentos para usuario no root
ARG user=fitplanner
ARG uid=1000

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm \
    sqlite3

# Limpiar cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensiones PHP
RUN docker-php-ext-install mbstring exif pcntl bcmath gd pdo_sqlite

# Obtener Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Crear usuario del sistema
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Establecer directorio de trabajo
WORKDIR /var/www

# Copiar archivos de la aplicación
COPY . .

# Establecer permisos
RUN chown -R $user:$user /var/www
RUN chmod -R 755 /var/www/storage

# Crear directorio para SQLite y dar permisos
RUN mkdir -p /var/www/database && \
    touch /var/www/database/database.sqlite && \
    chown -R $user:$user /var/www/database && \
    chmod -R 755 /var/www/database

# Cambiar al usuario no root
USER $user

# Exponer puerto 9000
EXPOSE 9000

CMD ["php-fpm"]
