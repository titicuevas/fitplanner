<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkoutLog;
use App\Models\Workout;
use Illuminate\Support\Facades\Auth;

class WorkoutLogController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'workout_id' => 'required|exists:workouts,id',
            'score' => 'nullable|integer',
            'notes' => 'nullable|string',
        ]);

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

        // Guardar el nuevo WOD completado
        $log = WorkoutLog::create([
            'user_id' => Auth::id(),
            'workout_id' => $request->workout_id,
            'score' => $request->score,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'message' => 'WOD registrado con éxito',
            'data' => $log
        ], 201);
    }

    // 🔹 API para obtener todos los WODs completados por el usuario
    public function completedWorkouts()
    {
        $completed = WorkoutLog::where('user_id', Auth::id())
            ->with('workout.category') // 👈 Asegurarnos de cargar la categoría correctamente
            ->orderBy('created_at', 'desc')
            ->get();

        if ($completed->isEmpty()) {
            return response()->json(['message' => 'No se encontraron WODs completados'], 200);
        }

        return response()->json($completed);
    }
}
