import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const WorkoutHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/workouts/completed", { withCredentials: true })
            .then((response) => {
                console.log("Respuesta API:", response.data); // 👀 VERIFICAR RESPUESTA API
                setHistory(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al obtener el historial:", error);
                setLoading(false);
            });
    }, []);

    return (
        <Container className="history-container text-center">
            <h2 className="my-4 fw-bold text-uppercase">📜 Historial de Workouts</h2>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Cargando historial...</p>
                </div>
            ) : history.length === 0 ? (
                <p>No has completado ningún WOD todavía. ¡Empieza a entrenar! 🏋️‍♂️</p>
            ) : (
                <Row className="justify-content-center gy-4">
                    {history.map((log) => (
                        <Col xs={12} sm={10} md={6} lg={4} key={log.id} className="d-flex justify-content-center">
                            <Card className="shadow-lg workout-card border-0">
                                <Card.Body className="p-4">
                                    <Card.Title className="fw-bold fs-4">{log.workout?.title || "Sin título"}</Card.Title>
                                    <Card.Text className="text-muted">
                                        Completado el: {log.created_at ? new Date(log.created_at).toLocaleDateString() : "Fecha no disponible"}
                                    </Card.Text>
                                    <Card.Text className="text-start">
                                        <strong>🔥 Calentamiento:</strong> {log.workout?.warmup || "N/A"}<br />
                                        <strong>💪 Movimientos:</strong> {log.workout?.movements || "N/A"}<br />
                                        <strong>🏋️ WOD:</strong> {log.workout?.wod || "N/A"}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default WorkoutHistory;
