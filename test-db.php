
<?php

$host = '127.0.0.1';
$port = 3306;
$dbname = '''';
$username = '''';
$password = '';

try {
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    $pdo = new PDO($dsn, $username, $password, $options);
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