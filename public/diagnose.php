<?php
// Este archivo de diagnóstico está completamente aislado de Laravel
// y será accesible incluso si el resto de la aplicación falla

// Función para mostrar variables de entorno de forma segura
function safe_getenv($name) {
    $value = getenv($name);
    return $value !== false ? $value : 'No definido';
}

// Comprobar conexión a MySQL
$mysql_error = null;
$mysql_connected = false;
try {
    $dsn = 'mysql:host='.safe_getenv('MYSQLHOST').';port='.safe_getenv('MYSQLPORT').';dbname='.safe_getenv('MYSQLDATABASE');
    $pdo = new PDO($dsn, safe_getenv('MYSQLUSER'), safe_getenv('MYSQLPASSWORD'));
    $mysql_connected = true;
} catch (PDOException $e) {
    $mysql_error = $e->getMessage();
}

// Comprobar archivos importantes
$env_exists = file_exists(__DIR__ . '/../.env');
$storage_writable = is_writable(__DIR__ . '/../storage');
$bootstrap_writable = is_writable(__DIR__ . '/../bootstrap/cache');

// Mostrar la información
?>
<!DOCTYPE html>
<html>
<head>
    <title>Diagnóstico - FitPlanner</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #4CAF50; }
        .container { max-width: 800px; margin: 0 auto; }
        .info { background: #f4f4f4; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .success { color: green; }
        .error { color: red; }
        .warning { color: orange; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        table, th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f2f2f2; }
        .action-btn { display: inline-block; background: #4CAF50; color: white; padding: 5px 10px; text-decoration: none; border-radius: 3px; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Diagnóstico Independiente - FitPlanner</h1>
        
        <div class="info">
            <h2>Entorno de Ejecución</h2>
            <table>
                <tr><th>Variable</th><th>Valor</th></tr>
                <tr><td>PHP Version</td><td><?php echo phpversion(); ?></td></tr>
                <tr><td>Server Software</td><td><?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Desconocido'; ?></td></tr>
                <tr><td>Document Root</td><td><?php echo $_SERVER['DOCUMENT_ROOT'] ?? 'Desconocido'; ?></td></tr>
                <tr><td>Script Filename</td><td><?php echo $_SERVER['SCRIPT_FILENAME'] ?? 'Desconocido'; ?></td></tr>
            </table>
        </div>
        
        <div class="info">
            <h2>Variables de Entorno Railway</h2>
            <table>
                <tr><th>Variable</th><th>Valor</th></tr>
                <tr><td>RAILWAY_STATIC_URL</td><td><?php echo safe_getenv('RAILWAY_STATIC_URL'); ?></td></tr>
                <tr><td>APP_ENV</td><td><?php echo safe_getenv('APP_ENV'); ?></td></tr>
                <tr><td>APP_DEBUG</td><td><?php echo safe_getenv('APP_DEBUG'); ?></td></tr>
                <tr><td>APP_KEY</td><td><?php echo substr(safe_getenv('APP_KEY'), 0, 10) . '...'; ?></td></tr>
            </table>
        </div>
        
        <div class="info">
            <h2>Verificación de Archivos</h2>
            <table>
                <tr><th>Archivo/Directorio</th><th>Estado</th></tr>
                <tr>
                    <td>.env</td>
                    <td class="<?php echo $env_exists ? 'success' : 'error'; ?>">
                        <?php echo $env_exists ? 'Existe' : 'No existe'; ?>
                    </td>
                </tr>
                <tr>
                    <td>storage/ (permisos)</td>
                    <td class="<?php echo $storage_writable ? 'success' : 'error'; ?>">
                        <?php echo $storage_writable ? 'Escribible' : 'No escribible'; ?>
                    </td>
                </tr>
                <tr>
                    <td>bootstrap/cache/ (permisos)</td>
                    <td class="<?php echo $bootstrap_writable ? 'success' : 'error'; ?>">
                        <?php echo $bootstrap_writable ? 'Escribible' : 'No escribible'; ?>
                    </td>
                </tr>
            </table>
        </div>
        
        <div class="info">
            <h2>Conexión a la Base de Datos</h2>
            <table>
                <tr><th>Parámetro</th><th>Valor</th></tr>
                <tr>
                    <td>Estado</td>
                    <td class="<?php echo $mysql_connected ? 'success' : 'error'; ?>">
                        <?php echo $mysql_connected ? 'Conectado' : 'Error de conexión'; ?>
                    </td>
                </tr>
                <tr><td>Host</td><td><?php echo safe_getenv('MYSQLHOST'); ?></td></tr>
                <tr><td>Puerto</td><td><?php echo safe_getenv('MYSQLPORT'); ?></td></tr>
                <tr><td>Base de datos</td><td><?php echo safe_getenv('MYSQLDATABASE'); ?></td></tr>
                <tr><td>Usuario</td><td><?php echo safe_getenv('MYSQLUSER'); ?></td></tr>
                <?php if ($mysql_error): ?>
                <tr><td>Error</td><td class="error"><?php echo htmlspecialchars($mysql_error); ?></td></tr>
                <?php endif; ?>
            </table>
        </div>
        
        <div class="info">
            <h2>Extensiones PHP</h2>
            <table>
                <tr><th>Extensión</th><th>Estado</th></tr>
                <tr>
                    <td>PDO</td>
                    <td class="<?php echo extension_loaded('pdo') ? 'success' : 'error'; ?>">
                        <?php echo extension_loaded('pdo') ? 'Habilitada' : 'No habilitada'; ?>
                    </td>
                </tr>
                <tr>
                    <td>PDO MySQL</td>
                    <td class="<?php echo extension_loaded('pdo_mysql') ? 'success' : 'error'; ?>">
                        <?php echo extension_loaded('pdo_mysql') ? 'Habilitada' : 'No habilitada'; ?>
                    </td>
                </tr>
                <tr>
                    <td>Mbstring</td>
                    <td class="<?php echo extension_loaded('mbstring') ? 'success' : 'error'; ?>">
                        <?php echo extension_loaded('mbstring') ? 'Habilitada' : 'No habilitada'; ?>
                    </td>
                </tr>
                <tr>
                    <td>OpenSSL</td>
                    <td class="<?php echo extension_loaded('openssl') ? 'success' : 'error'; ?>">
                        <?php echo extension_loaded('openssl') ? 'Habilitada' : 'No habilitada'; ?>
                    </td>
                </tr>
            </table>
        </div>
        
        <a href="/" class="action-btn">Volver al Inicio</a>
    </div>
</body>
</html> 