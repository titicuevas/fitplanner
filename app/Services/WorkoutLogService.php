<?php

namespace App\Services;

use App\Models\WeeklyPlan;
use App\Models\WorkoutLog;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class WorkoutLogService
{
    /**
     * @param  array{workout_id: int, score?: int|null, notes?: string|null}  $data
     */
    public function completeWorkout(int $userId, array $data): WorkoutLog
    {
        return DB::transaction(function () use ($userId, $data) {
            $log = WorkoutLog::updateOrCreate(
                [
                    'user_id' => $userId,
                    'workout_id' => $data['workout_id'],
                ],
                [
                    'score' => $data['score'] ?? null,
                    'notes' => $data['notes'] ?? null,
                    'completed_at' => now(),
                ]
            );

            $this->markWeeklyPlanCompleted($userId, $data['workout_id'], true);

            return $log;
        });
    }

    public function listCompleted(int $userId): Collection
    {
        return WorkoutLog::where('user_id', $userId)
            ->with('workout.category')
            ->orderBy('completed_at', 'desc')
            ->get();
    }

    public function listCompletedByMonth(int $userId, int $month, int $year): Collection
    {
        return WorkoutLog::where('user_id', $userId)
            ->whereMonth('completed_at', $month)
            ->whereYear('completed_at', $year)
            ->with('workout.category')
            ->get();
    }

    /**
     * @return array{ok: bool, message: string, status: int}
     */
    public function deleteCompleted(int $userId, int $logId): array
    {
        $log = WorkoutLog::where('id', $logId)
            ->where('user_id', $userId)
            ->first();

        if (! $log) {
            return [
                'ok' => false,
                'message' => 'No tienes permiso para eliminar este WOD o no existe',
                'status' => 403,
            ];
        }

        DB::transaction(function () use ($userId, $log) {
            $workoutId = $log->workout_id;
            $log->delete();
            $this->markWeeklyPlanCompleted($userId, $workoutId, false);
        });

        return [
            'ok' => true,
            'message' => 'WOD eliminado con éxito',
            'status' => 200,
        ];
    }

    private function markWeeklyPlanCompleted(int $userId, int $workoutId, bool $completed): void
    {
        $weeklyPlan = WeeklyPlan::where('user_id', $userId)
            ->where('workout_id', $workoutId)
            ->first();

        if ($weeklyPlan) {
            $weeklyPlan->completed = $completed;
            $weeklyPlan->save();
        }
    }
}
