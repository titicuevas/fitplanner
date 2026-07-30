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

        $this->weeklyPlanService->assignPlanForObjective($user, $validated['objective']);

        return redirect()->route('dashboard')->with('success', '¡Perfil actualizado correctamente!');
    }
}
