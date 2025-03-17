import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

const WeeklyPlan = () => {
    const [plan, setPlan] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/weekly-plan", { withCredentials: true })
            .then((response) => {
                console.log("✅ Datos del plan recibido:", response.data);  // Verifica los datos recibidos
                setPlan(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("❌ Error al obtener el plan semanal:", error); // Verifica si ocurre algún error
                setLoading(false);
            });
    }, []);

    return (
        <Container className="text-center">
            <h2 className="my-4 fw-bold text-uppercase">📅 Planificación Semanal</h2>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Cargando plan semanal...</p>
                </div>
            ) : plan.length === 0 ? (
                <p>No hay plan disponible para esta semana.</p> // Comentario corregido
            ) : (
                <Row className="justify-content-center gy-4">
                    {plan.map((item, index) => (
                        <Col key={index} xs={12} sm={10} md={6} lg={4}>
                            <Card className="shadow-lg">
                                <Card.Body>
                                    <Card.Title>{item.assigned_day}</Card.Title>
                                    <Card.Subtitle>{item.workout?.title}</Card.Subtitle>
                                    <Card.Text>{item.workout?.wod}</Card.Text>
                                    <Button variant="outline-success">Ver más</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* 🔹 Botón para volver al Dashboard al final */}
            <Button variant="secondary" className="mt-4" onClick={() => window.location.href = "/dashboard"}>
                ⬅️ Volver al Dashboard
            </Button>
        </Container>
    );
};

export default WeeklyPlan;
