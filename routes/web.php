<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
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
})->middleware(['auth', 'verified'])->name('workout.history');

// Rutas protegidas por autenticación
Route::middleware('auth')->group(function () {
    // Rutas para el perfil del usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
 
    // Ruta para mostrar el formulario de objetivos
    Route::get('/objective', function () {
        $user = Auth::user();

        return Inertia::render('ObjectiveForm', [
            'user' => [
                'name' => $user->name,
                'objective' => $user->objective,
                'birth_date' => optional($user->birth_date)?->format('Y-m-d'),
                'height' => $user->height,
                'weight' => $user->weight,
            ],
        ]);
    })->name('objective.form');

    // Ruta para guardar el objetivo del usuario
    Route::post('/objective', [ObjectiveController::class, 'store'])
        ->middleware('throttle:10,1')
        ->name('objective.store');
});
// Rutas para la planificación semanal
Route::middleware(['auth', 'verified'])->get('/weekly-plan', function () {
    return Inertia::render('WeeklyPlan');
})->name('weekly.plan');

require __DIR__.'/auth.php';
