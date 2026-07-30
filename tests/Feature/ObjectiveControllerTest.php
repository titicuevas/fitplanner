<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use App\Models\Workout;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ObjectiveControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_set_objective_and_generate_initial_weekly_plan(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['id' => 1, 'name' => 'Escalado']);
        Workout::factory()->count(5)->create(['category_id' => $category->id]);

        $response = $this->actingAs($user)->post(route('objective.store'), [
            'objective' => 'Pérdida de peso',
            'birth_date' => '1990-01-01',
            'height' => 170,
            'weight' => 70,
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseCount('weekly_plans', 5);
        $this->assertEquals('Pérdida de peso', $user->fresh()->objective);
    }

    public function test_validation_works_for_invalid_data(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('objective.store'), [
            'objective' => '',
            'birth_date' => 'invalid-date',
            'height' => 50,
            'weight' => 20,
        ]);

        $response->assertSessionHasErrors(['objective', 'birth_date', 'height', 'weight']);
    }

    public function test_objective_is_saved_even_when_no_workouts_are_available(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('objective.store'), [
            'objective' => 'Pérdida de peso',
            'birth_date' => '1990-01-01',
            'height' => 170,
            'weight' => 70,
        ]);

        $response->assertRedirect(route('dashboard'))
            ->assertSessionHas('error');

        $this->assertEquals('Pérdida de peso', $user->fresh()->objective);
        $this->assertDatabaseCount('weekly_plans', 0);
    }

    public function test_objective_form_renders_for_authenticated_user(): void
    {
        $user = User::factory()->withObjective()->create();

        $response = $this->actingAs($user)->get(route('objective.form'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('ObjectiveForm')
            ->has('user')
            ->where('user.objective', $user->objective)
            ->missing('user.password')
        );
    }
}
