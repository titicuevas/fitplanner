<?php

namespace App\Http\Controllers;

use App\Http\Requests\MonthlyPlanRequest;
use App\Models\WeeklyPlan;
use App\Services\WeeklyPlanService;
use Illuminate\Support\Facades\Auth;

class WeeklyPlanController extends Controller
{
    public function __construct(private readonly WeeklyPlanService $weeklyPlanService)
    {
    }

    public function generateWeeklyPlan()
    {
        $user = Auth::user();

        if (! $user || ! $user->objective) {
            return response()->json([
                'message' => 'Debes definir un objetivo antes de generar tu plan semanal.',
                'generated' => false,
            ], 422);
        }

        $generated = $this->weeklyPlanService->generatePlanForUser($user);

        return response()->json([
            'message' => $generated
                ? 'Plan semanal generado correctamente.'
                : 'Ya tienes un plan semanal para este mes.',
            'generated' => $generated,
        ]);
    }

    public function getWeeklyPlan()
    {
        $weeklyPlan = WeeklyPlan::where('user_id', Auth::id())
            ->with('workout.category')
            ->orderBy('month')
            ->get();

        return response()->json($weeklyPlan);
    }

    public function getMonthlyPlan(MonthlyPlanRequest $request)
    {
        $validated = $request->validated();

        $monthlyPlan = WeeklyPlan::where('user_id', Auth::id())
            ->where('month', $validated['month'])
            ->with('workout.category')
            ->get();

        return response()->json($monthlyPlan);
    }

    public function countWorkoutsByMonth(MonthlyPlanRequest $request)
    {
        $validated = $request->validated();

        $workoutCount = WeeklyPlan::where('user_id', Auth::id())
            ->where('month', $validated['month'])
            ->count();

        return response()->json(['count' => $workoutCount]);
    }
}
