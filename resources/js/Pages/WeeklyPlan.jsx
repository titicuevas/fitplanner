import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner, Form, Badge } from "react-bootstrap";

const categoryColors = {
    "Escalado": "primary", // Azul
    "RX": "success", // Verde
    "Élite": "danger", // Rojo
    "Sin categoría": "secondary", // Gris
};

const WeeklyPlan = () => {
    const [plan, setPlan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWod, setSelectedWod] = useState(null);
    const [score, setScore] = useState(""); // Selección de la puntuación
    const [notes, setNotes] = useState(""); // Notas del usuario
    const [completedWorkouts, setCompletedWorkouts] = useState([]); // WODs completados

    useEffect(() => {
        // Obtener el plan semanal del usuario
        axios.get("/api/weekly-plan", { withCredentials: true })
            .then((response) => {
                setPlan(response.data); // Establecer los datos del plan en el estado
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al obtener el plan semanal:", error);
                setLoading(false);
            });

        // Obtener los WODs completados del usuario
        axios.get("/api/workouts/completed", { withCredentials: true })
            .then((response) => {
                setCompletedWorkouts(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los WODs completados:", error);
            });
    }, []);

    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    const handleWodSelection = (wod) => {
        setSelectedWod(wod); // Guardar el WOD seleccionado
        const completedWod = completedWorkouts.find(workout => workout.workout_id === wod.workout.id);
        if (completedWod) {
            setScore(completedWod.score);
            setNotes(completedWod.notes);
        } else {
            setScore("");
            setNotes("");
        }
    };

    const handleCompleteWod = () => {
        if (selectedWod) {
            axios.post("/api/workouts/complete", {
                workout_id: selectedWod.workout.id,
                score: score,
                notes: notes,
            }, { withCredentials: true })
                .then((response) => {
                    // Marcar como completado solo el WOD seleccionado
                    setPlan(prevPlan =>
                        prevPlan.map(item =>
                            item.workout.id === selectedWod.workout.id
                                ? { ...item, completed: true }
                                : item
                        )
                    );
                    setCompletedWorkouts(prevCompletedWorkouts => {
                        const existingWorkoutIndex = prevCompletedWorkouts.findIndex(workout => workout.workout_id === selectedWod.workout.id);
                        if (existingWorkoutIndex !== -1) {
                            const updatedWorkouts = [...prevCompletedWorkouts];
                            updatedWorkouts[existingWorkoutIndex] = response.data.data;
                            return updatedWorkouts;
                        } else {
                            return [...prevCompletedWorkouts, response.data.data];
                        }
                    });
                    alert("✅ WOD completado y guardado en el historial");
                })
                .catch(error => {
                    console.error("❌ Error al completar el WOD:", error);
                });
        }
    };

    return (
        <Container className="text-center">
            <h2 className="my-4 fw-bold text-uppercase">📅 Planificación Semanal</h2>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Cargando plan semanal...</p>
                </div>
            ) : plan.length === 0 ? (
                <p>No hay plan disponible para esta semana.</p>
            ) : (
                <Row className="justify-content-center gy-4">
                    {daysOfWeek.map((day, index) => {
                        const dailyPlan = plan.filter(item => item.assigned_day === day);

                        return (
                            <Col key={index} xs={12} sm={10} md={6} lg={4}>
                                <Card className="shadow-lg">
                                    <Card.Body>
                                        <Card.Title className="fw-bold fs-4">{day}</Card.Title>
                                        {dailyPlan.length > 0 ? (
                                            <>
                                                <Badge bg={categoryColors[dailyPlan[0].workout.category?.name] || "secondary"} className="mb-2">
                                                    {dailyPlan[0].workout.category?.name || "Sin categoría"}
                                                </Badge>
                                                <Card.Subtitle className="mb-2">{dailyPlan[0].workout.title}</Card.Subtitle>
                                                <Card.Text>{dailyPlan[0].workout.wod}</Card.Text>
                                                <Card.Text><strong>🔥 Calentamiento:</strong> {dailyPlan[0].workout.warmup}</Card.Text>
                                                <Card.Text><strong>💪 Movimientos:</strong> {dailyPlan[0].workout.movements}</Card.Text>
                                                <Card.Text><strong>🏋️ WOD:</strong> {dailyPlan[0].workout.wod}</Card.Text>

                                                <Button
                                                    variant="outline-success"
                                                    onClick={() => handleWodSelection(dailyPlan[0])}
                                                    className={dailyPlan[0].completed ? "btn-secondary" : ""} // Cambiar a gris si está completado
                                                >
                                                    {dailyPlan[0].completed ? "Actualizar" : "Seleccionar"}
                                                </Button>

                                                {selectedWod && selectedWod.workout.id === dailyPlan[0].workout.id && (
                                                    <div className="mt-3">
                                                        <Form className="mt-3">
                                                            <Form.Group>
                                                                <Form.Label>⭐ Puntuación</Form.Label>
                                                                <Form.Select
                                                                    value={score}
                                                                    onChange={(e) => setScore(e.target.value)}
                                                                >
                                                                    <option value="">Selecciona una puntuación</option>
                                                                    {[...Array(10)].map((_, i) => (
                                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Form.Group>
                                                            <Form.Group className="mt-2">
                                                                <Form.Label>📝 Añadir Nota</Form.Label>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    rows={3}
                                                                    value={notes}
                                                                    onChange={(e) => setNotes(e.target.value)}
                                                                />
                                                            </Form.Group>
                                                            <Button
                                                                variant={completedWorkouts.some(workout => workout.workout_id === dailyPlan[0].workout.id) ? "warning" : "success"}
                                                                className="mt-3"
                                                                onClick={handleCompleteWod}
                                                            >
                                                                {completedWorkouts.some(workout => workout.workout_id === dailyPlan[0].workout.id) ? "Actualizar" : "Marcar como Completado"}
                                                            </Button>
                                                        </Form>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <p>No hay WOD asignado para este día.</p>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            )}

            <Button variant="secondary" className="mt-4" onClick={() => window.location.href = "/dashboard"}>
                ⬅️ Volver al Dashboard
            </Button>
        </Container>
    );
};

export default WeeklyPlan;