web: cp .env.example .env && php artisan key:generate || echo "Laravel no pudo iniciar - Usando página alternativa" && cp public/index.php.alt public/index.php && chmod -R 775 storage bootstrap/cache && vendor/bin/heroku-php-apache2 public/ 