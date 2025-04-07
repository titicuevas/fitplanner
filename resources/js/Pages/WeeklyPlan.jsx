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

            <div className="py-6 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Días de la semana */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="flex justify-center">
                                <div className="text-base font-medium text-gray-700 bg-white rounded-full px-6 py-2 shadow-sm">
                                    {day}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contenido Principal */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
                            <span className="ml-3 text-gray-600">Cargando plan semanal...</span>
                        </div>
                    ) : plan.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No hay plan disponible para esta semana.</p>
                        </div>
                    ) : (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {daysOfWeek.map((day, index) => {
                                const dailyPlan = plan.filter(item => item.assigned_day === day);
                                const workout = dailyPlan[0]?.workout;

                                return (
                                    <div key={index} className="bg-white rounded-lg shadow-sm">
                                        {dailyPlan.length > 0 ? (
                                            <div className="p-4">
                                                {/* Header con RX */}
                                                <div className="flex items-center mb-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${categoryColors[workout.category?.name] || "bg-gray-500"}`}>
                                                        {workout.category?.name || "RX"}
                                                    </span>
                                                </div>

                                                {/* Nombre del atleta */}
                                                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                                    {workout.title}
                                                </h3>

                                                {/* Secciones con iconos */}
                                                <div className="space-y-6">
                                                    <div className="flex items-start gap-3">
                                                        <span className="flex-shrink-0 text-orange-500">
                                                            🔥
                                                        </span>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-600">{workout.warmup}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3">
                                                        <span className="flex-shrink-0 text-yellow-500">
                                                            💪
                                                        </span>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-600">{workout.movements}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3">
                                                        <span className="flex-shrink-0 text-gray-400">
                                                            🏋️
                                                        </span>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-600">{workout.wod}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Botón de Seleccionar WOD */}
                                                <div className="mt-6 flex items-center justify-center">
                                                    <button
                                                        onClick={() => handleWodSelection(dailyPlan[0])}
                                                        disabled={dailyPlan[0].completed}
                                                        className={`
                                                            w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 
                                                            text-sm font-medium rounded-lg transition-colors duration-200
                                                            ${dailyPlan[0].completed 
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                : 'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                                                            }
                                                        `}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>Seleccionar WOD</span>
                                                    </button>
                                                </div>

                                                {/* Formulario cuando está seleccionado */}
                                                {selectedWod && selectedWod.workout.id === workout.id && (
                                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    📝 Nota
                                                                </label>
                                                                <textarea
                                                                    value={notes}
                                                                    onChange={(e) => setNotes(e.target.value)}
                                                                    rows="2"
                                                                    className="w-full rounded-lg border-gray-200 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                                                    placeholder="Añade una nota..."
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    ⭐ Puntuación
                                                                </label>
                                                                <select
                                                                    value={score}
                                                                    onChange={(e) => setScore(e.target.value)}
                                                                    className="w-full rounded-lg border-gray-200 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                                                >
                                                                    <option value="">Selecciona puntuación</option>
                                                                    {[...Array(10)].map((_, i) => (
                                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <button
                                                                onClick={handleCompleteWod}
                                                                className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                                            >
                                                                Completar WOD
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="p-4 text-center text-gray-500 text-sm">
                                                No hay WOD programado
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
};

export default WeeklyPlan;
