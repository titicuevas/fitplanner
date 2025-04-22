import React, { useState } from "react";

const WorkoutCard = ({ workout, onComplete, isCompleted }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleComplete = async () => {
        setIsLoading(true);
        try {
            await onComplete(workout.id);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <div className="text-center">
                <h3 className="text-xl font-bold uppercase mb-2">{workout.title}</h3>
                <div className="mb-4">
                    Categoría: <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(workout.category.name)}`}>
                        {workout.category.name}
                    </span>
                </div>
                <div className="text-left space-y-2 mb-4">
                    <p><span className="font-bold">🔥 Calentamiento:</span> {workout.warmup}</p>
                    <p><span className="font-bold">💪 Movimientos:</span> {workout.movements}</p>
                    <p><span className="font-bold">🏋️ WOD:</span> {workout.wod}</p>
                </div>
                <button 
                    className={`w-full py-3 px-4 rounded-lg font-bold transition-colors
                        ${isCompleted 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white text-green-600 border-2 border-green-500 hover:bg-green-50'} 
                        ${(isCompleted || isLoading) && 'opacity-75 cursor-not-allowed'}`}
                    onClick={handleComplete}
                    disabled={isCompleted || isLoading}
                >
                    {isLoading ? "Procesando..." : (isCompleted ? "✅ WOD Completado" : "Registrar como Completado")}
                </button>
            </div>
        </div>
    );
};

const getCategoryColor = (category) => {
    switch (category) {
        case "Escalado": return "bg-blue-500 text-white";
        case "RX": return "bg-yellow-500 text-white";
        case "Élite": return "bg-red-500 text-white";
        default: return "bg-gray-500 text-white";
    }
};

export default WorkoutCard;
