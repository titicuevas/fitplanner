import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmptyState from '@/Components/EmptyState';
import LoadingSpinner from '@/Components/LoadingSpinner';
import { useWeeklyPlan } from '@/hooks/useWeeklyPlan';

const categoryColors: Record<string, string> = {
    RX: 'bg-yellow-500',
    Escalado: 'bg-blue-500',
    Élite: 'bg-red-500',
    'Sin categoría': 'bg-gray-500',
};

export default function WeeklyPlan() {
    const {
        daysOfWeek,
        handleWodSelection,
        completeSelectedWod,
        isCompleting,
        loading,
        notes,
        plan,
        planByDay,
        score,
        selectedWod,
        setNotes,
        setScore,
    } = useWeeklyPlan();

    return (
        <AuthenticatedLayout>
            <Head title="Plan Semanal - FitPlanner" />

            <div className="min-h-screen bg-gray-50 py-6 transition-colors dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">Tu Plan Semanal</h1>
                        <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-300">
                            Aquí puedes ver tus entrenamientos programados para la semana
                        </p>
                    </div>

                    {loading ? (
                        <LoadingSpinner label="Cargando plan semanal..." />
                    ) : plan.length === 0 ? (
                        <EmptyState message="No hay plan disponible para esta semana." />
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                            {daysOfWeek.map((day) => {
                                const dailyPlan = planByDay[day];
                                const workout = dailyPlan?.workout;

                                return (
                                    <div key={day} className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-colors dark:bg-gray-800 dark:shadow-none">
                                        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/80">
                                            <h3 className="text-center text-base font-semibold text-gray-900 dark:text-white">{day}</h3>
                                        </div>

                                        {dailyPlan && workout ? (
                                            <div className="p-4 flex flex-col flex-grow">
                                                <div className="flex items-center mb-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${categoryColors[workout.category?.name ?? 'Sin categoría'] || 'bg-gray-500'}`}>
                                                        {workout.category?.name ?? 'RX'}
                                                    </span>
                                                </div>

                                                <div className="flex-grow">
                                                    <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                                                        {workout.title}
                                                    </h3>

                                                    <div className="space-y-6">
                                                        <div className="flex items-start gap-3">
                                                            <span className="flex-shrink-0 text-orange-500" aria-hidden="true">🔥</span>
                                                            <div className="flex-1">
                                                                <p className="text-sm text-gray-600 dark:text-gray-300">{workout.warmup}</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-start gap-3">
                                                            <span className="flex-shrink-0 text-yellow-500" aria-hidden="true">💪</span>
                                                            <div className="flex-1">
                                                                <p className="text-sm text-gray-600 dark:text-gray-300">{workout.movements}</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-start gap-3">
                                                            <span className="flex-shrink-0 text-gray-400" aria-hidden="true">🏋️</span>
                                                            <div className="flex-1">
                                                                <p className="text-sm text-gray-600 dark:text-gray-300">{workout.wod}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 border-t border-gray-100 pt-4 dark:border-gray-700">
                                                    <button
                                                        onClick={() => handleWodSelection(dailyPlan)}
                                                        disabled={dailyPlan.completed}
                                                        className={`
                                                            w-full inline-flex items-center justify-center gap-2 px-4 py-2.5
                                                            text-sm font-medium rounded-lg transition-colors duration-200
                                                            ${dailyPlan.completed
                                                                ? 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                                                                : 'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
                                                            }
                                                        `}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>Seleccionar WOD</span>
                                                    </button>
                                                </div>

                                                {selectedWod && selectedWod.workout.id === workout.id && (
                                                    <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-700">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                    Nota
                                                                </label>
                                                                <textarea
                                                                    value={notes}
                                                                    onChange={(e) => setNotes(e.target.value)}
                                                                    rows={2}
                                                                    className="w-full rounded-lg border-gray-200 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                                                                    placeholder="Añade una nota..."
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                    Puntuación
                                                                </label>
                                                                <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                                                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                                                                        <button
                                                                            key={value}
                                                                            onClick={() => setScore(value.toString())}
                                                                            className={`
                                                                                w-full h-10 rounded-lg transition-all duration-200
                                                                                ${Number(score) === value
                                                                                    ? 'scale-105 transform bg-green-500 text-white shadow-md ring-2 ring-green-500 ring-offset-2 dark:ring-offset-gray-800'
                                                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                                                                                }
                                                                                flex items-center justify-center text-center font-semibold
                                                                                focus:outline-none active:scale-95
                                                                            `}
                                                                        >
                                                                            {value}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <button
                                                                onClick={completeSelectedWod}
                                                                disabled={isCompleting}
                                                                className={`
                                                                    w-full mt-4 py-3 px-4 rounded-lg transition-all duration-200
                                                                    flex items-center justify-center gap-2
                                                                    ${isCompleting
                                                                        ? 'bg-gray-400 cursor-not-allowed'
                                                                        : 'bg-green-500 hover:bg-green-600 hover:shadow-lg'
                                                                    }
                                                                    text-white font-semibold
                                                                `}
                                                            >
                                                                {isCompleting ? (
                                                                    <>
                                                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                                        </svg>
                                                                        <span>Procesando...</span>
                                                                    </>
                                                                ) : (
                                                                    'Completar WOD'
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                                <div className="flex flex-grow flex-col p-4">
                                                <div className="flex-grow text-center text-sm text-gray-500 dark:text-gray-400">
                                                    No hay WOD programado
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
