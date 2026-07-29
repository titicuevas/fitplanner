import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { showErrorMessage, showSuccessMessage, getErrorMessage } from '@/lib/notify';
import type { WeeklyPlanItem, WorkoutLog } from '@/types/workout';

const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export function useWeeklyPlan() {
    const [plan, setPlan] = useState<WeeklyPlanItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedWod, setSelectedWod] = useState<WeeklyPlanItem | null>(null);
    const [score, setScore] = useState('');
    const [notes, setNotes] = useState('');
    const [completedWorkouts, setCompletedWorkouts] = useState<WorkoutLog[]>([]);
    const [isCompleting, setIsCompleting] = useState(false);

    useEffect(() => {
        void fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [planResponse, completedResponse] = await Promise.all([
                api.get<WeeklyPlanItem[]>('/api/weekly-plan'),
                api.get<WorkoutLog[]>('/api/workouts/completed'),
            ]);

            setPlan(planResponse.data);
            setCompletedWorkouts(completedResponse.data);
        } catch (error) {
            console.error('Error al obtener datos:', error);
            showErrorMessage(getErrorMessage(error, 'Error al cargar los datos del plan semanal.'));
        } finally {
            setLoading(false);
        }
    };

    const handleWodSelection = (wod: WeeklyPlanItem) => {
        if (selectedWod && selectedWod.workout.id === wod.workout.id) {
            setSelectedWod(null);
            setScore('');
            setNotes('');
            return;
        }

        setSelectedWod(wod);
        const completedWod = completedWorkouts.find((workout) => workout.workout_id === wod.workout.id);

        if (completedWod) {
            setScore(completedWod.score?.toString() ?? '');
            setNotes(completedWod.notes ?? '');
            return;
        }

        setScore('');
        setNotes('');
    };

    const completeSelectedWod = async () => {
        if (!selectedWod || isCompleting) return;

        setIsCompleting(true);

        try {
            await api.post('/api/workouts/complete', {
                workout_id: selectedWod.workout.id,
                score,
                notes,
            });

            showSuccessMessage('WOD completado y guardado en el historial');

            setPlan((prevPlan) =>
                prevPlan.map((item) =>
                    item.workout.id === selectedWod.workout.id
                        ? { ...item, completed: true }
                        : item,
                ),
            );

            await fetchData();
            setSelectedWod(null);
            setScore('');
            setNotes('');
        } catch (error) {
            console.error('Error al completar el WOD:', error);
            showErrorMessage(getErrorMessage(error, 'Error al guardar el WOD.'));
        } finally {
            setIsCompleting(false);
        }
    };

    const planByDay = useMemo<Record<string, WeeklyPlanItem | null>>(() => {
        return DAYS_OF_WEEK.reduce<Record<string, WeeklyPlanItem | null>>((acc, day) => {
            acc[day] = plan.find((item) => item.assigned_day === day) ?? null;
            return acc;
        }, {});
    }, [plan]);

    return {
        daysOfWeek: DAYS_OF_WEEK,
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
    };
}
