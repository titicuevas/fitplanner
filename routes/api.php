<?php

use App\Http\Controllers\WeeklyPlanController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutLogController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/workouts', [WorkoutController::class, 'index']);
    Route::get('/workouts/{id}', [WorkoutController::class, 'show']);
    Route::post('/workouts', [WorkoutController::class, 'store']);
    Route::put('/workouts/{id}', [WorkoutController::class, 'update']);
    Route::delete('/workouts/{id}', [WorkoutController::class, 'destroy']);

    Route::post('/workouts/complete', [WorkoutLogController::class, 'store']);
    Route::get('/workouts/completed', [WorkoutLogController::class, 'completedWorkouts'])
        ->name('api.workouts.completed.index');
    Route::delete('/workouts/completed/{id}', [WorkoutLogController::class, 'destroy'])
        ->name('api.workouts.completed.destroy');
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
