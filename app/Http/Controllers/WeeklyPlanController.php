<?php

namespace App\Http\Controllers;

use App\Models\WeeklyPlan;
use App\Models\Workout;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WeeklyPlanController extends Controller
{
    private const OBJECTIVE_CATEGORY_MAP = [
        'Pérdida de peso' => 1,
        'Ganancia muscular' => 2,
        'Mejorar resistencia' => 3,
        'Mejorar flexibilidad' => 4,
    ];

    public function generateWeeklyPlan()
    {
        $users = User::query()
            ->whereNotNull('objective')
            ->get();

        $generatedPlans = 0;

        foreach ($users as $user) {
            if ($this->generateWeeklyPlanForUser($user)) {
                $generatedPlans++;
            }
        }

        return response()->json([
            'message' => 'Planificación semanal generada correctamente.',
            'generated_plans' => $generatedPlans,
            'processed_users' => $users->count(),
        ]);
    }

    public function generateWeeklyPlanForUser($user)
    {
        $existingPlans = WeeklyPlan::where('user_id', $user->id)
            ->where('month', now()->month)
            ->exists();

        if ($existingPlans) {
            return false;
        }

        $categoryId = $this->resolveCategoryId($user->objective);

        $workouts = Workout::where('category_id', $categoryId)
            ->inRandomOrder()
            ->limit(5)
            ->get();

        if ($workouts->isEmpty()) {
            $workouts = Workout::query()
                ->inRandomOrder()
                ->limit(5)
                ->get();
        }

        if ($workouts->isEmpty()) {
            return false;
        }

        $daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
        $currentMonth = now()->month;
        $weeklyPlan = [];

        foreach ($daysOfWeek as $index => $day) {
            $workout = $workouts[$index % $workouts->count()];

            $weeklyPlan[] = [
                'user_id' => $user->id,
                'workout_id' => $workout->id,
                'assigned_day' => $day, 
                'month' => $currentMonth,
                'completed' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        WeeklyPlan::insert($weeklyPlan);
        return true;
    }

    public function getWeeklyPlan()
    {
        $user = Auth::user();
        $weeklyPlan = WeeklyPlan::where('user_id', $user->id)
            ->with('workout.category')
            ->orderBy('month')
            ->get();
    
        return response()->json($weeklyPlan);
    }

    public function getMonthlyPlan(Request $request)
    {
        $validated = $request->validate([
            'month' => 'required|integer|between:1,12',
        ]);

        $user = Auth::user();

        $monthlyPlan = WeeklyPlan::where('user_id', $user->id)
            ->where('month', $validated['month'])
            ->with('workout.category')
            ->get();

        return response()->json($monthlyPlan);
    }

    public function countWorkoutsByMonth(Request $request)
    {
        $validated = $request->validate([
            'month' => 'required|integer|between:1,12',
        ]);

        $user = Auth::user();

        $workoutCount = WeeklyPlan::where('user_id', $user->id)
            ->where('month', $validated['month'])
            ->count();

        return response()->json(['count' => $workoutCount]);
    }

    public function getWorkoutsByMonth(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'month' => 'required|integer|between:1,12',
            'year' => 'required|integer|min:2020',
        ]);

        $workouts = WeeklyPlan::where('user_id', $user->id)
            ->whereMonth('created_at', '=', $validated['month'])
            ->whereYear('created_at', '=', $validated['year'])
            ->with('workout.category')
            ->get();

        return response()->json($workouts);
    }

    private function resolveCategoryId(?string $objective): int
    {
        return self::OBJECTIVE_CATEGORY_MAP[$objective] ?? self::OBJECTIVE_CATEGORY_MAP['Pérdida de peso'];
    }
}
