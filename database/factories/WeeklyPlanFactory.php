<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\WeeklyPlan;
use App\Models\Workout;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WeeklyPlan>
 */
class WeeklyPlanFactory extends Factory
{
    protected $model = WeeklyPlan::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'workout_id' => Workout::factory(),
            'assigned_day' => fake()->randomElement(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']),
            'month' => (string) now()->month,
            'completed' => false,
        ];
    }
}
