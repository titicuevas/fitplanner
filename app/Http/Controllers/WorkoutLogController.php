<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkoutLog;
use Illuminate\Support\Facades\Auth;
use App\Models\WeeklyPlan;

class WorkoutLogController extends Controller
{
    // 📌 Registrar o actualizar un WOD completado
    public function store(Request $request)
    {
        $request->validate([
            'workout_id' => 'required|exists:workouts,id',
            'score' => 'nullable|integer',
            'notes' => 'nullable|string',
        ]);

        // Crear o actualizar el log del entrenamiento
        $log = WorkoutLog::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'workout_id' => $request->workout_id,
            ],
            [
                'score' => $request->score,
                'notes' => $request->notes,
                'completed_at' => now(),
            ]
        );

        // Marcar el WOD como completado en la tabla weekly_plans
        $weeklyPlan = WeeklyPlan::where('user_id', Auth::id())
                                ->where('workout_id', $request->workout_id)
                                ->first();

        if ($weeklyPlan) {
            $weeklyPlan->completed = true;
            $weeklyPlan->save();
        }

        return response()->json([
            'message' => 'WOD completado y guardado en el historial',
            'data' => $log
        ], 201);
    }

    // 📌 Obtener todos los WODs completados por el usuario
    public function completedWorkouts()
    {
        $completed = WorkoutLog::where('user_id', Auth::id())
            ->with('workout.category') // Cargar la categoría correctamente
            ->orderBy('completed_at', 'desc')
            ->get();

        return response()->json($completed);
    }

    // 📌 Eliminar un WOD completado del historial
    public function destroy($id)
    {
        $log = WorkoutLog::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$log) {
            return response()->json(['message' => 'No tienes permiso para eliminar este WOD o no existe'], 403);
        }

        // Eliminar el log del WOD
        $log->delete();

        // Actualizar el estado de completado en la tabla weekly_plans
        $weeklyPlan = WeeklyPlan::where('user_id', Auth::id())
                                ->where('workout_id', $log->workout_id)
                                ->first();

        if ($weeklyPlan) {
            $weeklyPlan->completed = false;
            $weeklyPlan->save();
        }

        return response()->json(['message' => 'WOD eliminado con éxito']);
    }

    // 📌 Obtener el plan semanal del usuario
    public function getWeeklyPlan()
    {
        $user_id = Auth::id();
        $weeklyPlan = WeeklyPlan::where('user_id', $user_id)->with('workout.category')->get();

        return response()->json($weeklyPlan);
    }

    // 📌 Obtener los WODs completados por mes y año
    public function completedWorkoutsByMonth(Request $request)
    {
        $request->validate([
            'month' => 'required|numeric|between:1,12',
            'year' => 'required|numeric|min:2020',
        ]);

        $workouts = WorkoutLog::where('user_id', Auth::id())
            ->whereMonth('completed_at', $request->month)
            ->whereYear('completed_at', $request->year)
            ->with('workout.category') // Cargar la relación 'category' con 'workout'
            ->get();

        return response()->json($workouts);
    }
}