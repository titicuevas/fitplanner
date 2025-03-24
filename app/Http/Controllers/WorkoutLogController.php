<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkoutLog;
use Illuminate\Support\Facades\Auth;
use App\Models\WeeklyPlan;

class WorkoutLogController extends Controller
{
    // 📌 Registrar o actualizar un WOD completado sin duplicados
    public function store(Request $request)
    {
        $request->validate([
            'workout_id' => 'required|exists:workouts,id',
            'score' => 'nullable|integer',
            'notes' => 'nullable|string',
        ]);

        // Usamos updateOrCreate para evitar duplicados
        $log = WorkoutLog::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'workout_id' => $request->workout_id,
            ],
            [
                'score' => $request->score,
                'notes' => $request->notes,
            ]
        );

        // Marcar el WOD como completado en la tabla weekly_plans
        $weeklyPlan = WeeklyPlan::where('user_id', Auth::id())
            ->where('workout_id', $request->workout_id)
            ->first();

        if ($weeklyPlan) {
            $weeklyPlan->completed = true;
            $weeklyPlan->score = $request->score;
            $weeklyPlan->notes = $request->notes;
            $weeklyPlan->save();
        }

        return response()->json([
            'message' => 'WOD registrado con éxito',
            'data' => $log
        ], 201);
    }

    // 📌 Obtener todos los WODs completados por el usuario
    public function completedWorkouts()
    {
        $completed = WorkoutLog::where('user_id', Auth::id())
            ->with('workout.category') // Cargar la categoría correctamente
            ->orderBy('created_at', 'desc')
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

        $log->delete();

        return response()->json(['message' => 'WOD eliminado con éxito']);
    }

    public function getWeeklyPlan()
    {
        $user_id = Auth::id();
        $weeklyPlan = WeeklyPlan::where('user_id', $user_id)->get();
    
        return response()->json($weeklyPlan);
    }
}