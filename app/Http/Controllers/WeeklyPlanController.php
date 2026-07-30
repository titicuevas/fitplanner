<?php

namespace App\Http\Controllers;

use App\Http\Requests\MonthlyPlanRequest;
use App\Http\Requests\WorkoutsByMonthRequest;
use App\Models\User;
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
        $users = User::query()
            ->whereNotNull('objective')
            ->get();

        $generatedPlans = 0;

        foreach ($users as $user) {
            if ($this->weeklyPlanService->generatePlanForUser($user)) {
                $generatedPlans++;
            }
        }

        return response()->json([
            'message' => 'Planificación semanal generada correctamente.',
            'generated_plans' => $generatedPlans,
            'processed_users' => $users->count(),
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

    public function getWorkoutsByMonth(WorkoutsByMonthRequest $request)
    {
        $validated = $request->validated();

        $workouts = WeeklyPlan::where('user_id', Auth::id())
            ->whereMonth('created_at', $validated['month'])
            ->whereYear('created_at', $validated['year'])
            ->with('workout.category')
            ->get();

        return response()->json($workouts);
    }
}
