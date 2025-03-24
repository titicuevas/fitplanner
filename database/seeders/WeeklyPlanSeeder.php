<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Workout;
use App\Models\WeeklyPlan;
use Illuminate\Support\Facades\DB;

class WeeklyPlanSeeder extends Seeder
{
    public function run()
    {
        // Obtener todos los usuarios
        $users = User::all();
        
        // Obtener todos los WODs
        $workouts = Workout::all();

        // Asignar un WOD aleatorio para cada día de la semana
        $days_of_week = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

        foreach ($users as $user) {
            foreach ($days_of_week as $day) {
                // Obtener un WOD aleatorio para ese día
                $workout = $workouts->random();

                WeeklyPlan::create([
                    'user_id' => $user->id,
                    'workout_id' => $workout->id,
                    'assigned_day' => $day,
                    'month' => now()->month,  // Asignar el mes actual
                ]);
            }
        }
    }
}
