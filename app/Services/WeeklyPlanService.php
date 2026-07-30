<?php

namespace App\Services;

use App\Models\User;
use App\Models\WeeklyPlan;
use App\Models\Workout;
use Illuminate\Support\Collection;

class WeeklyPlanService
{
    private const OBJECTIVE_CATEGORY_MAP = [
        'Pérdida de peso' => 1,
        'Ganancia muscular' => 2,
        'Mejorar resistencia' => 3,
        'Mejorar flexibilidad' => 4,
    ];

    /**
     * Reemplaza el plan actual del usuario y reasigna workouts.
     */
    public function assignPlanForObjective(User $user, string $objective): bool
    {
        $workouts = $this->resolveWorkoutsForObjective($objective, 5);

        if ($workouts->isEmpty()) {
            return false;
        }

        $user->workouts()->detach();
        WeeklyPlan::where('user_id', $user->id)->delete();

        foreach ($this->buildPlanRows($user->id, $workouts) as $row) {
            $user->workouts()->attach($row['workout_id']);
            WeeklyPlan::create($row);
        }

        return true;
    }

    /**
     * Genera el plan del mes actual si aún no existe.
     */
    public function generatePlanForUser(User $user): bool
    {
        $exists = WeeklyPlan::where('user_id', $user->id)
            ->where('month', now()->month)
            ->exists();

        if ($exists) {
            return false;
        }

        $workouts = $this->resolveWorkoutsForObjective($user->objective, 5);

        if ($workouts->isEmpty()) {
            return false;
        }

        WeeklyPlan::insert($this->buildPlanRows($user->id, $workouts));

        return true;
    }

    /**
     * @return \Illuminate\Support\Collection<int, \App\Models\Workout>
     */
    private function resolveWorkoutsForObjective(?string $objective, int $limit): Collection
    {
        $categoryId = $this->resolveCategoryId($objective);

        $workouts = Workout::where('category_id', $categoryId)
            ->inRandomOrder()
            ->limit($limit)
            ->get();

        if ($workouts->isEmpty()) {
            $workouts = Workout::query()
                ->inRandomOrder()
                ->limit($limit)
                ->get();
        }

        return $workouts;
    }

    /**
     * @param  \Illuminate\Support\Collection<int, \App\Models\Workout>  $workouts
     * @return array<int, array<string, mixed>>
     */
    private function buildPlanRows(int $userId, Collection $workouts): array
    {
        $daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
        $currentMonth = now()->month;
        $rows = [];

        foreach ($daysOfWeek as $index => $day) {
            $workout = $workouts[$index % $workouts->count()];

            $rows[] = [
                'user_id' => $userId,
                'workout_id' => $workout->id,
                'assigned_day' => $day,
                'month' => $currentMonth,
                'completed' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        return $rows;
    }

    private function resolveCategoryId(?string $objective): int
    {
        return self::OBJECTIVE_CATEGORY_MAP[$objective] ?? self::OBJECTIVE_CATEGORY_MAP['Pérdida de peso'];
    }
}
