<?php

use App\Services\WeeklyPlanService;
use Illuminate\Foundation\Console\ClosureCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    /** @var ClosureCommand $this */
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('plans:generate', function (WeeklyPlanService $weeklyPlanService) {
    /** @var ClosureCommand $this */
    $result = $weeklyPlanService->generatePlansForEligibleUsers();
    $this->info("Planes generados: {$result['generated_plans']} / usuarios: {$result['processed_users']}");
})->purpose('Genera el plan semanal del mes para usuarios con objetivo');

Schedule::call(function () {
    app(WeeklyPlanService::class)->generatePlansForEligibleUsers();
})->weekly()->mondays()->at('00:00');
