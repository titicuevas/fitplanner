import WorkoutCard from '../Components/WorkoutCard';
import EmptyState from '../Components/EmptyState';
import LoadingSpinner from '../Components/LoadingSpinner';
import { CATEGORY_OPTIONS, useWorkoutList } from '@/hooks/useWorkoutList';

export default function WorkoutList() {
    const {
        category,
        completedWorkouts,
        filteredWorkouts,
        isProcessing,
        loading,
        selectedWorkout,
        setCategory,
        completeWorkout,
    } = useWorkoutList();

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="mb-8 text-center text-3xl font-bold uppercase text-gray-900 dark:text-white">Lista de Workouts</h2>

            <div className="flex justify-center flex-wrap gap-4 mb-8">
                {CATEGORY_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        className={`px-6 py-2 text-lg font-semibold rounded-lg transition-colors ${
                            category === option.value ? option.active : option.idle
                        }`}
                        onClick={() => setCategory(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <LoadingSpinner label="Cargando entrenamientos..." />
            ) : filteredWorkouts.length === 0 ? (
                <EmptyState message="No hay entrenamientos para el filtro seleccionado." />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkouts.map((workout) => (
                        <div key={workout.id} className="flex justify-center">
                            <WorkoutCard
                                workout={workout}
                                onComplete={() => completeWorkout(workout.id, workout.title)}
                                isCompleted={completedWorkouts.has(workout.id)}
                                isDisabled={isProcessing && selectedWorkout !== workout.id}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
