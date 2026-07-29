import { memo, useState } from 'react';
import type { Workout } from '@/types/workout';

type WorkoutCardProps = {
    workout: Workout;
    onComplete: () => Promise<void>;
    isCompleted: boolean;
    isDisabled: boolean;
};

function getCategoryColor(category?: string) {
    switch (category) {
        case 'Escalado':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
        case 'RX':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
        case 'Élite':
            return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
}

export default memo(function WorkoutCard({
    workout,
    onComplete,
    isCompleted,
    isDisabled,
}: WorkoutCardProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleComplete = async () => {
        if (isDisabled || isCompleted) return;

        setIsLoading(true);
        try {
            await onComplete();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`w-full max-w-sm rounded-lg bg-white p-6 shadow-lg transition-colors dark:bg-gray-800 dark:shadow-none ${isDisabled ? 'opacity-50' : ''}`}>
            <div className="text-center">
                <h3 className="mb-2 text-xl font-bold uppercase text-gray-900 dark:text-white">{workout.title}</h3>
                <div className="mb-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getCategoryColor(workout.category?.name)}`}>
                        {workout.category?.name ?? 'Sin categoría'}
                    </span>
                </div>
                <div className="mb-4 space-y-2 text-left text-gray-700 dark:text-gray-300">
                    <p><span className="font-bold">Calentamiento:</span> {workout.warmup}</p>
                    <p><span className="font-bold">Movimientos:</span> {workout.movements}</p>
                    <p><span className="font-bold">WOD:</span> {workout.wod}</p>
                </div>
                <button
                    className={`w-full rounded-lg px-4 py-3 font-bold transition-all duration-300
                        ${isCompleted
                            ? 'cursor-not-allowed bg-green-500 text-white'
                            : isDisabled
                                ? 'cursor-not-allowed bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                : 'border-2 border-green-500 bg-white text-green-600 hover:bg-green-50 dark:bg-gray-800 dark:hover:bg-green-950/30'
                        }`}
                    onClick={handleComplete}
                    disabled={isCompleted || isDisabled || isLoading}
                    aria-busy={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Procesando...
                        </div>
                    ) : isCompleted ? (
                        'WOD Completado'
                    ) : (
                        'Registrar como Completado'
                    )}
                </button>
            </div>
        </div>
    );
});
