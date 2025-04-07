import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function WeeklyPlan() {
    const { darkMode } = usePage().props;
    const [selectedDay, setSelectedDay] = useState(new Date());

    // Datos de ejemplo - Esto debería venir de tu backend
    const weeklyPlan = [
        {
            date: "2024-02-19",
            workouts: [
                {
                    id: 1,
                    time: "06:00",
                    title: "CrossFit Class",
                    type: "WOD",
                    description: "21-15-9\nThrusters (95/65 lb)\nPull-Ups",
                    coach: "Carlos Pérez"
                }
            ]
        },
        {
            date: "2024-02-20",
            workouts: [
                {
                    id: 2,
                    time: "07:00",
                    title: "Strength Focus",
                    type: "Fuerza",
                    description: "Back Squat 5x5\nBench Press 5x5\nBent Over Row 5x5",
                    coach: "Ana García"
                },
                {
                    id: 3,
                    time: "18:00",
                    title: "Mobility",
                    type: "Movilidad",
                    description: "30 min de trabajo de movilidad general",
                    coach: "Laura Martínez"
                }
            ]
        }
    ];

    // Función para obtener el día de la semana en español
    const getDayName = (date) => {
        return new Date(date).toLocaleDateString('es-ES', { weekday: 'long' });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Planificación Semanal - FitPlanner" />

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
                                    Planificación Semanal
                                </h2>
                                <p className={`mt-2 text-lg ${
                                    darkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                    Organiza tus entrenamientos de la semana
                                </p>
                            </div>

                            <div className="space-y-8">
                                {weeklyPlan.map((day) => (
                                    <div
                                        key={day.date}
                                        className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                                            darkMode
                                                ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700'
                                                : 'bg-white hover:bg-gray-50 border border-gray-200'
                                        }`}
                                    >
                                        <div className="mb-4">
                                            <h3 className={`text-xl font-semibold capitalize ${
                                                darkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {getDayName(day.date)}
                                            </h3>
                                            <p className={`text-sm ${
                                                darkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                {new Date(day.date).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            {day.workouts.map((workout) => (
                                                <div
                                                    key={workout.id}
                                                    className={`rounded-lg p-4 ${
                                                        darkMode
                                                            ? 'bg-gray-700/50'
                                                            : 'bg-gray-50'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center space-x-3">
                                                            <span className={`text-sm font-semibold ${
                                                                darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }`}>
                                                                {workout.time}
                                                            </span>
                                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                                darkMode
                                                                    ? 'bg-red-500/10 text-red-400'
                                                                    : 'bg-red-100 text-red-600'
                                                            }`}>
                                                                {workout.type}
                                                            </span>
                                                        </div>
                                                        <button
                                                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                                                darkMode
                                                                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                                                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                                                            }`}
                                                        >
                                                            Reservar
                                                        </button>
                                                    </div>

                                                    <h4 className={`text-lg font-semibold ${
                                                        darkMode ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                        {workout.title}
                                                    </h4>

                                                    <div className={`mt-2 whitespace-pre-line text-sm ${
                                                        darkMode ? 'text-gray-300' : 'text-gray-600'
                                                    }`}>
                                                        {workout.description}
                                                    </div>

                                                    <div className={`mt-3 flex items-center text-sm ${
                                                        darkMode ? 'text-gray-400' : 'text-gray-500'
                                                    }`}>
                                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        Coach: {workout.coach}
                                                    </div>
                                                </div>
                                            ))}
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