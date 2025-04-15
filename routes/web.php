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
use Database\ConnectionTest;
use Illuminate\Support\Facades\DB;

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

// Ruta temporal para debug
Route::get('/debug-db', function () {
    return [
        'MYSQLHOST' => env('MYSQLHOST'),
        'MYSQLPORT' => env('MYSQLPORT'),
        'MYSQL_DATABASE' => env('MYSQL_DATABASE'),
        'MYSQLUSER' => env('MYSQLUSER'),
        'MYSQL_ROOT_PASSWORD' => env('MYSQL_ROOT_PASSWORD'),
        'database' => config('database.connections.mysql')
    ];
});

Route::get('/test-db', function () {
    $result = ConnectionTest::test();
    return response()->json($result);
});

Route::get('/test-postgres', function () {
    try {
        // Intentar una consulta simple
        $result = DB::select('SELECT 1');
        
        // Obtener lista de tablas
        $tables = DB::select("
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        ");
        
        // Intentar contar registros en cada tabla
        $counts = [];
        foreach ($tables as $table) {
            $tableName = $table->table_name;
            $count = DB::table($tableName)->count();
            $counts[$tableName] = $count;
        }
        
        return [
            'connection' => 'Conexión exitosa a PostgreSQL',
            'database' => config('database.connections.pgsql.database'),
            'host' => config('database.connections.pgsql.host'),
            'tables' => $tables,
            'record_counts' => $counts
        ];
    } catch (\Exception $e) {
        return [
            'error' => 'Error de conexión: ' . $e->getMessage(),
            'config' => [
                'database' => config('database.connections.pgsql.database'),
                'host' => config('database.connections.pgsql.host'),
                'port' => config('database.connections.pgsql.port')
            ]
        ];
    }
});

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
        $diagnostico = [
            'estado' => 'OK',
            'conexion_db' => null,
            'error' => null,
            'tablas' => [],
            'config' => [
                'host' => env('DB_HOST'),
                'port' => env('DB_PORT'),
                'database' => env('DB_DATABASE'),
                'username' => env('DB_USERNAME')
            ]
        ];

        try {
            // Probar conexión
            $result = DB::select('SELECT 1');
            $diagnostico['conexion_db'] = 'Conexión exitosa a PostgreSQL';
            
            // Obtener tablas
            $tables = DB::select("
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            ");
            
            foreach ($tables as $table) {
                $count = DB::table($table->table_name)->count();
                $diagnostico['tablas'][$table->table_name] = $count;
            }
        } catch (\Exception $e) {
            $diagnostico['estado'] = 'Error';
            $diagnostico['error'] = $e->getMessage();
        }

        return Inertia::render('Diagnostico', [
            'diagnostico' => $diagnostico
        ]);
    });
}

require __DIR__.'/auth.php';
