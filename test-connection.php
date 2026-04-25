<?php

require __DIR__.'/vendor/autoload.php';

$host = getenv('MYSQLHOST') ?: '127.0.0.1';
$port = (int) (getenv('MYSQLPORT') ?: 3306);
$dbname = getenv('MYSQLDATABASE') ?: '';
$username = getenv('MYSQLUSER') ?: '';
$password = getenv('MYSQLPASSWORD') ?: '';

try {
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "¡Conexión exitosa!\n";
    
    // Probar una consulta simple
    $stmt = $pdo->query("SELECT 1");
    $result = $stmt->fetch();
    echo "Consulta exitosa: " . print_r($result, true) . "\n";
    
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage() . "\n";
    echo "Código de error: " . $e->getCode() . "\n";
    echo "Información adicional: " . print_r($e->errorInfo, true) . "\n";
} 