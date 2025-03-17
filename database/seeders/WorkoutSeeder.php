<?php
// database/seeders/WorkoutSeeder.php
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
                'title' => 'Cindy ',
                'warmup' => 'Movilidad de cadera y hombros + saltos',
                'movements' => 'Pull-ups con banda, Knee Push-ups, Air Squats',
                'wod' => '20 min AMRAP: 5 pull-ups con banda, 10 knee push-ups, 15 air squats',
                'duration' => 60,
                'category_id' => 1, // Escalado
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Helen ',
                'warmup' => 'Carrera ligera + movilidad de cadera',
                'movements' => 'Run, Kettlebell Swings, Jumping Pull-ups',
                'wod' => '3 rounds for time: 400m run, 21 kettlebell swings (16kg/12kg), 12 jumping pull-ups',
                'duration' => 60,
                'category_id' => 1, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Annie ',
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
            [
                'title' => 'Diane',
                'warmup' => '5 min de cuerda + movilidad de muñecas',
                'movements' => 'Deadlifts, HSPU (Handstand Push-ups)',
                'wod' => '21-15-9 reps for time: Deadlifts (102kg/70kg), HSPU',
                'duration' => 60,
                'category_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Elizabeth',
                'warmup' => 'Movilidad de hombros + técnica de clean',
                'movements' => 'Clean, Ring Dips',
                'wod' => '21-15-9 reps for time: Clean (61kg/43kg), Ring Dips',
                'duration' => 60,
                'category_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Barbara',
                'warmup' => 'Movilidad de cadera + abdominales',
                'movements' => 'Pull-ups, Push-ups, Sit-ups, Air Squats',
                'wod' => '5 rounds for time: 20 pull-ups, 30 push-ups, 40 sit-ups, 50 air squats',
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
            
            // 🔹 Más WODs para completar los 30
            [
                'title' => 'WOD 7 ',
                'warmup' => 'Cardio de baja intensidad + movilidad de hombros',
                'movements' => 'Squats, Lunges, Push-ups',
                'wod' => '3 rounds for time: 10 squats, 10 lunges, 10 push-ups',
                'duration' => 60,
                'category_id' => 1, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'WOD 8 ',
                'warmup' => 'Correr 800m + movilidad de cadera',
                'movements' => 'Barbell Clean, Push Press',
                'wod' => '5 rounds for time: 10 barbell cleans, 10 push presses',
                'duration' => 60,
                'category_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'WOD 9 ',
                'warmup' => 'Correr 1km + estiramientos de piernas',
                'movements' => 'Muscle-ups, Deadlifts',
                'wod' => 'For time: 21 muscle-ups, 21 deadlifts (180kg)',
                'duration' => 60,
                'category_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
           // 🔹 ESCALADO (Fácil)
    [
        'title' => 'WOD 10 ',
        'warmup' => '5 min de cuerda + movilidad de hombros',
        'movements' => 'Kettlebell swings, Sit-ups, Jumping jacks',
        'wod' => '3 rounds for time: 15 kettlebell swings, 20 sit-ups, 25 jumping jacks',
        'duration' => 60,
        'category_id' => 1, 
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 11 ',
        'warmup' => 'Correr 400m + movilidad de muñecas',
        'movements' => 'Air squats, Push-ups, Burpees',
        'wod' => 'For time: 30 air squats, 20 push-ups, 10 burpees',
        'duration' => 60,
        'category_id' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    
    // 🔹 RX (Intermedio)
    [
        'title' => 'WOD 12 ',
        'warmup' => '5 min de salto de cuerda + movilidad de tobillos',
        'movements' => 'Power cleans, Pull-ups',
        'wod' => 'For time: 21-15-9 reps of Power Cleans (50kg), Pull-ups',
        'duration' => 60,
        'category_id' => 2, 
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 13 ',
        'warmup' => 'Carrera ligera + movilidad de hombros',
        'movements' => 'Overhead Squats, Pull-ups',
        'wod' => 'For time: 10 Overhead Squats (40kg), 20 pull-ups, 10 Overhead Squats (40kg), 20 pull-ups',
        'duration' => 60,
        'category_id' => 2,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 14 ',
        'warmup' => '5 min de cuerda + movilidad de cadera',
        'movements' => 'Push Press, Box Jumps',
        'wod' => '5 rounds for time: 15 Push Press (30kg), 20 Box Jumps',
        'duration' => 60,
        'category_id' => 2,
        'created_at' => now(),
        'updated_at' => now(),
    ],

    // 🔹 ÉLITE (Avanzado)
    [
        'title' => 'WOD 15 ',
        'warmup' => 'Carrera ligera + movilidad de muñecas',
        'movements' => 'Handstand Push-ups, Squat Cleans',
        'wod' => '5 rounds for time: 5 Handstand Push-ups, 10 Squat Cleans (70kg)',
        'duration' => 60,
        'category_id' => 3, // Élite
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 16 ',
        'warmup' => '10 min de cuerda + movilidad de caderas',
        'movements' => 'Snatches, Pull-ups',
        'wod' => 'For time: 30 Snatches (50kg), 30 Pull-ups',
        'duration' => 60,
        'category_id' => 3, // Élite
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 17 ',
        'warmup' => 'Sprints + movilidad de hombros',
        'movements' => 'Thrusters, Pull-ups, Deadlifts',
        'wod' => '5 rounds for time: 10 Thrusters (50kg), 15 Pull-ups, 10 Deadlifts (100kg)',
        'duration' => 60,
        'category_id' => 3, // Élite
        'created_at' => now(),
        'updated_at' => now(),
    ],
    
    // 🔹 Más WODs para completar los 30
    [
        'title' => 'WOD 18 ',
        'warmup' => '10 min de cardio moderado + estiramientos',
        'movements' => 'Kettlebell Swings, Wall Balls',
        'wod' => 'For time: 20 Kettlebell Swings, 20 Wall Balls, 20 Kettlebell Swings, 20 Wall Balls',
        'duration' => 60,
        'category_id' => 1, 
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 19 ',
        'warmup' => 'Movilidad de tobillos + movilidad de caderas',
        'movements' => 'Clean & Jerk, Ring Dips',
        'wod' => '3 rounds for time: 10 Clean & Jerks (40kg), 10 Ring Dips',
        'duration' => 60,
        'category_id' => 2, 
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 20 ',
        'warmup' => 'Sprints de 400m + movilidad de hombros',
        'movements' => 'Muscle-ups, Deadlifts',
        'wod' => 'For time: 15 Muscle-ups, 20 Deadlifts (180kg)',
        'duration' => 60,
        'category_id' => 3, 
        'created_at' => now(),
        'updated_at' => now(),
    ],
    // 🔹 ESCALADO (Fácil)
    [
        'title' => 'WOD 21 ',
        'warmup' => '5 min de cuerda + movilidad de muñecas',
        'movements' => 'Air squats, Push-ups, Sit-ups',
        'wod' => '3 rounds for time: 15 air squats, 10 push-ups, 10 sit-ups',
        'duration' => 60,
        'category_id' => 1, 
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 22 ',
        'warmup' => 'Movilidad de cadera + estiramiento de piernas',
        'movements' => 'Jumping Jacks, Air Squats, Push-ups',
        'wod' => 'For time: 50 jumping jacks, 20 air squats, 15 push-ups',
        'duration' => 60,
        'category_id' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ],

    // 🔹 RX (Intermedio)
    [
        'title' => 'WOD 23 ',
        'warmup' => '5 min de cuerda + movilidad de hombros',
        'movements' => 'Front Squat, Push-ups, Barbell Rows',
        'wod' => 'For time: 10 Front Squats (50kg), 20 push-ups, 15 barbell rows (40kg)',
        'duration' => 60,
        'category_id' => 2, 
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 24 ',
        'warmup' => 'Movilidad de cadera + técnica de deadlift',
        'movements' => 'Deadlifts, Ring Dips',
        'wod' => 'For time: 21-15-9 reps: Deadlifts (100kg), Ring Dips',
        'duration' => 60,
        'category_id' => 2,
        'created_at' => now(),
        'updated_at' => now(),
    ],

    // 🔹 ÉLITE (Avanzado)
    [
        'title' => 'WOD 25 ',
        'warmup' => 'Carrera ligera + estiramientos dinámicos',
        'movements' => 'Muscle-ups, Squat Cleans, Deadlifts',
        'wod' => 'For time: 10 Muscle-ups, 15 Squat Cleans (80kg), 20 Deadlifts (140kg)',
        'duration' => 60,
        'category_id' => 3, // Élite
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 26 ',
        'warmup' => 'Movilidad de hombros + técnica de muscle-ups',
        'movements' => 'Handstand Push-ups, Thrusters',
        'wod' => 'For time: 15 Handstand Push-ups, 21 Thrusters (50kg)',
        'duration' => 60,
        'category_id' => 3, // Élite
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 27 ',
        'warmup' => 'Sprints de 400m + movilidad de cadera',
        'movements' => 'Barbell Snatches, Pull-ups',
        'wod' => 'For time: 30 Snatches (60kg), 30 Pull-ups',
        'duration' => 60,
        'category_id' => 3, // Élite
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 28 ',
        'warmup' => '10 min de cuerda + movilidad de hombros',
        'movements' => 'Clean and Jerk, Wall Balls',
        'wod' => 'For time: 10 Clean & Jerk (60kg), 30 Wall Balls (9kg)',
        'duration' => 60,
        'category_id' => 3, // Élite
        'created_at' => now(),
        'updated_at' => now(),
    ],

    // 🔹 Más WODs para completar los 30
    [
        'title' => 'WOD 29 ',
        'warmup' => '5 min de correr + movilidad de cadera',
        'movements' => 'Squats, Push-ups, Burpees',
        'wod' => 'For time: 15 Squats, 20 Push-ups, 25 Burpees',
        'duration' => 60,
        'category_id' => 1, 
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'WOD 30 ',
        'warmup' => '5 min de cuerda + movilidad de muñecas',
        'movements' => 'Thrusters, Toes-to-bar',
        'wod' => 'For time: 15 Thrusters (30kg), 15 Toes-to-bar, 15 Thrusters (30kg), 15 Toes-to-bar',
        'duration' => 60,
        'category_id' => 2, 
        'created_at' => now(),
        'updated_at' => now(),
    ],
        ]);
    }
}
