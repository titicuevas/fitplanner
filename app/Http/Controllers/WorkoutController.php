<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    // Lista todos los entrenamientos
    public function index()
    {
        $workouts = Workout::with('category')->get();
        return response()->json($workouts);
    }
    
    // Crea un nuevo workout
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'warmup'      => 'required|string',
            'movements'   => 'required|string',
            'wod'         => 'required|string',
            'duration'    => 'required|integer',
            'category_id' => 'required|exists:categories,id'
        ]);
        
        $workout = Workout::create($data);
        return response()->json($workout, 201);
    }
    
    // Muestra un workout específico
    public function show($id)
    {
        $workout = Workout::with(['category', 'logs', 'comments'])->findOrFail($id);
        return response()->json($workout);
    }
    
    // Actualiza un workout
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'warmup'      => 'sometimes|required|string',
            'movements'   => 'sometimes|required|string',
            'wod'         => 'sometimes|required|string',
            'duration'    => 'sometimes|required|integer',
            'category_id' => 'sometimes|required|exists:categories,id'
        ]);
        
        $workout = Workout::findOrFail($id);
        $workout->update($data);
        return response()->json($workout);
    }
    
    // Elimina un workout
    public function destroy($id)
    {
        $workout = Workout::findOrFail($id);
        $workout->delete();
        return response()->json(['message' => 'Workout eliminado correctamente.']);
    }
}
