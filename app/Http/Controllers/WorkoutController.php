<?php

namespace App\Http\Controllers;

use App\Models\Workout;

class WorkoutController extends Controller
{
    public function index()
    {
        $workouts = Workout::with('category')
            ->orderBy('title')
            ->get();

        return response()->json($workouts);
    }

    public function show(int $id)
    {
        $workout = Workout::with('category')->findOrFail($id);

        return response()->json($workout);
    }
}
