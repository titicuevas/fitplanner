web: cp .env.example .env && php artisan key:generate --force && php artisan config:cache && php artisan route:cache && php artisan migrate --force && chmod -R 777 storage bootstrap/cache && vendor/bin/heroku-php-apache2 public/
worker: php artisan queue:work --tries=3 --timeout=90
