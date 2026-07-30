<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompleteWorkoutRequest;
use App\Http\Requests\WorkoutsByMonthRequest;
use App\Services\WorkoutLogService;
use Illuminate\Support\Facades\Auth;

class WorkoutLogController extends Controller
{
    public function __construct(private readonly WorkoutLogService $workoutLogService)
    {
    }

    public function store(CompleteWorkoutRequest $request)
    {
        $log = $this->workoutLogService->completeWorkout(
            Auth::id(),
            $request->validated()
        );

        return response()->json([
            'message' => 'WOD completado y guardado en el historial',
            'data' => $log,
        ], 201);
    }

    public function completedWorkouts()
    {
        return response()->json(
            $this->workoutLogService->listCompleted(Auth::id())
        );
    }

    public function destroy(int $id)
    {
        $result = $this->workoutLogService->deleteCompleted(Auth::id(), $id);

        return response()->json(
            ['message' => $result['message']],
            $result['status']
        );
    }

    public function completedWorkoutsByMonth(WorkoutsByMonthRequest $request)
    {
        $validated = $request->validated();

        return response()->json(
            $this->workoutLogService->listCompletedByMonth(
                Auth::id(),
                (int) $validated['month'],
                (int) $validated['year']
            )
        );
    }
}
