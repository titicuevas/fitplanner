<?php

namespace Database;

class ConnectionTest
{
    public static function test()
    {
        $host = 'centerbeam.proxy.rlwy.net';
        $port = 45325;
        $dbname = 'railway';
        $username = 'root';
        $password = 'IkQYQPUwzOflKzSgBSAccJWvRyTpEcdT';

        try {
            // Forzar conexión TCP explícita
            $dsn = "mysql:host=$host;port=$port;dbname=$dbname;protocol=tcp";
            $pdo = new \PDO($dsn, $username, $password, [
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                \PDO::ATTR_EMULATE_PREPARES => false,
                \PDO::ATTR_PERSISTENT => false,
                \PDO::MYSQL_ATTR_SSL_CA => false,
                \PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
                \PDO::MYSQL_ATTR_FOUND_ROWS => true,
                \PDO::ATTR_TIMEOUT => 10,
                \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
                \PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
                \PDO::MYSQL_ATTR_LOCAL_INFILE => true,
                \PDO::MYSQL_ATTR_DIRECT_QUERY => true,
            ]);

            // Probar consulta
            $stmt = $pdo->query("SELECT 1");
            $result = $stmt->fetch();

            return [
                'success' => true,
                'message' => 'Conexión exitosa',
                'result' => $result
            ];
        } catch (\PDOException $e) {
            return [
                'success' => false,
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'errorInfo' => $e->errorInfo
            ];
        }
    }
} 