<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use App\Models\Workout;
use App\Models\WorkoutLog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WorkoutLogApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_complete_workout(): void
    {
        $response = $this->postJson('/api/workouts/complete', [
            'workout_id' => 1,
        ]);

        $response->assertUnauthorized();
    }

    public function test_user_can_complete_workout(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['name' => 'RX']);
        $workout = Workout::factory()->create(['category_id' => $category->id]);

        $response = $this->actingAs($user)->postJson('/api/workouts/complete', [
            'workout_id' => $workout->id,
            'score' => 8,
            'notes' => 'Buen WOD',
        ]);

        $response->assertCreated()
            ->assertJsonPath('message', 'WOD completado y guardado en el historial');

        $this->assertDatabaseHas('workout_logs', [
            'user_id' => $user->id,
            'workout_id' => $workout->id,
            'score' => 8,
            'notes' => 'Buen WOD',
        ]);
    }

    public function test_complete_workout_validates_score_range(): void
    {
        $user = User::factory()->create();
        $workout = Workout::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/workouts/complete', [
            'workout_id' => $workout->id,
            'score' => 15,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['score']);
    }

    public function test_user_can_list_completed_workouts(): void
    {
        $user = User::factory()->create();
        $other = User::factory()->create();
        $workout = Workout::factory()->create();

        WorkoutLog::factory()->create([
            'user_id' => $user->id,
            'workout_id' => $workout->id,
        ]);
        WorkoutLog::factory()->create([
            'user_id' => $other->id,
            'workout_id' => $workout->id,
        ]);

        $response = $this->actingAs($user)->getJson('/api/workouts/completed');

        $response->assertOk();
        $this->assertCount(1, $response->json());
    }

    public function test_user_can_delete_own_completed_workout(): void
    {
        $user = User::factory()->create();
        $log = WorkoutLog::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->deleteJson("/api/workouts/completed/{$log->id}");

        $response->assertOk()
            ->assertJsonPath('message', 'WOD eliminado con éxito');

        $this->assertDatabaseMissing('workout_logs', ['id' => $log->id]);
    }

    public function test_user_cannot_delete_another_users_workout_log(): void
    {
        $user = User::factory()->create();
        $otherLog = WorkoutLog::factory()->create();

        $response = $this->actingAs($user)->deleteJson("/api/workouts/completed/{$otherLog->id}");

        $response->assertForbidden();
        $this->assertDatabaseHas('workout_logs', ['id' => $otherLog->id]);
    }

    public function test_user_can_filter_workouts_by_month(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);
        $workout = Workout::factory()->create();

        WorkoutLog::factory()->create([
            'user_id' => $user->id,
            'workout_id' => $workout->id,
            'completed_at' => now()->setDate(2026, 3, 15),
        ]);

        WorkoutLog::factory()->create([
            'user_id' => $user->id,
            'workout_id' => Workout::factory()->create()->id,
            'completed_at' => now()->setDate(2026, 1, 10),
        ]);

        $response = $this->actingAs($user)->getJson('/api/workouts-by-month?month=3&year=2026');

        $response->assertOk();
        $this->assertCount(1, $response->json());
    }

    public function test_workouts_index_requires_auth(): void
    {
        $this->getJson('/api/workouts')->assertUnauthorized();
    }

    public function test_authenticated_user_can_list_workouts(): void
    {
        $user = User::factory()->create();
        Workout::factory()->count(2)->create();

        $response = $this->actingAs($user)->getJson('/api/workouts');

        $response->assertOk();
        $this->assertCount(2, $response->json());
    }
}
