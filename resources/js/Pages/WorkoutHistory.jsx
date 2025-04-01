import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Badge, Form, Button, Alert } from "react-bootstrap";

const categoryColors = {
    "Escalado": "primary", // Azul
    "RX": "success", // Verde
    "Élite": "danger", // Rojo
    "Sin categoría": "secondary", // Gris
};

const WorkoutHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notes, setNotes] = useState({});
    const [scores, setScores] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Mes actual
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Año actual
    const [message, setMessage] = useState(null); // Mensajes de éxito o error

    useEffect(() => {
        fetchWorkoutHistory();
    }, [selectedMonth, selectedYear]);

    const fetchWorkoutHistory = () => {
        setLoading(true);
        axios
            .get(`/api/workouts-by-month`, {
                params: {
                    month: selectedMonth,
                    year: selectedYear,
                },
                withCredentials: true,
            })
            .then((response) => {
                setHistory(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("❌ Error al obtener el historial:", error);
                setLoading(false);
                setMessage({ type: "danger", text: "Error al cargar el historial de WODs." });
            });
    };

    const handleSave = (workoutId) => {
        setSaving(true);
        axios
            .post(
                "/api/workouts/complete",
                {
                    workout_id: workoutId,
                    score: scores[workoutId] || null,
                    notes: notes[workoutId] || null,
                },
                { withCredentials: true }
            )
            .then((response) => {
                console.log("✅ Guardado:", response.data);
                setSaving(false);
                setMessage({ type: "success", text: "Nota y puntuación guardadas correctamente." });
                fetchWorkoutHistory(); // Recargar el historial
            })
            .catch((error) => {
                console.error("❌ Error al guardar:", error);
                setSaving(false);
                setMessage({ type: "danger", text: "Error al guardar la nota y puntuación." });
            });
    };

    const handleDelete = (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este WOD?")) return;

        axios
            .delete(`/api/workouts/completed/${id}`, { withCredentials: true })
            .then((response) => {
                console.log("✅ Eliminado:", response.data);
                setHistory(history.filter((log) => log.id !== id));
                setMessage({ type: "success", text: "WOD eliminado correctamente." });
            })
            .catch((error) => {
                console.error("❌ Error al eliminar el WOD:", error);
                setMessage({ type: "danger", text: "Error al eliminar el WOD." });
            });
    };

    return (
        <Container className="history-container text-center">
            <h2 className="my-4 fw-bold text-uppercase">📜 Historial de Workouts</h2>

            {/* Mensajes de éxito o error */}
            {message && (
                <Alert
                    variant={message.type}
                    onClose={() => setMessage(null)}
                    dismissible
                >
                    {message.text}
                </Alert>
            )}

            {/* Selector de mes */}
            <Row className="justify-content-center mb-4">
                <Col xs={12} sm={10} md={6} lg={4}>
                    <Form.Select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {new Date(0, i).toLocaleString("es-ES", { month: "long" })}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            {/* Selector de año */}
            <Row className="justify-content-center mb-4">
                <Col xs={12} sm={10} md={6} lg={4}>
                    <Form.Select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        {[2025, 2024, 2023].map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Cargando historial...</p>
                </div>
            ) : history.length === 0 ? (
                <p>No has completado ningún WOD este mes. ¡Empieza a entrenar! 🏋️‍♂️</p>
            ) : (
                <Row className="justify-content-center gy-4">
                    {history.map((log) => {
                        const category = log.workout?.category?.name || "Sin categoría";
                        const categoryColor = categoryColors[category] || "secondary";

                        return (
                            <Col xs={12} sm={10} md={6} lg={4} key={log.id} className="d-flex justify-content-center">
                                <Card className="shadow-lg workout-card border-0">
                                    <Card.Body className="p-4">
                                        <Badge bg={categoryColor} className="mb-2">
                                            {category}
                                        </Badge>
                                        <Card.Title className="fw-bold fs-4">{log.workout?.title || "Sin título"}</Card.Title>
                                        <Card.Text className="text-muted">
                                            📅 Completado el: {log.completed_at ? new Date(log.completed_at).toLocaleDateString() : "Fecha no disponible"}
                                        </Card.Text>
                                        <Card.Text className="text-start">
                                            <strong>🔥 Calentamiento:</strong> {log.workout?.warmup || "N/A"}<br />
                                            <strong>💪 Movimientos:</strong> {log.workout?.movements || "N/A"}<br />
                                            <strong>🏋️ WOD:</strong> {log.workout?.wod || "N/A"}
                                        </Card.Text>

                                        {/* Notas y Puntuación guardadas */}
                                        {log.score && (
                                            <p className="mt-2"><strong>⭐ Puntuación:</strong> {log.score}/10</p>
                                        )}
                                        {log.notes && (
                                            <p className="mt-2"><strong>📝 Nota:</strong> {log.notes}</p>
                                        )}

                                        {/* Formulario para agregar Notas y Puntuaciones */}
                                        <Form className="mt-3">
                                            <Form.Group className="mb-2">
                                                <Form.Label>📝 Añadir Nota</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Escribe una nota sobre tu entrenamiento"
                                                    value={notes[log.workout.id] || ""}
                                                    onChange={(e) => setNotes({ ...notes, [log.workout.id]: e.target.value })}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Label>⭐ Puntuación</Form.Label>
                                                <Form.Select value={scores[log.workout.id] || ""} onChange={(e) => setScores({ ...scores, [log.workout.id]: e.target.value })}>
                                                    <option value="">Selecciona una puntuación</option>
                                                    {[...Array(10)].map((_, i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Button
                                                variant="success"
                                                onClick={() => handleSave(log.workout.id)}
                                                disabled={saving}
                                            >
                                                {saving ? "Guardando..." : "Guardar Nota y Puntuación"}
                                            </Button>

                                            <Button variant="danger" className="mt-2" onClick={() => handleDelete(log.id)}>
                                                🗑️ Eliminar el WOD
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            )}

            {/* Botón para volver al Dashboard al final */}
            <Button variant="secondary" className="mt-4" onClick={() => window.location.href = "/dashboard"}>
                ⬅️ Volver al Dashboard
            </Button>
        </Container>
    );
};

export default WorkoutHistory;