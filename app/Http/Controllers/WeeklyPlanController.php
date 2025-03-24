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
        // Verificar si el usuario tiene algún plan ya asignado
        $existingPlans = WeeklyPlan::where('user_id', $user->id)->exists();
        if ($existingPlans) {
            return; // Si ya tiene planes, no asignar nuevos
        }

        $workouts = Workout::all();
        $daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
        $currentMonth = now()->month; // Obtener el mes actual
        $weeklyPlan = [];

        foreach ($daysOfWeek as $day) {
            $workout = $workouts->random(); // Selecciona un WOD aleatorio

            $weeklyPlan[] = [
                'user_id' => $user->id,
                'workout_id' => $workout->id,
                'assigned_day' => $day,
                'month' => $currentMonth, // Asignar el mes actual
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

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