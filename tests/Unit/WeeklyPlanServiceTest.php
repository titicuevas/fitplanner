<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\User;
use App\Models\WeeklyPlan;
use App\Models\Workout;
use App\Services\WeeklyPlanService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WeeklyPlanServiceTest extends TestCase
{
    use RefreshDatabase;

    private WeeklyPlanService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(WeeklyPlanService::class);
    }

    public function test_assign_plan_for_objective_creates_five_days_and_replaces_previous(): void
    {
        $category = Category::factory()->create(['id' => 1, 'name' => 'Escalado']);
        Workout::factory()->count(5)->create(['category_id' => $category->id]);

        $user = User::factory()->create();
        WeeklyPlan::factory()->create([
            'user_id' => $user->id,
            'assigned_day' => 'Lunes',
        ]);

        $ok = $this->service->assignPlanForObjective($user, 'Pérdida de peso');

        $this->assertTrue($ok);
        $this->assertDatabaseCount('weekly_plans', 5);
        $this->assertSame(5, $user->workouts()->count());
        $this->assertEqualsCanonicalizing(
            ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
            WeeklyPlan::where('user_id', $user->id)->pluck('assigned_day')->all()
        );
    }

    public function test_assign_plan_returns_false_when_no_workouts_exist(): void
    {
        $user = User::factory()->create();

        $ok = $this->service->assignPlanForObjective($user, 'Pérdida de peso');

        $this->assertFalse($ok);
        $this->assertDatabaseCount('weekly_plans', 0);
    }

    public function test_generate_plan_for_user_skips_if_month_already_has_plan(): void
    {
        $user = User::factory()->create(['objective' => 'Ganancia muscular']);
        WeeklyPlan::factory()->create([
            'user_id' => $user->id,
            'month' => (string) now()->month,
        ]);

        $ok = $this->service->generatePlanForUser($user);

        $this->assertFalse($ok);
        $this->assertDatabaseCount('weekly_plans', 1);
    }

    public function test_generate_plan_for_user_creates_entries_when_missing(): void
    {
        $category = Category::factory()->create(['id' => 2, 'name' => 'RX']);
        Workout::factory()->count(5)->create(['category_id' => $category->id]);
        $user = User::factory()->create(['objective' => 'Ganancia muscular']);

        $ok = $this->service->generatePlanForUser($user);

        $this->assertTrue($ok);
        $this->assertDatabaseCount('weekly_plans', 5);
        $this->assertTrue(
            WeeklyPlan::where('user_id', $user->id)
                ->where('month', now()->month)
                ->exists()
        );
    }

    public function test_generate_plans_for_eligible_users_processes_batch(): void
    {
        $category = Category::factory()->create(['id' => 1, 'name' => 'Escalado']);
        Workout::factory()->count(5)->create(['category_id' => $category->id]);

        User::factory()->create(['objective' => 'Pérdida de peso']);
        User::factory()->create(['objective' => 'Pérdida de peso']);
        User::factory()->create(['objective' => null]);

        $result = $this->service->generatePlansForEligibleUsers();

        $this->assertSame(2, $result['generated_plans']);
        $this->assertSame(2, $result['processed_users']);
        $this->assertDatabaseCount('weekly_plans', 10);
    }
}
