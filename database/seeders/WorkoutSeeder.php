<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkoutSeeder extends Seeder
{
    public function run()
    {
        DB::table('workouts')->insert([
            // 🔹 ESCALADO (Fácil)
            [
                'title' => 'Cindy (Escalado)',
                'warmup' => 'Movilidad de cadera y hombros + saltos',
                'movements' => 'Pull-ups con banda, Knee Push-ups, Air Squats',
                'wod' => '20 min AMRAP: 5 pull-ups con banda, 10 knee push-ups, 15 air squats',
                'duration' => 60,
                'category_id' => 1, // Escalado
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Helen (Escalado)',
                'warmup' => 'Carrera ligera + movilidad de cadera',
                'movements' => 'Run, Kettlebell Swings, Jumping Pull-ups',
                'wod' => '3 rounds for time: 400m run, 21 kettlebell swings (16kg/12kg), 12 jumping pull-ups',
                'duration' => 60,
                'category_id' => 1, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Annie (Escalado)',
                'warmup' => 'Salto de cuerda + movilidad de hombros',
                'movements' => 'Double-Unders, Sit-ups',
                'wod' => '50-40-30-20-10 reps: Double-Unders, Sit-ups',
                'duration' => 60,
                'category_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 🔹 RX (Intermedio)
            [
                'title' => 'Fran',
                'warmup' => '5 min salto de cuerda + movilidad de hombros',
                'movements' => 'Thrusters (43kg/30kg), Pull-ups',
                'wod' => '21-15-9 reps for time: Thrusters y Pull-ups',
                'duration' => 60,
                'category_id' => 2, // RX
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Grace',
                'warmup' => 'Técnica de clean & jerk + movilidad de hombros',
                'movements' => 'Clean & Jerk',
                'wod' => 'For time: 30 Clean & Jerk (61kg/43kg)',
                'duration' => 60,
                'category_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Jackie',
                'warmup' => 'Movilidad de hombros y técnica de row',
                'movements' => 'Row, Thrusters, Pull-ups',
                'wod' => 'For time: 1000m Row, 50 Thrusters (20kg), 30 Pull-ups',
                'duration' => 60,
                'category_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 🔹 ÉLITE (Avanzado)
            [
                'title' => 'Murph',
                'warmup' => 'Carrera ligera + estiramientos dinámicos',
                'movements' => 'Pull-ups, Push-ups, Air Squats, Running',
                'wod' => '1 mile run, 100 pull-ups, 200 push-ups, 300 air squats, 1 mile run (con chaleco de 9kg)',
                'duration' => 60,
                'category_id' => 3, // Élite
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Amanda',
                'warmup' => 'Técnica de muscle-ups + técnica de snatch',
                'movements' => 'Muscle-ups, Squat Snatch',
                'wod' => '9-7-5 reps for time: Muscle-ups, Squat Snatch (61kg/43kg)',
                'duration' => 60,
                'category_id' => 3, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'King Kong',
                'warmup' => 'Movilidad de muñecas y técnica de deadlift',
                'movements' => 'Deadlift, Muscle-ups, Squat Clean, Handstand Push-ups',
                'wod' => '3 rounds: 1 Deadlift (206kg), 2 Muscle-ups, 3 Squat Cleans (113kg), 4 Handstand Push-ups',
                'duration' => 60,
                'category_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
