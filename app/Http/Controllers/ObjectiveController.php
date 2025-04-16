<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Workout;
use App\Models\WeeklyPlan;

class ObjectiveController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'objective' => 'required|string',
            'birth_date' => 'required|date|before:today|after:1920-01-01',
            'height' => 'required|numeric|between:100,250',
            'weight' => 'required|numeric|between:30,200',
        ]);

        $user = Auth::user();
        $user->update($validated);

        // Asignar entrenamientos según el objetivo
        $this->assignWorkoutsToUser($user, $validated['objective']);

        return redirect()->route('dashboard')->with('success', '¡Perfil actualizado correctamente!');
    }

    // Asignar WODs según el objetivo
    private function assignWorkoutsToUser($user, $objective)
    {
        // Determinar el ID de categoría de WOD en función del objetivo
        $category_id = null;

        switch ($objective) {
            case 'perder_peso':
                $category_id = 1;
                break;
            case 'ganar_musculo':
                $category_id = 2;
                break;
            case 'mejorar_rendimiento':
                $category_id = 3;
                break;
            case 'mantener_forma':
                $category_id = 4;
                break;
        }

        // Si no hay categoría válida, no asignar entrenamientos
        if (!$category_id) {
            return;
        }

        // Eliminar asignaciones anteriores si existen
        $user->workouts()->detach();
        WeeklyPlan::where('user_id', $user->id)->delete();

        // Obtener los WODs correspondientes al objetivo
        $workouts = Workout::where('category_id', $category_id)->take(5)->get();

        // Días de la semana para asignar los WODs
        $daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

        // Asignar los WODs al usuario y crear el plan semanal
        foreach ($workouts as $index => $workout) {
            // Asignar el WOD al usuario (relación many-to-many)
            $user->workouts()->attach($workout->id);

            // Crear una entrada en la tabla `weekly_plans`
            WeeklyPlan::create([
                'user_id' => $user->id,
                'workout_id' => $workout->id,
                'assigned_day' => $daysOfWeek[$index % count($daysOfWeek)],
                'month' => now()->month,
            ]);
        }
    }
}
