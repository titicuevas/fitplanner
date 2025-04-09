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
        return '<h1>FitPlanner</h1><p>Aplicación desplegada en Railway.</p><p><a href="/railway-test">Ver diagnóstico</a></p>';
    });
    
    // Ruta de diagnóstico
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

        return [
            'status' => 'ok',
            'message' => 'La aplicación está funcionando en Railway',
            'railway_url' => getenv('RAILWAY_STATIC_URL'),
            'mysql_host' => getenv('MYSQLHOST'),
            'mysql_port' => getenv('MYSQLPORT'),
            'mysql_database' => getenv('MYSQLDATABASE'),
            'mysql_user' => getenv('MYSQLUSER'),
            'mysql_connection' => $mysql_connection
        ];
    });
}

require __DIR__.'/auth.php';
