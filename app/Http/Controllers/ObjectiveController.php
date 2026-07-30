<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreObjectiveRequest;
use App\Services\WeeklyPlanService;
use Illuminate\Support\Facades\Auth;

class ObjectiveController extends Controller
{
    public function __construct(private readonly WeeklyPlanService $weeklyPlanService)
    {
    }

    public function store(StoreObjectiveRequest $request)
    {
        $validated = $request->validated();

        $user = Auth::user();
        $user->update($validated);

        $assigned = $this->weeklyPlanService->assignPlanForObjective(
            $user->fresh(),
            $validated['objective']
        );

        if (! $assigned) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'Objetivo guardado, pero no hay entrenamientos disponibles para generar el plan.');
        }

        return redirect()
            ->route('dashboard')
            ->with('success', '¡Objetivo guardado y plan semanal actualizado!');
    }
}
