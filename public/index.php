<?php
// Habilitar el registro de errores para diagnóstico
ini_set('display_errors', '1');
error_reporting(E_ALL);

// Registrar el cargador automático de Composer
require __DIR__.'/../vendor/autoload.php';

// Iniciar Laravel y manejar la solicitud
$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
)->send();

$kernel->terminate($request, $response);
