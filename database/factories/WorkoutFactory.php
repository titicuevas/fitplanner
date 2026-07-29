<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Workout;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Workout>
 */
class WorkoutFactory extends Factory
{
    protected $model = Workout::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'warmup' => fake()->sentence(6),
            'movements' => fake()->sentence(8),
            'wod' => fake()->paragraph(),
            'duration' => fake()->numberBetween(20, 90),
            'category_id' => Category::factory(),
        ];
    }
}
