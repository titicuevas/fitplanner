<?php

use App\Http\Controllers\WeeklyPlanController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutLogController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Rutas estáticas antes de /workouts/{id}
    Route::get('/workouts', [WorkoutController::class, 'index'])
        ->name('api.workouts.index');
    Route::post('/workouts/complete', [WorkoutLogController::class, 'store'])
        ->name('api.workouts.complete');
    Route::get('/workouts/completed', [WorkoutLogController::class, 'completedWorkouts'])
        ->name('api.workouts.completed.index');
    Route::delete('/workouts/completed/{id}', [WorkoutLogController::class, 'destroy'])
        ->name('api.workouts.completed.destroy');
    Route::get('/workouts/{id}', [WorkoutController::class, 'show'])
        ->whereNumber('id')
        ->name('api.workouts.show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/weekly-plan', [WeeklyPlanController::class, 'getWeeklyPlan'])
        ->name('api.weekly-plan.show');
    Route::post('/weekly-plan/generate', [WeeklyPlanController::class, 'generateWeeklyPlan'])
        ->name('api.weekly-plan.generate');
    Route::get('/monthly-plan', [WeeklyPlanController::class, 'getMonthlyPlan'])
        ->name('api.monthly-plan.show');
    Route::get('/workouts-count', [WeeklyPlanController::class, 'countWorkoutsByMonth'])
        ->name('api.workouts.count');
    Route::get('/workouts-by-month', [WorkoutLogController::class, 'completedWorkoutsByMonth'])
        ->name('api.workouts.by-month');
});
