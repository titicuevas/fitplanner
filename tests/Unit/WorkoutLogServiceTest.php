<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\WeeklyPlan;
use App\Models\Workout;
use App\Models\WorkoutLog;
use App\Services\WorkoutLogService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WorkoutLogServiceTest extends TestCase
{
    use RefreshDatabase;

    private WorkoutLogService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(WorkoutLogService::class);
    }

    public function test_complete_workout_creates_log_and_marks_weekly_plan(): void
    {
        $user = User::factory()->create();
        $workout = Workout::factory()->create();
        $plan = WeeklyPlan::factory()->create([
            'user_id' => $user->id,
            'workout_id' => $workout->id,
            'completed' => false,
        ]);

        $log = $this->service->completeWorkout($user->id, [
            'workout_id' => $workout->id,
            'score' => 9,
            'notes' => 'Fuerte',
        ]);

        $this->assertSame($user->id, $log->user_id);
        $this->assertSame($workout->id, $log->workout_id);
        $this->assertSame(9, $log->score);
        $this->assertSame('Fuerte', $log->notes);
        $this->assertTrue($plan->fresh()->completed);
    }

    public function test_complete_workout_updates_existing_log(): void
    {
        $user = User::factory()->create();
        $workout = Workout::factory()->create();
        WorkoutLog::factory()->create([
            'user_id' => $user->id,
            'workout_id' => $workout->id,
            'score' => 5,
            'notes' => 'Antes',
        ]);

        $log = $this->service->completeWorkout($user->id, [
            'workout_id' => $workout->id,
            'score' => 8,
            'notes' => 'Después',
        ]);

        $this->assertDatabaseCount('workout_logs', 1);
        $this->assertSame(8, $log->score);
        $this->assertSame('Después', $log->notes);
    }

    public function test_delete_completed_unmarks_weekly_plan(): void
    {
        $user = User::factory()->create();
        $workout = Workout::factory()->create();
        $log = WorkoutLog::factory()->create([
            'user_id' => $user->id,
            'workout_id' => $workout->id,
        ]);
        $plan = WeeklyPlan::factory()->create([
            'user_id' => $user->id,
            'workout_id' => $workout->id,
            'completed' => true,
        ]);

        $result = $this->service->deleteCompleted($user->id, $log->id);

        $this->assertTrue($result['ok']);
        $this->assertSame(200, $result['status']);
        $this->assertDatabaseMissing('workout_logs', ['id' => $log->id]);
        $this->assertFalse($plan->fresh()->completed);
    }

    public function test_delete_completed_rejects_foreign_log(): void
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();
        $log = WorkoutLog::factory()->create(['user_id' => $owner->id]);

        $result = $this->service->deleteCompleted($intruder->id, $log->id);

        $this->assertFalse($result['ok']);
        $this->assertSame(403, $result['status']);
        $this->assertDatabaseHas('workout_logs', ['id' => $log->id]);
    }

    public function test_list_completed_by_month_filters_correctly(): void
    {
        $user = User::factory()->create();
        $inMonth = WorkoutLog::factory()->create([
            'user_id' => $user->id,
            'completed_at' => now()->setDate(2026, 7, 10),
        ]);
        WorkoutLog::factory()->create([
            'user_id' => $user->id,
            'completed_at' => now()->setDate(2026, 6, 10),
        ]);

        $results = $this->service->listCompletedByMonth($user->id, 7, 2026);

        $this->assertCount(1, $results);
        $this->assertSame($inMonth->id, $results->first()->id);
    }
}
