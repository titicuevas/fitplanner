<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
//Controladores de la App
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutLogController;


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

//Historial
Route::get('/workout-history', function () {
    return Inertia::render('WorkoutHistory');
})->name('workout.history');

// Rutas para API
Route::prefix('api')->group(function () {
    // Rutas para los WODs completados
    Route::get('/workouts/completed', [WorkoutLogController::class, 'completedWorkouts'])
        ->name('api.workout.completed');
});


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

// Rutas para la planificación semanal, solo accesibles para usuarios autenticados
Route::middleware(['auth', 'verified'])->get('/weekly-plan', function () {
    return Inertia::render('WeeklyPlan');
})->name('weekly.plan');


require __DIR__.'/auth.php';
