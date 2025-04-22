<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Workout;
use App\Models\WeeklyPlan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ObjectiveControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_set_objective_and_get_weekly_plan()
    {
        $user = User::factory()->create();
        $workout = Workout::factory()->create(['category_id' => 1]);

        $response = $this->actingAs($user)
            ->post(route('objective.store'), [
                'objective' => 'Pérdida de peso',
                'birth_date' => '1990-01-01',
                'height' => 170,
                'weight' => 70
            ]);

        $response->assertRedirect(route('dashboard'));
        
        // Verificar que se creó el plan semanal
        $this->assertDatabaseHas('weekly_plans', [
            'user_id' => $user->id
        ]);

        // Verificar que el objetivo se actualizó
        $this->assertEquals('Pérdida de peso', $user->fresh()->objective);
    }

    public function test_validation_works_for_invalid_data()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post(route('objective.store'), [
                'objective' => '',
                'birth_date' => 'invalid-date',
                'height' => 50, // demasiado bajo
                'weight' => 20 // demasiado bajo
            ]);

        $response->assertSessionHasErrors(['objective', 'birth_date', 'height', 'weight']);
    }
} 