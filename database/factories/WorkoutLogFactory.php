<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Workout;
use App\Models\WorkoutLog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkoutLog>
 */
class WorkoutLogFactory extends Factory
{
    protected $model = WorkoutLog::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'workout_id' => Workout::factory(),
            'completed_at' => now(),
            'score' => fake()->numberBetween(1, 10),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
