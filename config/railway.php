<?php

return [
    'database' => [
        'host' => env('MYSQLHOST', '127.0.0.1'),
        'port' => env('MYSQLPORT', '3306'),
        'database' => env('MYSQLDATABASE', 'forge'),
        'username' => env('MYSQLUSER', 'forge'),
        'password' => env('MYSQLPASSWORD', ''),
    ],
]; 