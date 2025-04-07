import React, { useEffect, useState } from "react";
import axios from "axios";
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';

const categoryColors = {
    "Escalado": "bg-blue-500",
    "RX": "bg-yellow-500",
    "Élite": "bg-red-500",
    "Sin categoría": "bg-gray-500",
};

const WorkoutHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notes, setNotes] = useState({});
    const [scores, setScores] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchWorkoutHistory();
    }, [selectedMonth, selectedYear]);

    const fetchWorkoutHistory = () => {
        setLoading(true);
        axios
            .get(`/api/workouts-by-month`, {
                params: {
                    month: selectedMonth,
                    year: selectedYear,
                },
                withCredentials: true,
            })
            .then((response) => {
                setHistory(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("❌ Error al obtener el historial:", error);
                setLoading(false);
                showErrorMessage("Error al cargar el historial de WODs.");
            });
    };

    const handleSave = async (workoutId) => {
        setSaving(true);
        try {
            await axios.post(
                "/api/workouts/complete",
                {
                    workout_id: workoutId,
                    score: scores[workoutId] || null,
                    notes: notes[workoutId] || null,
                },
                { withCredentials: true }
            );
            
            await Swal.fire({
                icon: 'success',
                title: '¡Guardado!',
                text: 'La nota y puntuación se han guardado correctamente.',
                confirmButtonColor: '#10B981',
                timer: 2000,
                timerProgressBar: true,
            });
            
            fetchWorkoutHistory();
        } catch (error) {
            console.error("❌ Error al guardar:", error);
            showErrorMessage("Error al guardar la nota y puntuación.");
        } finally {
            setSaving(false);
        }
    };

    const showErrorMessage = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonColor: '#EF4444',
        });
    };

    const handleDelete = async (id, title) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            html: `
                <p>Vas a eliminar el WOD:</p>
                <p class="font-semibold text-red-600">${title}</p>
                <p class="text-sm text-gray-500 mt-2">Esta acción no se puede deshacer.</p>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/workouts/completed/${id}`, { withCredentials: true });
                
                await Swal.fire({
                    icon: 'success',
                    title: '¡Eliminado!',
                    text: 'El WOD ha sido eliminado correctamente.',
                    confirmButtonColor: '#10B981',
                    timer: 2000,
                    timerProgressBar: true,
                });
                
                setHistory(history.filter((log) => log.id !== id));
            } catch (error) {
                console.error("❌ Error al eliminar el WOD:", error);
                showErrorMessage("Error al eliminar el WOD.");
            }
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Historial - FitPlanner" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Título y Selectores */}
                            <div className="mb-8 text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                                    📜 Historial de Workouts
                                </h2>
                                
                                {/* Mensajes de éxito o error */}
                                {message && (
                                    <div className={`mt-4 rounded-md p-4 ${
                                        message.type === 'success' 
                                            ? 'bg-green-50 text-green-700' 
                                            : 'bg-red-50 text-red-700'
                                    }`}>
                                        <p className="text-sm font-medium">{message.text}</p>
                                    </div>
                                )}

                                {/* Selectores de fecha */}
                                <div className="mt-6 flex justify-center gap-4">
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                        className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-red-500 focus:outline-none focus:ring-red-500"
                                    >
                                        {[...Array(12)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {new Date(0, i).toLocaleString("es-ES", { month: "long" })}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-red-500 focus:outline-none focus:ring-red-500"
                                    >
                                        {[2025, 2024, 2023].map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Contenido Principal */}
                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
                                    <span className="ml-3 text-gray-600">Cargando historial...</span>
                                </div>
                            ) : history.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-600">No has completado ningún WOD este mes. ¡Empieza a entrenar! 🏋️‍♂️</p>
                                </div>
                            ) : (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {history.map((log) => {
                                        const category = log.workout?.category?.name || "Sin categoría";
                                        const categoryColor = categoryColors[category];

                                        return (
                                            <div key={log.id} className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
                                                <div className="p-6">
                                                    {/* Cabecera */}
                                                    <div className="mb-6">
                                                        <div className="flex items-center justify-between">
                                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${categoryColor}`}>
                                                                {category}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                📅 {log.completed_at ? new Date(log.completed_at).toLocaleDateString() : "Fecha no disponible"}
                                                            </span>
                                                        </div>
                                                        <h3 className="mt-3 text-xl font-bold text-gray-900">
                                                            {log.workout?.title || "Sin título"}
                                                        </h3>
                                                    </div>

                                                    {/* Detalles del WOD */}
                                                    <div className="space-y-3 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                                                        <div className="flex items-start gap-2">
                                                            <span className="mt-0.5 flex-shrink-0">🔥</span>
                                                            <div>
                                                                <span className="font-semibold">Calentamiento:</span>
                                                                <p className="mt-1">{log.workout?.warmup || "N/A"}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <span className="mt-0.5 flex-shrink-0">💪</span>
                                                            <div>
                                                                <span className="font-semibold">Movimientos:</span>
                                                                <p className="mt-1">{log.workout?.movements || "N/A"}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <span className="mt-0.5 flex-shrink-0">🏋️</span>
                                                            <div>
                                                                <span className="font-semibold">WOD:</span>
                                                                <p className="mt-1">{log.workout?.wod || "N/A"}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Notas y Puntuación Existentes */}
                                                    {(log.score || log.notes) && (
                                                        <div className="mt-6 space-y-3 rounded-lg bg-blue-50 p-4">
                                                            {log.score && (
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-lg">⭐</span>
                                                                    <div>
                                                                        <span className="font-semibold text-blue-900">Puntuación:</span>
                                                                        <span className="ml-2 text-blue-800">{log.score}/10</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {log.notes && (
                                                                <div className="flex items-start gap-2">
                                                                    <span className="mt-1 text-lg">📝</span>
                                                                    <div>
                                                                        <span className="font-semibold text-blue-900">Nota:</span>
                                                                        <p className="mt-1 text-blue-800">{log.notes}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Formulario */}
                                                    <div className="mt-6 space-y-4">
                                                        <div className="rounded-lg border border-gray-200 p-4">
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                                                        📝 Añadir Nota
                                                                    </label>
                                                                    <textarea
                                                                        placeholder="Escribe una nota sobre tu entrenamiento"
                                                                        value={notes[log.workout.id] || ""}
                                                                        onChange={(e) => setNotes({ ...notes, [log.workout.id]: e.target.value })}
                                                                        rows="2"
                                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                                                        ⭐ Puntuación
                                                                    </label>
                                                                    <select
                                                                        value={scores[log.workout.id] || ""}
                                                                        onChange={(e) => setScores({ ...scores, [log.workout.id]: e.target.value })}
                                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                                                    >
                                                                        <option value="">Selecciona una puntuación</option>
                                                                        {[...Array(10)].map((_, i) => (
                                                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4 flex flex-col gap-3">
                                                                <button
                                                                    onClick={() => handleSave(log.workout.id)}
                                                                    disabled={saving}
                                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 hover:shadow-md"
                                                                >
                                                                    {saving ? (
                                                                        <>
                                                                            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                                            </svg>
                                                                            <span>Guardando cambios...</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                                            </svg>
                                                                            <span>Guardar Cambios</span>
                                                                        </>
                                                                    )}
                                                                </button>

                                                                <button
                                                                    onClick={() => handleDelete(log.id, log.workout?.title || "Sin título")}
                                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:shadow-md"
                                                                >
                                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                    <span>Eliminar WOD</span>
                                                                </button>
                                                            </div>
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
};

export default WorkoutHistory;