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
            case 'Pérdida de peso':
                $category_id = 1;
                break;
            case 'Ganancia muscular':
                $category_id = 2;
                break;
            case 'Mejorar resistencia':
                $category_id = 3;
                break;
            case 'Mejorar flexibilidad':
                $category_id = 4;
                break;
            default:
                $category_id = 1; // Categoría por defecto
        }

        // Eliminar asignaciones anteriores si existen
        $user->workouts()->detach();
        WeeklyPlan::where('user_id', $user->id)->delete();

        // Obtener los WODs correspondientes al objetivo
        $workouts = Workout::where('category_id', $category_id)->inRandomOrder()->take(5)->get();

        // Días de la semana para asignar los WODs
        $daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
        $currentMonth = now()->month;

        // Asignar los WODs al usuario y crear el plan semanal
        foreach ($workouts as $index => $workout) {
            // Asignar el WOD al usuario (relación many-to-many)
            $user->workouts()->attach($workout->id);

            // Crear una entrada en la tabla weekly_plans
            WeeklyPlan::create([
                'user_id' => $user->id,
                'workout_id' => $workout->id,
                'assigned_day' => $daysOfWeek[$index],
                'month' => $currentMonth,
                'completed' => false
            ]);
        }

        // Asegurarse de que el objetivo se guarda en el usuario
        $user->objective = $objective;
        $user->save();
    }
}
