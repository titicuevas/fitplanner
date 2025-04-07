import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function History() {
    const { darkMode } = usePage().props;

    // Datos de ejemplo - Esto debería venir de tu backend
    const workoutHistory = [
        {
            id: 1,
            date: "2024-02-15",
            title: "WOD - CrossFit Games 23.1",
            type: "For Time",
            result: "8:45",
            notes: "RX - Buena sesión, mantuve un ritmo constante",
            details: {
                movements: [
                    { name: "Thrusters", weight: "95 lb", reps: "21-15-9" },
                    { name: "Pull-Ups", reps: "21-15-9" }
                ]
            }
        },
        {
            id: 2,
            date: "2024-02-14",
            title: "Entrenamiento de Fuerza",
            type: "5 x 5",
            result: "Completado",
            notes: "Nueva marca personal en Back Squat",
            details: {
                movements: [
                    { name: "Back Squat", weight: "225 lb", sets: "5x5" },
                    { name: "Bench Press", weight: "185 lb", sets: "5x5" },
                    { name: "Bent Over Row", weight: "165 lb", sets: "5x5" }
                ]
            }
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Historial - FitPlanner" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className={`overflow-hidden rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
                        darkMode 
                            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
                    }`}>
                        <div className="p-8">
                            <div className="mb-8">
                                <h2 className={`text-3xl font-bold tracking-tight ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Historial de Entrenamientos
                                </h2>
                                <p className={`mt-2 text-lg ${
                                    darkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                    Revisa tu progreso y resultados anteriores
                                </p>
                            </div>

                            <div className="space-y-8">
                                {workoutHistory.map((workout) => (
                                    <div
                                        key={workout.id}
                                        className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                                            darkMode
                                                ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700'
                                                : 'bg-white hover:bg-gray-50 border border-gray-200'
                                        }`}
                                    >
                                        <div className="flex flex-col space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className={`text-xl font-semibold ${
                                                        darkMode ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                        {workout.title}
                                                    </h3>
                                                    <p className={`text-sm ${
                                                        darkMode ? 'text-gray-400' : 'text-gray-500'
                                                    }`}>
                                                        {new Date(workout.date).toLocaleDateString('es-ES', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        darkMode
                                                            ? 'bg-red-500/10 text-red-400'
                                                            : 'bg-red-100 text-red-600'
                                                    }`}>
                                                        {workout.type}
                                                    </span>
                                                    <div className={`rounded-full px-3 py-1 text-sm font-semibold ${
                                                        darkMode
                                                            ? 'bg-green-500/10 text-green-400'
                                                            : 'bg-green-100 text-green-600'
                                                    }`}>
                                                        {workout.result}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`text-sm ${
                                                darkMode ? 'text-gray-300' : 'text-gray-600'
                                            }`}>
                                                <h4 className="font-semibold mb-2">Movimientos:</h4>
                                                <ul className="list-disc list-inside space-y-1">
                                                    {workout.details.movements.map((movement, index) => (
                                                        <li key={index}>
                                                            {movement.name}
                                                            {movement.weight && ` - ${movement.weight}`}
                                                            {movement.reps && ` (${movement.reps})`}
                                                            {movement.sets && ` (${movement.sets})`}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {workout.notes && (
                                                <div className={`mt-4 rounded-lg p-4 text-sm ${
                                                    darkMode
                                                        ? 'bg-gray-700/50 text-gray-300'
                                                        : 'bg-gray-50 text-gray-600'
                                                }`}>
                                                    <strong>Notas:</strong> {workout.notes}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 