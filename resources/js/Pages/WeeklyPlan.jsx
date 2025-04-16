import React, { useEffect, useState } from "react";
import axios from "axios";
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';

const categoryColors = {
    "RX": "bg-yellow-500",
    "Escalado": "bg-blue-500",
    "Élite": "bg-red-500",
    "Sin categoría": "bg-gray-500",
};

const WeeklyPlan = () => {
    const [plan, setPlan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWod, setSelectedWod] = useState(null);
    const [score, setScore] = useState("");
    const [notes, setNotes] = useState("");
    const [completedWorkouts, setCompletedWorkouts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [planResponse, completedResponse] = await Promise.all([
                axios.get("/api/weekly-plan", { withCredentials: true }),
                axios.get("/api/workouts/completed", { withCredentials: true })
            ]);
            setPlan(planResponse.data);
            setCompletedWorkouts(completedResponse.data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener datos:", error);
            showErrorMessage("Error al cargar los datos del plan semanal.");
            setLoading(false);
        }
    };

    const showSuccessMessage = (message) => {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: message,
            confirmButtonColor: '#10B981',
            timer: 2000,
            timerProgressBar: true,
        });
    };

    const showErrorMessage = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonColor: '#EF4444',
        });
    };

    const handleWodSelection = (wod) => {
        if (selectedWod && selectedWod.workout.id === wod.workout.id) {
            setSelectedWod(null);
            setScore("");
            setNotes("");
        } else {
            setSelectedWod(wod);
            const completedWod = completedWorkouts.find(workout => workout.workout_id === wod.workout.id);
            if (completedWod) {
                setScore(completedWod.score || "");
                setNotes(completedWod.notes || "");
            } else {
                setScore("");
                setNotes("");
            }
        }
    };

    const handleCompleteWod = async () => {
        if (selectedWod) {
            try {
                await axios.post("/api/workouts/complete", {
                    workout_id: selectedWod.workout.id,
                    score: score,
                    notes: notes,
                }, { withCredentials: true });

                showSuccessMessage("WOD completado y guardado en el historial");
                
                setPlan(prevPlan =>
                    prevPlan.map(item =>
                        item.workout.id === selectedWod.workout.id
                            ? { ...item, completed: true }
                            : item
                    )
                );
                
                fetchData(); // Actualizar datos
            } catch (error) {
                console.error("Error al completar el WOD:", error);
                showErrorMessage("Error al guardar el WOD.");
            }
        }
    };

    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    return (
        <AuthenticatedLayout>
            <Head title="Plan Semanal - FitPlanner" />

            <div className="min-h-screen bg-gray-50 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Título y descripción */}
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Tu Plan Semanal</h1>
                        <p className="mt-2 text-sm text-gray-600 sm:text-base">Aquí puedes ver tus entrenamientos programados para la semana</p>
                    </div>

                    {/* Días de la semana - Vista móvil */}
                    <div className="block space-y-4 lg:hidden">
                        {daysOfWeek.map((day) => {
                            const dayWorkouts = plan.filter(workout => workout.assigned_day === day);
                            return (
                                <div key={day} className="overflow-hidden rounded-lg bg-white shadow">
                                    <div className="bg-gray-50 px-4 py-3">
                                        <h3 className="text-base font-semibold text-gray-900">{day}</h3>
                                    </div>
                                    <div className="divide-y divide-gray-200 px-4">
                                        {dayWorkouts.length > 0 ? (
                                            dayWorkouts.map((workout) => (
                                                <div key={workout.id} className="py-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-900">{workout.name}</h4>
                                                            <p className="mt-1 text-sm text-gray-500">{workout.description}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleWorkoutClick(workout)}
                                                            className="ml-4 rounded-full bg-red-500 p-2 text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="py-4 text-center text-sm text-gray-500">
                                                No hay entrenamientos programados
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Días de la semana - Vista desktop */}
                    <div className="hidden lg:grid lg:grid-cols-5 lg:gap-6">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="bg-gray-50 px-4 py-3">
                                    <h3 className="text-center text-base font-semibold text-gray-900">{day}</h3>
                                </div>
                                <div className="divide-y divide-gray-200 px-4">
                                    {plan.filter(workout => workout.assigned_day === day).map((workout) => (
                                        <div key={workout.id} className="py-4">
                                            <div className="flex flex-col items-start space-y-2">
                                                <h4 className="text-sm font-medium text-gray-900">{workout.name}</h4>
                                                <p className="text-sm text-gray-500">{workout.description}</p>
                                                <button
                                                    onClick={() => handleWorkoutClick(workout)}
                                                    className="inline-flex items-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                >
                                                    Ver detalles
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {!plan.some(workout => workout.assigned_day === day) && (
                                        <div className="py-4 text-center text-sm text-gray-500">
                                            No hay entrenamientos programados
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Estado de carga */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
                            <span className="ml-3 text-gray-600">Cargando plan semanal...</span>
                        </div>
                    )}

                    {/* Mensaje cuando no hay plan */}
                    {!loading && plan.length === 0 && (
                        <div className="rounded-lg bg-white p-6 text-center shadow">
                            <p className="text-gray-600">No hay plan disponible para esta semana.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default WeeklyPlan;
