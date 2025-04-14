<?php

namespace Database;

class ConnectionTest
{
    public static function test()
    {
        $host = '127.0.0.1';
        $port = 3306;
        $dbname = '''';
        $username = '''';
        $password = '';

        try {
            // Intentar conexión directa
            $dsn = "mysql:host=$host;port=$port;dbname=$dbname";
            $pdo = new \PDO($dsn, $username, $password, [
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                \PDO::ATTR_EMULATE_PREPARES => false,
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