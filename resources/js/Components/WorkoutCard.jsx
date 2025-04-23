import React, { useState } from "react";

const WorkoutCard = ({ workout, onComplete, isCompleted, isDisabled }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleComplete = async () => {
        if (isDisabled || isCompleted) return;
        
        setIsLoading(true);
        try {
            await onComplete(workout.id);
        } finally {
            setIsLoading(false);
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Escalado':
                return 'bg-blue-100 text-blue-800';
            case 'RX':
                return 'bg-yellow-100 text-yellow-800';
            case 'Élite':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-sm ${isDisabled ? 'opacity-50' : ''}`}>
            <div className="text-center">
                <h3 className="text-xl font-bold uppercase mb-2">{workout.title}</h3>
                <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(workout.category.name)}`}>
                        {workout.category.name}
                    </span>
                </div>
                <div className="text-left space-y-2 mb-4">
                    <p><span className="font-bold">🔥 Calentamiento:</span> {workout.warmup}</p>
                    <p><span className="font-bold">💪 Movimientos:</span> {workout.movements}</p>
                    <p><span className="font-bold">🏋️ WOD:</span> {workout.wod}</p>
                </div>
                <button 
                    className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300
                        ${isCompleted 
                            ? 'bg-green-500 text-white cursor-not-allowed' 
                            : isDisabled
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-white text-green-600 border-2 border-green-500 hover:bg-green-50'
                        }`}
                    onClick={handleComplete}
                    disabled={isCompleted || isDisabled || isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Procesando...
                        </div>
                    ) : isCompleted ? (
                        "✅ WOD Completado"
                    ) : (
                        "Registrar como Completado"
                    )}
                </button>
            </div>
        </div>
    );
};

export default WorkoutCard;
