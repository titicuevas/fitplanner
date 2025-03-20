<?php
namespace App\Http\Controllers;

use App\Models\WeeklyPlan;
use App\Models\Workout;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WeeklyPlanController extends Controller
{
    // Método para generar la planificación semanal para todos los usuarios
    public function generateWeeklyPlan()
    {
        $users = User::all(); // Obtener todos los usuarios en la base de datos
        $workouts = Workout::all(); // Obtener todos los WODs disponibles

        // Días de la semana para asignar los WODs
        $daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

        // Iterar sobre todos los usuarios
        foreach ($users as $user) {
            $this->generateWeeklyPlanForUser($user);
        }

        return response()->json(['message' => 'Planificación semanal generada para todos los usuarios con éxito']);
    }

    // Método para generar la planificación semanal para un usuario específico
    public function generateWeeklyPlanForUser($user)
    {
        $workouts = Workout::all(); // Obtener todos los WODs disponibles
        $daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
        $weeklyPlan = [];

        // Asignar un WOD aleatorio a cada día para el usuario
        foreach ($daysOfWeek as $day) {
            $workout = $workouts->random(); // Selecciona un WOD aleatorio

            // Crear la entrada para el plan semanal del usuario
            $weeklyPlan[] = [
                'user_id' => $user->id,
                'workout_id' => $workout->id,
                'assigned_day' => $day,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Guarda la planificación semanal en la base de datos para el usuario actual
        WeeklyPlan::insert($weeklyPlan);
    }

    // Método para obtener el plan semanal de un usuario específico
    public function getWeeklyPlan()
    {
        $user = Auth::user(); // Obtén al usuario autenticado
        $weeklyPlan = WeeklyPlan::where('user_id', $user->id)
            ->with('workout') // Cargar los detalles del workout
            ->get();

        return response()->json($weeklyPlan); // Devuelve los datos en formato JSON
    }
}