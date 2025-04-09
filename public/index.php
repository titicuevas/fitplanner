<?php
// Configuración optimizada para Railway
// Desactivar la visualización de errores en producción 
ini_set('display_errors', '0');
error_reporting(E_ALL);

// Manejador de errores fatales
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== null && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        http_response_code(500);
        echo '<!DOCTYPE html>
        <html>
        <head>
            <title>FitPlanner - Error Temporal</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; color: #333; line-height: 1.6; }
                .container { max-width: 800px; margin: 40px auto; padding: 20px; }
                .card { background: white; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                h1 { color: #4CAF50; margin-top: 0; }
                .logo { text-align: center; margin-bottom: 30px; }
                .logo h1 { font-size: 2.5em; margin-bottom: 5px; }
                .subtitle { color: #666; font-size: 1.2em; text-align: center; margin-bottom: 30px; }
                .error { margin: 20px 0; padding: 15px; background: #fdf7f7; border-left: 5px solid #d9534f; }
                .footer { text-align: center; margin-top: 40px; font-size: 0.9em; color: #777; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">
                    <h1>FitPlanner</h1>
                    <p class="subtitle">Planificación de entrenamientos CrossFit</p>
                </div>
                
                <div class="card">
                    <h2>Error temporal</h2>
                    <p>Estamos experimentando dificultades técnicas temporales. Por favor, intenta nuevamente en unos minutos.</p>
                    
                    <div class="error">
                        <h3 style="margin-top: 0;">⚠️ Estado: Error en el servidor</h3>
                        <p>Nuestro equipo ha sido notificado y está trabajando para resolver este problema.</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p>FitPlanner &copy; 2024 | Todos los derechos reservados</p>
                </div>
            </div>
        </body>
        </html>';
        exit;
    }
});

try {
    // Definir el inicio de la aplicación
    define('LARAVEL_START', microtime(true));

    // Verificar si la aplicación está en modo de mantenimiento
    if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
        require $maintenance;
    }

    // Registrar el cargador automático de Composer
    require __DIR__.'/../vendor/autoload.php';

    // Iniciar Laravel y manejar la solicitud
    $app = require_once __DIR__.'/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
    
    $response = $kernel->handle(
        $request = Illuminate\Http\Request::capture()
    )->send();
    
    $kernel->terminate($request, $response);
} catch (Throwable $e) {
    // Registrar el error
    if (function_exists('error_log')) {
        error_log($e->getMessage() . "\n" . $e->getTraceAsString());
    }
    
    // Mostrar una página de error amigable
    http_response_code(500);
    echo '<!DOCTYPE html>
    <html>
    <head>
        <title>FitPlanner - Error Temporal</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; color: #333; line-height: 1.6; }
            .container { max-width: 800px; margin: 40px auto; padding: 20px; }
            .card { background: white; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #4CAF50; margin-top: 0; }
            .logo { text-align: center; margin-bottom: 30px; }
            .logo h1 { font-size: 2.5em; margin-bottom: 5px; }
            .subtitle { color: #666; font-size: 1.2em; text-align: center; margin-bottom: 30px; }
            .error { margin: 20px 0; padding: 15px; background: #fdf7f7; border-left: 5px solid #d9534f; }
            .footer { text-align: center; margin-top: 40px; font-size: 0.9em; color: #777; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <h1>FitPlanner</h1>
                <p class="subtitle">Planificación de entrenamientos CrossFit</p>
            </div>
            
            <div class="card">
                <h2>Error temporal</h2>
                <p>Estamos experimentando dificultades técnicas temporales. Por favor, intenta nuevamente en unos minutos.</p>
                
                <div class="error">
                    <h3 style="margin-top: 0;">⚠️ Estado: Error en el servidor</h3>
                    <p>Nuestro equipo ha sido notificado y está trabajando para resolver este problema.</p>
                </div>
            </div>
            
            <div class="footer">
                <p>FitPlanner &copy; 2024 | Todos los derechos reservados</p>
            </div>
        </div>
    </body>
    </html>';
}
