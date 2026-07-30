<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiAuthConsistencyTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_unauthorized_on_all_api_endpoints(): void
    {
        $this->getJson('/api/workouts')->assertUnauthorized();
        $this->getJson('/api/workouts/completed')->assertUnauthorized();
        $this->postJson('/api/workouts/complete', ['workout_id' => 1])->assertUnauthorized();
        $this->getJson('/api/weekly-plan')->assertUnauthorized();
        $this->postJson('/api/weekly-plan/generate')->assertUnauthorized();
        $this->getJson('/api/monthly-plan?month=1')->assertUnauthorized();
        $this->getJson('/api/workouts-count?month=1')->assertUnauthorized();
        $this->getJson('/api/workouts-by-month?month=1&year=2026')->assertUnauthorized();
    }

    public function test_authenticated_user_can_reach_former_auth_and_sanctum_groups(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->getJson('/api/workouts')->assertOk();
        $this->actingAs($user)->getJson('/api/weekly-plan')->assertOk();
        $this->actingAs($user)->getJson('/api/workouts-by-month?month=7&year=2026')->assertOk();
    }

    public function test_api_mutation_routes_remain_available_under_rate_limit(): void
    {
        $user = User::factory()->withObjective()->create();
        \App\Models\Category::factory()->create(['id' => 1, 'name' => 'Escalado']);
        \App\Models\Workout::factory()->count(3)->create(['category_id' => 1]);

        $this->actingAs($user)
            ->postJson('/api/weekly-plan/generate')
            ->assertOk()
            ->assertJsonPath('generated', true);
    }
}
