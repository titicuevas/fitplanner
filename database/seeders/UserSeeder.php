<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->withObjective('Pérdida de peso')->create([
            'name' => 'Demo FitPlanner',
            'email' => 'demo@fitplanner.test',
            'password' => 'password',
        ]);

        $objectives = [
            'Pérdida de peso',
            'Ganancia muscular',
            'Mejorar resistencia',
            'Mejorar flexibilidad',
        ];

        foreach ($objectives as $index => $objective) {
            User::factory()->withObjective($objective)->create([
                'name' => "Usuario {$objective}",
                'email' => 'usuario'.($index + 1).'@example.com',
                'password' => 'password',
            ]);
        }
    }
}
