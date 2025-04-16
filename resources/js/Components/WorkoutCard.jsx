import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

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
        <Card className="shadow-lg workout-card text-center border-0">
            <Card.Body className="p-4">
                <Card.Title className="fw-bold fs-4 text-uppercase">{workout.title}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                    Categoría: <span className={`badge bg-${getCategoryColor(workout.category.name)}`}>
                        {workout.category.name}
                    </span>
                </Card.Subtitle>
                <Card.Text className="text-start">
                    <strong>🔥 Calentamiento:</strong> {workout.warmup}<br />
                    <strong>💪 Movimientos:</strong> {workout.movements}<br />
                    <strong>🏋️ WOD:</strong> {workout.wod}
                </Card.Text>
                <Button 
                    variant={isCompleted ? "success" : "outline-success"}
                    className="w-100 btn-lg fw-bold"
                    onClick={handleComplete}
                    disabled={isCompleted || isLoading}
                >
                    {isLoading ? "Procesando..." : (isCompleted ? "✅ WOD Completado" : "Registrar como Completado")}
                </Button>
            </Card.Body>
        </Card>
    );
};

const getCategoryColor = (category) => {
    switch (category) {
        case "Escalado": return "primary";
        case "RX": return "warning";
        case "Élite": return "danger";
        default: return "secondary";
    }
};

export default WorkoutCard;
