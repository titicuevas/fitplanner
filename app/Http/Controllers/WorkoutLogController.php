<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompleteWorkoutRequest;
use App\Http\Requests\WorkoutsByMonthRequest;
use App\Models\WeeklyPlan;
use App\Models\WorkoutLog;
use Illuminate\Support\Facades\Auth;

class WorkoutLogController extends Controller
{
    public function store(CompleteWorkoutRequest $request)
    {
        $validated = $request->validated();

        $log = WorkoutLog::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'workout_id' => $validated['workout_id'],
            ],
            [
                'score' => $validated['score'] ?? null,
                'notes' => $validated['notes'] ?? null,
                'completed_at' => now(),
            ]
        );

        $weeklyPlan = WeeklyPlan::where('user_id', Auth::id())
            ->where('workout_id', $validated['workout_id'])
            ->first();

        if ($weeklyPlan) {
            $weeklyPlan->completed = true;
            $weeklyPlan->save();
        }

        return response()->json([
            'message' => 'WOD completado y guardado en el historial',
            'data' => $log,
        ], 201);
    }

    public function completedWorkouts()
    {
        $completed = WorkoutLog::where('user_id', Auth::id())
            ->with('workout.category')
            ->orderBy('completed_at', 'desc')
            ->get();

        return response()->json($completed);
    }

    public function destroy(int $id)
    {
        $log = WorkoutLog::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$log) {
            return response()->json([
                'message' => 'No tienes permiso para eliminar este WOD o no existe',
            ], 403);
        }

        $workoutId = $log->workout_id;
        $log->delete();

        $weeklyPlan = WeeklyPlan::where('user_id', Auth::id())
            ->where('workout_id', $workoutId)
            ->first();

        if ($weeklyPlan) {
            $weeklyPlan->completed = false;
            $weeklyPlan->save();
        }

        return response()->json(['message' => 'WOD eliminado con éxito']);
    }

    public function getWeeklyPlan()
    {
        $weeklyPlan = WeeklyPlan::where('user_id', Auth::id())
            ->with('workout.category')
            ->get();

        return response()->json($weeklyPlan);
    }

    public function completedWorkoutsByMonth(WorkoutsByMonthRequest $request)
    {
        $validated = $request->validated();

        $workouts = WorkoutLog::where('user_id', Auth::id())
            ->whereMonth('completed_at', $validated['month'])
            ->whereYear('completed_at', $validated['year'])
            ->with('workout.category')
            ->get();

        return response()->json($workouts);
    }
}
