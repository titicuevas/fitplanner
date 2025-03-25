import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Badge, Form, Button } from "react-bootstrap";

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
    const [selectedMonth, setSelectedMonth] = useState("03"); // Mes por defecto (Marzo)
    const [selectedYear, setSelectedYear] = useState("2025"); // Año por defecto

    useEffect(() => {
        // Obtener los WODs completados por el mes y año seleccionado
        axios.get(`/api/workouts-by-month`, {
            params: {
                month: selectedMonth,
                year: selectedYear
            },
            withCredentials: true
        })
        .then((response) => {
            setHistory(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("❌ Error al obtener el historial:", error);
            setLoading(false);
        });
    }, [selectedMonth, selectedYear]);

    const handleSave = (workoutId) => {
        setSaving(true);
        axios.post("/api/workouts/complete", {
            workout_id: workoutId,
            score: scores[workoutId] || null,
            notes: notes[workoutId] || null
        }, { withCredentials: true })
            .then(response => {
                console.log("✅ Guardado:", response.data);
                setSaving(false);
                // Aquí necesitas asegurar que se recarga el historial
                axios.get(`/api/workouts-by-month?month=${selectedMonth}&year=${selectedYear}`, { withCredentials: true })
                    .then((response) => {
                        setHistory(response.data);
                    })
                    .catch((error) => {
                        console.error("❌ Error al obtener el historial después de guardar:", error);
                    });
            })
            .catch(error => {
                console.error("❌ Error al guardar:", error);
                setSaving(false);
            });
    };

    const handleDelete = (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este WOD?")) return;

        axios.delete(`/api/workouts/completed/${id}`, { withCredentials: true })
            .then(response => {
                console.log("✅ Eliminado:", response.data);
                setHistory(history.filter(log => log.id !== id));
            })
            .catch(error => {
                console.error("❌ Error al eliminar el WOD:", error);
            });
    };

    return (
        <Container className="history-container text-center">
            <h2 className="my-4 fw-bold text-uppercase">📜 Historial de Workouts</h2>

            {/* Selector de mes */}
            <Row className="justify-content-center mb-4">
                <Col xs={12} sm={10} md={6} lg={4}>
                    <Form.Select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
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
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
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
                                            📅 Completado el: {log.created_at ? new Date(log.created_at).toLocaleDateString() : "Fecha no disponible"}
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