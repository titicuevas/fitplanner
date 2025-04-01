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
        // Validar los datos del formulario
        $request->validate([
            'objective' => 'required|string',
            'age' => 'required|integer|min:1',
            'height' => 'required|integer|min:1',
            'weight' => 'required|integer|min:1',
        ]);

        // Obtener el usuario autenticado
        $user = Auth::user();

        if ($user) {
            // Actualizar los datos del usuario
            $user->objective = $request->objective;
            $user->age = $request->age;
            $user->height = $request->height;
            $user->weight = $request->weight;
            $user->save();  // Guardamos los datos actualizados

            // Asignar WODs basados en el objetivo
            $this->assignWorkoutsToUser($user, $request->objective);

            return redirect('/dashboard')->with('success', 'Tu objetivo ha sido guardado exitosamente y los entrenamientos asignados.');
        }

        return redirect()->route('login')->withErrors('No se pudo encontrar el usuario.');
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
    }

    // Obtener los WODs correspondientes al objetivo
    $workouts = Workout::where('category_id', $category_id)->take(5)->get(); // Obtener los primeros 5 WODs

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
            'assigned_day' => $daysOfWeek[$index % count($daysOfWeek)], // Asignar un día de la semana
            'month' => now()->month, // Mes actual
        ]);
    }
}
}
