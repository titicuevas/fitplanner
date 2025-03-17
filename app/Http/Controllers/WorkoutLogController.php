<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkoutLog;
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

        $log = WorkoutLog::create([
            'user_id' => Auth::id(),
            'workout_id' => $request->workout_id,
            'score' => $request->score,
            'notes' => $request->notes,
        ]);
        
        $completed = WorkoutLog::where('user_id', Auth::id())->pluck('workout_id');

        return response()->json($completed);
    }
    
    
}
