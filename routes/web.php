<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// Controladores de la App
use App\Http\Controllers\WorkoutController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\WorkoutLogController;
use App\Http\Controllers\WeeklyPlanController;
use App\Http\Controllers\ObjectiveController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rutas para el historial de workouts
Route::get('/workout-history', function () {
    return Inertia::render('WorkoutHistory');
})->name('workout.history');

// Rutas para la API
Route::prefix('api')->group(function () {
    // Ruta para los WODs completados
    Route::get('/workouts/completed', [WorkoutLogController::class, 'completedWorkouts'])
        ->name('api.workout.completed');
});

// Rutas protegidas por autenticación
Route::middleware('auth')->group(function () {
    // Rutas para el perfil del usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas para la API de Workouts, solo accesibles para usuarios autenticados
Route::middleware('auth:sanctum')->prefix('api')->group(function () {
    Route::get('/workouts', [WorkoutController::class, 'index']);
    Route::get('/workouts/{id}', [WorkoutController::class, 'show']);
    Route::post('/workouts', [WorkoutController::class, 'store']);
    Route::put('/workouts/{id}', [WorkoutController::class, 'update']);
    Route::delete('/workouts/{id}', [WorkoutController::class, 'destroy']);

    // Registrar un WOD como completado
    Route::post('/workouts/complete', [WorkoutLogController::class, 'store']);

    // Obtener los WODs completados por el usuario autenticado
    Route::get('/workouts/completed', [WorkoutLogController::class, 'completedWorkouts']);

    // Eliminar un WOD completado
    Route::delete('/workouts/completed/{id}', [WorkoutLogController::class, 'destroy'])
        ->name('api.workouts.completed.destroy');
});

// Rutas de la API para la planificación semanal
Route::middleware(['auth', 'verified'])->prefix('api')->group(function () {
    // Ruta para obtener el plan semanal del usuario
    Route::get('/weekly-plan', [WeeklyPlanController::class, 'getWeeklyPlan']);
    
    // Ruta para generar la planificación semanal para todos los usuarios
    Route::post('/weekly-plan/generate', [WeeklyPlanController::class, 'generateWeeklyPlan']);
});

// Rutas para la planificación semanal
Route::middleware(['auth', 'verified'])->get('/weekly-plan', function () {
    return Inertia::render('WeeklyPlan');
})->name('weekly.plan');

Route::middleware(['auth', 'verified'])->prefix('api')->group(function () {
    // Ruta para obtener los WODs de un mes
    Route::get('/monthly-plan', [WeeklyPlanController::class, 'getMonthlyPlan']);
    
    // Ruta para contar los WODs de un mes
    Route::get('/workouts-count', [WeeklyPlanController::class, 'countWorkoutsByMonth']);
});

Route::middleware(['auth', 'verified'])->prefix('api')->group(function () {
    Route::get('/workouts-count', [WeeklyPlanController::class, 'countWorkoutsByMonth']);
});

// Rutas de la API para obtener los WODs realizados por mes
Route::middleware(['auth', 'verified'])->prefix('api')->group(function () {
    Route::get('/workouts-by-month', [WorkoutLogController::class, 'completedWorkoutsByMonth']);
});

// Ruta para mostrar el formulario de objetivos
Route::middleware('auth')->get('/objective', function () {
    return Inertia::render('ObjectiveForm', [
        'user' => Auth::user(),  // Pasa los datos del usuario al componente React
    ]);
})->name('objective.form');

// Ruta para guardar el objetivo del usuario
Route::middleware('auth')->post('/objective', [ObjectiveController::class, 'store'])->name('objective.store');

// Reemplazar la ruta principal en Railway para evitar usar la base de datos
if (getenv('RAILWAY_STATIC_URL')) {
    // La ruta principal será simple para evitar errores
    Route::get('/', function () {
        return '<!DOCTYPE html>
        <html>
        <head>
            <title>FitPlanner</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                h1 { color: #4CAF50; }
                .container { max-width: 800px; margin: 0 auto; }
                .button { display: inline-block; background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
                .info { background: #f4f4f4; padding: 20px; border-radius: 5px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>FitPlanner</h1>
                <p>Aplicación de gestión de entrenamientos CrossFit desplegada en Railway.</p>
                <div class="info">
                    <p>Entorno: '.getenv('APP_ENV').'</p>
                    <p>URL: '.getenv('RAILWAY_STATIC_URL').'</p>
                </div>
                <p><a href="/railway-test" class="button">Ver diagnóstico</a></p>
            </div>
        </body>
        </html>';
    });
    
    // Ruta de diagnóstico para mostrar información de conexión
    Route::get('/railway-test', function () {
        // Probar conexión a MySQL
        $mysql_connection = 'No probado';
        try {
            $dsn = 'mysql:host='.getenv('MYSQLHOST').';port='.getenv('MYSQLPORT').';dbname='.getenv('MYSQLDATABASE');
            $pdo = new \PDO($dsn, getenv('MYSQLUSER'), getenv('MYSQLPASSWORD'));
            $mysql_connection = 'Conexión exitosa a MySQL';
        } catch (\PDOException $e) {
            $mysql_connection = 'Error de conexión: ' . $e->getMessage();
        }

        // Devolver información detallada
        return '<!DOCTYPE html>
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
                table { width: 100%; border-collapse: collapse; }
                table, th, td { border: 1px solid #ddd; padding: 8px; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Diagnóstico de FitPlanner</h1>
                <div class="info">
                    <h2>Información general</h2>
                    <table>
                        <tr><th>Configuración</th><th>Valor</th></tr>
                        <tr><td>Estado</td><td class="success">OK</td></tr>
                        <tr><td>URL de Railway</td><td>'.getenv('RAILWAY_STATIC_URL').'</td></tr>
                        <tr><td>Entorno</td><td>'.getenv('APP_ENV').'</td></tr>
                        <tr><td>Debug</td><td>'.getenv('APP_DEBUG').'</td></tr>
                    </table>
                </div>
                <div class="info">
                    <h2>Conexión a la base de datos</h2>
                    <table>
                        <tr><th>Configuración</th><th>Valor</th></tr>
                        <tr><td>Estado</td><td>'.($mysql_connection == 'Conexión exitosa a MySQL' ? '<span class="success">Conectado</span>' : '<span class="error">Error</span>').'</td></tr>
                        <tr><td>Host</td><td>'.getenv('MYSQLHOST').'</td></tr>
                        <tr><td>Puerto</td><td>'.getenv('MYSQLPORT').'</td></tr>
                        <tr><td>Base de datos</td><td>'.getenv('MYSQLDATABASE').'</td></tr>
                        <tr><td>Usuario</td><td>'.getenv('MYSQLUSER').'</td></tr>
                        <tr><td>Mensaje</td><td>'.$mysql_connection.'</td></tr>
                    </table>
                </div>
                <p><a href="/" style="color: #4CAF50;">← Volver</a></p>
            </div>
        </body>
        </html>';
    });
}

require __DIR__.'/auth.php';
