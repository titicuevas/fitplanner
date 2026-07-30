<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use App\Models\WeeklyPlan;
use App\Models\Workout;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WeeklyPlanApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_verified_user_can_list_weekly_plan(): void
    {
        $user = User::factory()->create(['email_verified_at' => now()]);
        $workout = Workout::factory()->create();

        WeeklyPlan::create([
            'user_id' => $user->id,
            'workout_id' => $workout->id,
            'assigned_day' => 'Lunes',
            'month' => (string) now()->month,
            'completed' => false,
        ]);

        $response = $this->actingAs($user)->getJson('/api/weekly-plan');

        $response->assertOk();
        $this->assertCount(1, $response->json());
    }

    public function test_monthly_plan_filters_by_month(): void
    {
        $user = User::factory()->create(['email_verified_at' => now()]);
        $workout = Workout::factory()->create();

        WeeklyPlan::create([
            'user_id' => $user->id,
            'workout_id' => $workout->id,
            'assigned_day' => 'Lunes',
            'month' => '3',
            'completed' => false,
        ]);

        WeeklyPlan::create([
            'user_id' => $user->id,
            'workout_id' => Workout::factory()->create()->id,
            'assigned_day' => 'Martes',
            'month' => '4',
            'completed' => false,
        ]);

        $response = $this->actingAs($user)->getJson('/api/monthly-plan?month=3');

        $response->assertOk();
        $this->assertCount(1, $response->json());
    }

    public function test_count_workouts_by_month_returns_total(): void
    {
        $user = User::factory()->create(['email_verified_at' => now()]);
        $workout = Workout::factory()->create();

        WeeklyPlan::factory()->count(2)->create([
            'user_id' => $user->id,
            'workout_id' => $workout->id,
            'month' => '5',
        ]);

        $response = $this->actingAs($user)->getJson('/api/workouts-count?month=5');

        $response->assertOk()->assertJson(['count' => 2]);
    }

    public function test_generate_weekly_plan_creates_five_entries_for_users_with_objective(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
            'objective' => 'Pérdida de peso',
        ]);
        Category::factory()->create(['id' => 1, 'name' => 'Escalado']);
        Workout::factory()->count(3)->create(['category_id' => 1]);

        $response = $this->actingAs($user)->postJson('/api/weekly-plan/generate');

        $response->assertOk()
            ->assertJsonPath('generated', true)
            ->assertJsonPath('message', 'Plan semanal generado correctamente.');
        $this->assertDatabaseCount('weekly_plans', 5);
    }

    public function test_generate_weekly_plan_does_not_duplicate_current_month(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
            'objective' => 'Pérdida de peso',
        ]);
        $workout = Workout::factory()->create();

        WeeklyPlan::create([
            'user_id' => $user->id,
            'workout_id' => $workout->id,
            'assigned_day' => 'Lunes',
            'month' => (string) now()->month,
            'completed' => false,
        ]);

        $response = $this->actingAs($user)->postJson('/api/weekly-plan/generate');

        $response->assertOk()
            ->assertJsonPath('generated', false)
            ->assertJsonPath('message', 'Ya tienes un plan semanal para este mes.');
        $this->assertDatabaseCount('weekly_plans', 1);
    }

    public function test_generate_weekly_plan_only_affects_authenticated_user(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
            'objective' => 'Pérdida de peso',
        ]);
        $other = User::factory()->create([
            'email_verified_at' => now(),
            'objective' => 'Pérdida de peso',
        ]);
        Category::factory()->create(['id' => 1, 'name' => 'Escalado']);
        Workout::factory()->count(3)->create(['category_id' => 1]);

        $this->actingAs($user)->postJson('/api/weekly-plan/generate')->assertOk();

        $this->assertSame(5, WeeklyPlan::where('user_id', $user->id)->count());
        $this->assertSame(0, WeeklyPlan::where('user_id', $other->id)->count());
    }

    public function test_generate_weekly_plan_requires_objective(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
            'objective' => null,
        ]);

        $response = $this->actingAs($user)->postJson('/api/weekly-plan/generate');

        $response->assertStatus(422)->assertJsonPath('generated', false);
    }
}
