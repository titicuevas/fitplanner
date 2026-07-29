<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Workout;
use App\Models\WeeklyPlan;

class ObjectiveController extends Controller
{
    private const OBJECTIVE_CATEGORY_MAP = [
        'Pérdida de peso' => 1,
        'Ganancia muscular' => 2,
        'Mejorar resistencia' => 3,
        'Mejorar flexibilidad' => 4,
    ];

    public function store(Request $request)
    {
        $validated = $request->validate([
            'objective' => 'required|string',
            'birth_date' => 'required|date|before:today|after:1920-01-01',
            'height' => 'required|numeric|between:100,250',
            'weight' => 'required|numeric|between:30,200',
        ]);

        $user = Auth::user();
        $user->update($validated);

        $this->assignWorkoutsToUser($user, $validated['objective']);

        return redirect()->route('dashboard')->with('success', '¡Perfil actualizado correctamente!');
    }

    private function assignWorkoutsToUser($user, $objective)
    {
        $categoryId = $this->resolveCategoryId($objective);

        $user->workouts()->detach();
        WeeklyPlan::where('user_id', $user->id)->delete();

        $workouts = Workout::where('category_id', $categoryId)
            ->inRandomOrder()
            ->take(5)
            ->get();

        if ($workouts->isEmpty()) {
            $workouts = Workout::query()
                ->inRandomOrder()
                ->take(5)
                ->get();
        }

        if ($workouts->isEmpty()) {
            return;
        }

        $daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
        $currentMonth = now()->month;

        foreach ($daysOfWeek as $index => $day) {
            $workout = $workouts[$index % $workouts->count()];

            $user->workouts()->attach($workout->id);

            WeeklyPlan::create([
                'user_id' => $user->id,
                'workout_id' => $workout->id,
                'assigned_day' => $day,
                'month' => $currentMonth,
                'completed' => false,
            ]);
        }

        $user->objective = $objective;
        $user->save();
    }

    private function resolveCategoryId(string $objective): int
    {
        return self::OBJECTIVE_CATEGORY_MAP[$objective] ?? self::OBJECTIVE_CATEGORY_MAP['Pérdida de peso'];
    }
}
