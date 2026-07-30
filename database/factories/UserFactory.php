<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'birth_date' => fake()->date('Y-m-d', '-18 years'),
            'objective' => null,
            'height' => null,
            'weight' => null,
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function withObjective(string $objective = 'Pérdida de peso'): static
    {
        return $this->state(fn (array $attributes) => [
            'objective' => $objective,
            'height' => fake()->numberBetween(155, 195),
            'weight' => fake()->randomFloat(1, 55, 100),
        ]);
    }
}
