<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use App\Models\Workout;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WorkoutControllerApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_workout(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/workouts', [
            'title' => 'Fran',
            'warmup' => 'Run 400m',
            'movements' => 'Thrusters, Pull-ups',
            'wod' => '21-15-9',
            'duration' => 25,
            'category_id' => $category->id,
        ]);

        $response->assertCreated()->assertJsonPath('title', 'Fran');
        $this->assertDatabaseHas('workouts', ['title' => 'Fran']);
    }

    public function test_workout_creation_validates_required_fields(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/workouts', []);

        $response->assertStatus(422)->assertJsonValidationErrors([
            'title', 'warmup', 'movements', 'wod', 'duration', 'category_id',
        ]);
    }

    public function test_authenticated_user_can_show_workout(): void
    {
        $user = User::factory()->create();
        $workout = Workout::factory()->create();

        $response = $this->actingAs($user)->getJson("/api/workouts/{$workout->id}");

        $response->assertOk()->assertJsonPath('id', $workout->id);
    }

    public function test_authenticated_user_can_update_workout(): void
    {
        $user = User::factory()->create();
        $workout = Workout::factory()->create(['title' => 'Viejo']);

        $response = $this->actingAs($user)->putJson("/api/workouts/{$workout->id}", [
            'title' => 'Nuevo',
            'duration' => 40,
        ]);

        $response->assertOk()->assertJsonPath('title', 'Nuevo');
        $this->assertDatabaseHas('workouts', ['id' => $workout->id, 'title' => 'Nuevo', 'duration' => 40]);
    }

    public function test_authenticated_user_can_delete_workout(): void
    {
        $user = User::factory()->create();
        $workout = Workout::factory()->create();

        $response = $this->actingAs($user)->deleteJson("/api/workouts/{$workout->id}");

        $response->assertOk()->assertJsonPath('message', 'Workout eliminado correctamente.');
        $this->assertDatabaseMissing('workouts', ['id' => $workout->id]);
    }
}
