<?php

return [
    'client' => 'mysql',
    'connection' => [
        'host' => env('MYSQLHOST', '127.0.0.1'),
        'port' => env('MYSQLPORT', 3306),
        'database' => env('MYSQLDATABASE', ''),
        'username' => env('MYSQLUSER', ''),
        'password' => env('MYSQLPASSWORD', ''),
        'protocol' => env('MYSQLPROTOCOL', 'TCP'),
    ],
]; 