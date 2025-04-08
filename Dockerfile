FROM php:8.2-cli

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
    default-mysql-client

# Limpiar cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensiones PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

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

# Instalar dependencias
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# Configurar Laravel
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Establecer permisos
RUN chown -R $user:$user /var/www
RUN chmod -R 755 /var/www/storage

# Cambiar al usuario no root
USER $user

# Exponer el puerto que usará la aplicación
EXPOSE ${PORT:-8000}

# Comando para iniciar la aplicación
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
