import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkoutCard from "../Components/WorkoutCard";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [completedWorkouts, setCompletedWorkouts] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("all");
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            const [workoutsResponse, completedResponse] = await Promise.all([
                axios.get("/api/workouts"),
                axios.get("/api/workouts/completed", { withCredentials: true })
            ]);

            setWorkouts(workoutsResponse.data);
            setCompletedWorkouts(new Set(completedResponse.data.map(wod => wod.workout_id)));
            setLoading(false);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
            showErrorMessage("Error al cargar los entrenamientos");
            setLoading(false);
        }
    };

    const showSuccessMessage = (title, text) => {
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            confirmButtonColor: '#10B981',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end',
            toast: true
        });
    };

    const showErrorMessage = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonColor: '#EF4444',
            position: 'top-end',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    };

    const handleCompleteWorkout = async (workoutId, workoutTitle) => {
        if (completedWorkouts.has(workoutId)) {
            showErrorMessage("Este WOD ya está completado");
            return;
        }

        if (isProcessing) return;

        setIsProcessing(true);
        setSelectedWorkout(workoutId);

        try {
            await axios.post("/api/workouts/complete", { workout_id: workoutId }, { withCredentials: true });
            setCompletedWorkouts(new Set([...completedWorkouts, workoutId]));
            
            showSuccessMessage(
                "¡WOD Completado!",
                `Has completado el WOD "${workoutTitle}" con éxito`
            );

            // Actualizar la lista de entrenamientos completados
            const completedResponse = await axios.get("/api/workouts/completed", { withCredentials: true });
            setCompletedWorkouts(new Set(completedResponse.data.map(wod => wod.workout_id)));
        } catch (error) {
            console.error("Error al registrar el entrenamiento:", error);
            showErrorMessage("Error al registrar el WOD");
        } finally {
            setIsProcessing(false);
            setSelectedWorkout(null);
        }
    };

    const filteredWorkouts = category === "all"
        ? workouts
        : workouts.filter(workout => workout.category.name === category);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center uppercase mb-8">🏋️ Lista de Workouts</h2>

            <div className="flex justify-center flex-wrap gap-4 mb-8">
                <button 
                    className={`px-6 py-2 text-lg font-semibold rounded-lg transition-colors
                        ${category === "all" 
                            ? "bg-gray-800 text-white" 
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    onClick={() => setCategory("all")}
                >
                    Todos
                </button>
                <button 
                    className={`px-6 py-2 text-lg font-semibold rounded-lg transition-colors
                        ${category === "Escalado" 
                            ? "bg-blue-600 text-white" 
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
                    onClick={() => setCategory("Escalado")}
                >
                    Escalado
                </button>
                <button 
                    className={`px-6 py-2 text-lg font-semibold rounded-lg transition-colors
                        ${category === "RX" 
                            ? "bg-yellow-500 text-white" 
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"}`}
                    onClick={() => setCategory("RX")}
                >
                    RX
                </button>
                <button 
                    className={`px-6 py-2 text-lg font-semibold rounded-lg transition-colors
                        ${category === "Élite" 
                            ? "bg-red-600 text-white" 
                            : "bg-red-100 text-red-700 hover:bg-red-200"}`}
                    onClick={() => setCategory("Élite")}
                >
                    Élite
                </button>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                    <p className="mt-2 text-gray-600">Cargando entrenamientos...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkouts.map((workout) => (
                        <div key={workout.id} className="flex justify-center">
                            <WorkoutCard 
                                workout={workout} 
                                onComplete={() => handleCompleteWorkout(workout.id, workout.title)}
                                isCompleted={completedWorkouts.has(workout.id)}
                                isDisabled={isProcessing && selectedWorkout !== workout.id}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkoutList;
