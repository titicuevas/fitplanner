import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmptyState from '@/Components/EmptyState';
import LoadingSpinner from '@/Components/LoadingSpinner';
import { useWorkoutHistory } from '@/hooks/useWorkoutHistory';

const categoryColors: Record<string, string> = {
    Escalado: 'bg-blue-500',
    RX: 'bg-yellow-500',
    Élite: 'bg-red-500',
    'Sin categoría': 'bg-gray-500',
};

const spinnerPath = 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z';

function SpinnerIcon() {
    return (
        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d={spinnerPath} />
        </svg>
    );
}

export default function WorkoutHistory() {
    const {
        history,
        loading,
        notes,
        scores,
        saving,
        deleting,
        selectedMonth,
        selectedYear,
        setNotes,
        setScores,
        setSelectedMonth,
        setSelectedYear,
        saveEntry,
        deleteEntry,
    } = useWorkoutHistory();

    return (
        <AuthenticatedLayout>
            <Head title="Historial - FitPlanner" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm transition-colors sm:rounded-lg dark:bg-gray-800 dark:shadow-none">
                        <div className="p-6">
                            <div className="mb-8 text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Historial de Workouts
                                </h2>

                                <div className="mt-6 flex justify-center gap-4">
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                        aria-label="Seleccionar mes"
                                        className="rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-red-500 focus:outline-none focus:ring-red-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                                    >
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {new Date(0, i).toLocaleString('es-ES', { month: 'long' })}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                                        aria-label="Seleccionar año"
                                        className="rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-red-500 focus:outline-none focus:ring-red-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                                    >
                                        {[2026, 2025, 2024, 2023].map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {loading ? (
                                <LoadingSpinner label="Cargando historial..." />
                            ) : history.length === 0 ? (
                                <EmptyState
                                    message="No has completado ningún WOD este mes. ¡Empieza a entrenar! 🏋️‍♂️"
                                    className="shadow-none"
                                />
                            ) : (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {history.map((log) => {
                                        const category = log.workout?.category?.name ?? 'Sin categoría';
                                        const categoryColor = categoryColors[category] ?? 'bg-gray-500';
                                        const workoutId = log.workout?.id ?? log.workout_id;

                                        return (
                                            <div key={log.id} className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:shadow-none dark:ring-1 dark:ring-gray-700">
                                                <div className="p-6">
                                                    {/* Cabecera */}
                                                    <div className="mb-6">
                                                        <div className="flex items-center justify-between">
                                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${categoryColor}`}>
                                                                {category}
                                                            </span>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                {log.completed_at
                                                                    ? new Date(log.completed_at).toLocaleDateString('es-ES')
                                                                    : 'Fecha no disponible'}
                                                            </span>
                                                        </div>
                                                        <h3 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
                                                            {log.workout?.title ?? 'Sin título'}
                                                        </h3>
                                                    </div>

                                                    {/* Detalle del WOD */}
                                                    <div className="space-y-3 rounded-lg bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                                        {[
                                                            { icon: '🔥', label: 'Calentamiento', value: log.workout?.warmup },
                                                            { icon: '💪', label: 'Movimientos', value: log.workout?.movements },
                                                            { icon: '🏋️', label: 'WOD', value: log.workout?.wod },
                                                        ].map(({ icon, label, value }) => (
                                                            <div key={label} className="flex items-start gap-2">
                                                                <span className="mt-0.5 flex-shrink-0">{icon}</span>
                                                                <div>
                                                                    <span className="font-semibold">{label}:</span>
                                                                    <p className="mt-1">{value ?? 'N/A'}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Puntuación y nota existentes */}
                                                    {(log.score || log.notes) && (
                                                        <div className="mt-6 space-y-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4 border border-blue-200">
                                                            {log.score ? (
                                                                <div className="flex items-center gap-4">
                                                                    <div className="relative w-16 h-16">
                                                                        <svg className="w-full h-full" viewBox="0 0 36 36">
                                                                            <circle cx="18" cy="18" r="15.91549430918954" fill="none" stroke="#E2E8F0" strokeWidth="2" />
                                                                            <circle
                                                                                cx="18" cy="18" r="15.91549430918954"
                                                                                fill="none" stroke="#3B82F6" strokeWidth="2"
                                                                                strokeDasharray={`${(log.score / 10) * 100} 100`}
                                                                                strokeDashoffset="25"
                                                                                className="transform -rotate-90 origin-center"
                                                                            />
                                                                            <text x="18" y="18" className="font-bold text-blue-600" textAnchor="middle" dy=".3em" fontSize="12">
                                                                                {log.score}/10
                                                                            </text>
                                                                        </svg>
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="font-semibold text-blue-900">Puntuación</span>
                                                                        <span className="text-sm text-blue-700">
                                                                            {log.score < 5 ? '¡A mejorar!' : log.score < 7 ? '¡Buen trabajo!' : log.score < 9 ? '¡Excelente!' : '¡Perfecto! 🏆'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                            {log.notes ? (
                                                                <div className="flex items-start gap-2 mt-4 border-t border-blue-200 pt-4">
                                                                    <span className="mt-1 text-lg">📝</span>
                                                                    <div>
                                                                        <span className="font-semibold text-blue-900">Nota:</span>
                                                                        <p className="mt-1 text-blue-800">{log.notes}</p>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    )}

                                                    {/* Formulario edición */}
                                                    <div className="mt-6 space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                                        <div>
                                                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Añadir Nota</label>
                                                            <textarea
                                                                placeholder="Escribe una nota sobre tu entrenamiento"
                                                                value={notes[workoutId] ?? ''}
                                                                onChange={(e) => setNotes((prev) => ({ ...prev, [workoutId]: e.target.value }))}
                                                                rows={2}
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Puntuación</label>
                                                            <select
                                                                value={scores[workoutId] ?? ''}
                                                                onChange={(e) => setScores((prev) => ({ ...prev, [workoutId]: e.target.value }))}
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                                            >
                                                                <option value="">Selecciona una puntuación</option>
                                                                {Array.from({ length: 10 }, (_, i) => (
                                                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="flex flex-col gap-3">
                                                            <button
                                                                onClick={() => saveEntry(workoutId)}
                                                                disabled={saving[workoutId] || deleting[log.id]}
                                                                className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:shadow-md
                                                                    ${(saving[workoutId] || deleting[log.id]) ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600'}`}
                                                            >
                                                                {saving[workoutId] ? <><SpinnerIcon /><span>Guardando...</span></> : <><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg><span>Guardar Cambios</span></>}
                                                            </button>

                                                            <button
                                                                onClick={() => deleteEntry(log.id, log.workout?.title ?? 'Sin título')}
                                                                disabled={deleting[log.id] || saving[workoutId]}
                                                                className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:shadow-md
                                                                    ${(deleting[log.id] || saving[workoutId]) ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600'}`}
                                                            >
                                                                {deleting[log.id] ? <><SpinnerIcon /><span>Eliminando...</span></> : <><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg><span>Eliminar WOD</span></>}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
