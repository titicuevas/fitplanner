use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Http\Controllers\WeeklyPlanController;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Actualizar planes de entrenamiento cada lunes a las 00:00
        $schedule->call(function () {
            $planController = new WeeklyPlanController();
            $planController->generateWeeklyPlan();
        })->weekly()->mondays()->at('00:00');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
} 