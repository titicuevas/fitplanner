import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '@/lib/api';
import { showErrorMessage, showSuccessMessage, getErrorMessage } from '@/lib/notify';
import type { WorkoutLog } from '@/types/workout';

export function useWorkoutHistory() {
    const [history, setHistory] = useState<WorkoutLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<Record<number, boolean>>({});
    const [deleting, setDeleting] = useState<Record<number, boolean>>({});
    const [notes, setNotes] = useState<Record<number, string>>({});
    const [scores, setScores] = useState<Record<number, string>>({});
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        void fetchHistory();
    }, [selectedMonth, selectedYear]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await api.get<WorkoutLog[]>('/api/workouts-by-month', {
                params: { month: selectedMonth, year: selectedYear },
            });
            const logs = response.data;
            setHistory(logs);

            const nextNotes: Record<number, string> = {};
            const nextScores: Record<number, string> = {};
            logs.forEach((log) => {
                const workoutId = log.workout?.id ?? log.workout_id;
                nextNotes[workoutId] = log.notes ?? '';
                nextScores[workoutId] = log.score != null ? String(log.score) : '';
            });
            setNotes(nextNotes);
            setScores(nextScores);
        } catch (error) {
            console.error('Error al obtener historial:', error);
            showErrorMessage(getErrorMessage(error, 'Error al cargar el historial de WODs.'));
        } finally {
            setLoading(false);
        }
    };

    const saveEntry = async (workoutId: number): Promise<boolean> => {
        if (saving[workoutId] || deleting[workoutId]) return false;
        setSaving((prev) => ({ ...prev, [workoutId]: true }));
        try {
            await api.post('/api/workouts/complete', {
                workout_id: workoutId,
                score: scores[workoutId] || null,
                notes: notes[workoutId] || null,
            });
            await showSuccessMessage('La nota y puntuación se han guardado correctamente.');
            await fetchHistory();
            return true;
        } catch (error) {
            console.error('Error al guardar:', error);
            showErrorMessage(getErrorMessage(error, 'Error al guardar la nota y puntuación.'));
            return false;
        } finally {
            setSaving((prev) => ({ ...prev, [workoutId]: false }));
        }
    };

    const deleteEntry = async (id: number, title: string) => {
        if (deleting[id]) return;

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar el WOD: ${title}. Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        setDeleting((prev) => ({ ...prev, [id]: true }));
        try {
            await api.delete(`/api/workouts/completed/${id}`);
            setHistory((prev) => prev.filter((log) => log.id !== id));
            await showSuccessMessage('El WOD ha sido eliminado correctamente.');
        } catch (error) {
            console.error('Error al eliminar:', error);
            showErrorMessage(getErrorMessage(error, 'Error al eliminar el WOD.'));
        } finally {
            setDeleting((prev) => ({ ...prev, [id]: false }));
        }
    };

    return {
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
    };
}
