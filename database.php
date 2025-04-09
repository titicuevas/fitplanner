<?php

// Este archivo configura manualmente la conexión a MySQL en Railway
// Solo se usará cuando se detecten las variables de entorno de Railway

if (getenv('RAILWAY_STATIC_URL')) {
    putenv("DB_CONNECTION=mysql");
    putenv("DB_HOST=" . getenv('MYSQLHOST'));
    putenv("DB_PORT=" . getenv('MYSQLPORT'));
    putenv("DB_DATABASE=" . getenv('MYSQLDATABASE'));
    putenv("DB_USERNAME=" . getenv('MYSQLUSER'));
    putenv("DB_PASSWORD=" . getenv('MYSQLPASSWORD'));
}

return [
    'default' => 'mysql',
    'connections' => [
        'mysql' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
        ],
    ]
]; 