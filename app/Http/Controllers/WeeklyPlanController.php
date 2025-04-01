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
        // Verificar si el usuario ya tiene un plan asignado
        $existingPlans = WeeklyPlan::where('user_id', $user->id)->exists();
        if ($existingPlans) {
            return; // Si ya tiene un plan asignado, no asignar nuevos
        }

        // Obtener los WODs correspondientes al objetivo del usuario
        $objective = $user->objective; // Objetivo del usuario (ej. "Pérdida de peso")
        $category_id = null;

        // Asignar la categoría en función del objetivo
        switch ($objective) {
            case 'Pérdida de peso':
                $category_id = 1; // Asumiendo que la categoría de "Pérdida de peso" es 1
                break;
            case 'Ganancia muscular':
                $category_id = 2; // Categoría para "Ganancia muscular"
                break;
            case 'Mejorar resistencia':
                $category_id = 3; // Categoría para "Mejorar resistencia"
                break;
            case 'Mejorar flexibilidad':
                $category_id = 4; // Categoría para "Mejorar flexibilidad"
                break;
            default:
                $category_id = 1; // Si no se encuentra un objetivo, asignamos por defecto "Pérdida de peso"
        }

        // Obtener los WODs de la categoría correspondiente
        $workouts = Workout::where('category_id', $category_id)->get(); // WODs de la categoría del objetivo del usuario
        $daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']; // Los días de la semana para asignar WODs
        $currentMonth = now()->month; // Mes actual
        $weeklyPlan = [];

        // Asignar un WOD a cada día de la semana
        foreach ($daysOfWeek as $day) {
            // Seleccionar un WOD aleatorio de la categoría correspondiente
            $workout = $workouts->random();

            // Asignar el WOD al día de la semana
            $weeklyPlan[] = [
                'user_id' => $user->id,
                'workout_id' => $workout->id,
                'assigned_day' => $day,
                'month' => $currentMonth, // Mes actual
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insertar la planificación semanal en la base de datos
        WeeklyPlan::insert($weeklyPlan);
    }

    // Método para obtener el plan semanal de un usuario específico
    public function getWeeklyPlan()
    {
        $user = Auth::user(); // Obtén al usuario autenticado
        $weeklyPlan = WeeklyPlan::where('user_id', $user->id)
            ->with('workout.category') // Cargar las categorías de los WODs
            ->get();
    
        return response()->json($weeklyPlan); // Devuelve los datos en formato JSON
    }

    // Método para obtener el plan mensual de un usuario específico
    public function getMonthlyPlan(Request $request)
    {
        $user = Auth::user(); // Obtén al usuario autenticado
        $month = $request->input('month'); // Mes solicitado

        // Obtener los WODs del mes solicitado
        $monthlyPlan = WeeklyPlan::where('user_id', $user->id)
            ->where('month', $month) // Filtrar por mes
            ->with('workout') // Cargar los detalles del workout
            ->get();

        return response()->json($monthlyPlan); // Devuelve los datos en formato JSON
    }

    // Método para contar los WODs realizados por mes
    public function countWorkoutsByMonth(Request $request)
    {
        $user = Auth::user(); // Obtén al usuario autenticado
        $month = $request->input('month'); // Mes solicitado

        // Contar los WODs realizados en el mes
        $workoutCount = WeeklyPlan::where('user_id', $user->id)
            ->where('month', $month)
            ->count();

        return response()->json(['count' => $workoutCount]); // Devuelve el conteo de WODs
    }

    // Método para obtener los WODs realizados por mes
    public function getWorkoutsByMonth(Request $request)
    {
        $user = Auth::user();
        $month = $request->input('month');  // Recibe el mes desde la solicitud
        $year = $request->input('year');    // Recibe el año (si es necesario)

        // Filtrar los WODs por el mes y año
        $workouts = WeeklyPlan::where('user_id', $user->id)
            ->whereMonth('created_at', '=', $month)
            ->whereYear('created_at', '=', $year)
            ->with('workout') // Cargar los detalles del workout
            ->get();

        return response()->json($workouts); // Devuelve los WODs en formato JSON
    }
}
