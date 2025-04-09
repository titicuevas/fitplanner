web: cp .env.example .env && php artisan key:generate || (echo "⚠️ Laravel no pudo iniciarse, usando página estática" && cp public/index.html public/index.php) && chmod -R 777 storage bootstrap/cache && vendor/bin/heroku-php-apache2 public/
worker: php artisan queue:work
