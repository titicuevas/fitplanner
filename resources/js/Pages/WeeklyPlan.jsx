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
    const [isCompleting, setIsCompleting] = useState(false);

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
        if (selectedWod && !isCompleting) {
            setIsCompleting(true);
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
                
                fetchData();
                setSelectedWod(null);
                setScore("");
                setNotes("");
            } catch (error) {
                console.error("Error al completar el WOD:", error);
                showErrorMessage("Error al guardar el WOD.");
            } finally {
                setIsCompleting(false);
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

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
                            <span className="ml-3 text-gray-600">Cargando plan semanal...</span>
                        </div>
                    ) : plan.length === 0 ? (
                        <div className="rounded-lg bg-white p-6 text-center shadow">
                            <p className="text-gray-600">No hay plan disponible para esta semana.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                            {daysOfWeek.map((day, index) => {
                                const dailyPlan = plan.filter(item => item.assigned_day === day);
                                const workout = dailyPlan[0]?.workout;

                                return (
                                    <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                                        {/* Cabecera del día */}
                                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                            <h3 className="text-base font-semibold text-gray-900 text-center">{day}</h3>
                                        </div>

                                        {dailyPlan.length > 0 ? (
                                            <div className="p-4 flex flex-col flex-grow">
                                                {/* Header con RX */}
                                                <div className="flex items-center mb-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${categoryColors[workout.category?.name] || "bg-gray-500"}`}>
                                                        {workout.category?.name || "RX"}
                                                    </span>
                                                </div>

                                                {/* Contenido principal */}
                                                <div className="flex-grow">
                                                    {/* Nombre del WOD */}
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
                                                </div>

                                                {/* Botón de Seleccionar WOD - Siempre al final */}
                                                <div className="mt-6 pt-4 border-t border-gray-100">
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
                                                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                                                    ⭐ Puntuación
                                                                </label>
                                                                <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                                                                    {[...Array(10)].map((_, i) => (
                                                                        <button
                                                                            key={i + 1}
                                                                            onClick={() => setScore((i + 1).toString())}
                                                                            className={`
                                                                                w-full h-10 rounded-lg transition-all duration-200 
                                                                                ${parseInt(score) === i + 1
                                                                                    ? 'bg-green-500 text-white ring-2 ring-green-500 ring-offset-2 transform scale-105 shadow-md'
                                                                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 hover:shadow-md'
                                                                                }
                                                                                font-semibold text-center flex items-center justify-center
                                                                                focus:outline-none active:scale-95
                                                                            `}
                                                                        >
                                                                            {i + 1}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <button
                                                                onClick={handleCompleteWod}
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
                                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                                            <div className="p-4 flex flex-col flex-grow">
                                                <div className="flex-grow text-center text-gray-500 text-sm">
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
};

export default WeeklyPlan;
