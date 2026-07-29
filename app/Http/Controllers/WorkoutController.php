<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWorkoutRequest;
use App\Http\Requests\UpdateWorkoutRequest;
use App\Models\Workout;

class WorkoutController extends Controller
{
    public function index()
    {
        $workouts = Workout::with('category')->get();

        return response()->json($workouts);
    }

    public function store(StoreWorkoutRequest $request)
    {
        $workout = Workout::create($request->validated());

        return response()->json($workout, 201);
    }

    public function show(int $id)
    {
        $workout = Workout::with(['category', 'logs', 'comments'])->findOrFail($id);

        return response()->json($workout);
    }

    public function update(UpdateWorkoutRequest $request, int $id)
    {
        $workout = Workout::findOrFail($id);
        $workout->update($request->validated());

        return response()->json($workout);
    }

    public function destroy(int $id)
    {
        $workout = Workout::findOrFail($id);
        $workout->delete();

        return response()->json(['message' => 'Workout eliminado correctamente.']);
    }
}
