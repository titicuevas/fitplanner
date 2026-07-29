import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { showErrorToast, showSuccessToast } from '@/lib/notify';
import type { Workout, WorkoutLog } from '@/types/workout';

export const CATEGORY_OPTIONS = [
    { value: 'all', label: 'Todos', active: 'bg-gray-800 text-white', idle: 'bg-gray-200 text-gray-700 hover:bg-gray-300' },
    { value: 'Escalado', label: 'Escalado', active: 'bg-blue-600 text-white', idle: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { value: 'RX', label: 'RX', active: 'bg-yellow-500 text-white', idle: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
    { value: 'Élite', label: 'Élite', active: 'bg-red-600 text-white', idle: 'bg-red-100 text-red-700 hover:bg-red-200' },
] as const;

export type CategoryFilter = (typeof CATEGORY_OPTIONS)[number]['value'];

export function useWorkoutList() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [completedWorkouts, setCompletedWorkouts] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<CategoryFilter>('all');
    const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        void fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            const [workoutsResponse, completedResponse] = await Promise.all([
                api.get<Workout[]>('/api/workouts'),
                api.get<WorkoutLog[]>('/api/workouts/completed'),
            ]);

            setWorkouts(workoutsResponse.data);
            setCompletedWorkouts(new Set(completedResponse.data.map((wod) => wod.workout_id)));
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            showErrorToast('Error al cargar los entrenamientos');
        } finally {
            setLoading(false);
        }
    };

    const completeWorkout = async (workoutId: number, workoutTitle: string) => {
        if (completedWorkouts.has(workoutId)) {
            showErrorToast('Este WOD ya está completado');
            return;
        }

        if (isProcessing) return;

        setIsProcessing(true);
        setSelectedWorkout(workoutId);

        try {
            await api.post('/api/workouts/complete', { workout_id: workoutId });

            showSuccessToast(
                '¡WOD Completado!',
                `Has completado el WOD "${workoutTitle}" con éxito`,
            );

            const completedResponse = await api.get<WorkoutLog[]>('/api/workouts/completed');
            setCompletedWorkouts(new Set(completedResponse.data.map((wod) => wod.workout_id)));
        } catch (error) {
            console.error('Error al registrar el entrenamiento:', error);
            showErrorToast('Error al registrar el WOD');
        } finally {
            setIsProcessing(false);
            setSelectedWorkout(null);
        }
    };

    const filteredWorkouts = useMemo(() => (
        category === 'all'
            ? workouts
            : workouts.filter((workout) => workout.category?.name === category)
    ), [category, workouts]);

    return {
        category,
        completedWorkouts,
        filteredWorkouts,
        isProcessing,
        loading,
        selectedWorkout,
        setCategory,
        completeWorkout,
    };
}
