<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Workout;
use App\Models\WorkoutLog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WorkoutControllerApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_list_or_show_workouts(): void
    {
        $workout = Workout::factory()->create();

        $this->getJson('/api/workouts')->assertUnauthorized();
        $this->getJson("/api/workouts/{$workout->id}")->assertUnauthorized();
    }

    public function test_authenticated_user_can_list_workouts(): void
    {
        $user = User::factory()->create();
        Workout::factory()->count(2)->create();

        $response = $this->actingAs($user)->getJson('/api/workouts');

        $response->assertOk();
        $this->assertCount(2, $response->json());
        $response->assertJsonStructure([
            '*' => ['id', 'title', 'category'],
        ]);
    }

    public function test_authenticated_user_can_show_workout(): void
    {
        $user = User::factory()->create();
        $workout = Workout::factory()->create();

        $response = $this->actingAs($user)->getJson("/api/workouts/{$workout->id}");

        $response->assertOk()
            ->assertJsonPath('id', $workout->id)
            ->assertJsonMissingPath('logs')
            ->assertJsonMissingPath('comments');
    }

    public function test_show_does_not_expose_other_users_logs(): void
    {
        $user = User::factory()->create();
        $other = User::factory()->create();
        $workout = Workout::factory()->create();

        WorkoutLog::factory()->create([
            'user_id' => $other->id,
            'workout_id' => $workout->id,
            'notes' => 'secreto-de-otro',
        ]);

        $response = $this->actingAs($user)->getJson("/api/workouts/{$workout->id}");

        $response->assertOk();
        $this->assertStringNotContainsString('secreto-de-otro', $response->getContent());
        $response->assertJsonMissingPath('logs');
    }

    public function test_workout_mutations_are_not_available(): void
    {
        $user = User::factory()->create();
        $workout = Workout::factory()->create();

        $this->actingAs($user)->postJson('/api/workouts', [
            'title' => 'Fran',
        ])->assertMethodNotAllowed();

        $this->actingAs($user)->putJson("/api/workouts/{$workout->id}", [
            'title' => 'Nuevo',
        ])->assertMethodNotAllowed();

        $this->actingAs($user)->deleteJson("/api/workouts/{$workout->id}")
            ->assertMethodNotAllowed();

        $this->assertDatabaseHas('workouts', ['id' => $workout->id]);
    }
}
