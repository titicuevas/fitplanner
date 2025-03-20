import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

const WeeklyPlan = () => {
    const [plan, setPlan] = useState([]);
    const [loading, setLoading] = useState(true);

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
    }, []);

    // Días de la semana que se asignarán a cada día del plan
    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

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
                // Mostrar los WODs divididos por días de la semana
                <Row className="justify-content-center gy-4">
                    {daysOfWeek.map((day, index) => {
                        // Buscar el WOD asignado a este día
                        const dailyPlan = plan.filter(item => item.assigned_day === day);

                        return (
                            <Col key={index} xs={12} sm={10} md={6} lg={4}>
                                <Card className="shadow-lg">
                                    <Card.Body>
                                        <Card.Title className="fw-bold fs-4">{day}</Card.Title>
                                        {dailyPlan.length > 0 ? (
                                            <>
                                                <Card.Subtitle className="mb-2">{dailyPlan[0].workout.title}</Card.Subtitle>
                                                <Card.Text>{dailyPlan[0].workout.wod}</Card.Text>
                                                <Button variant="outline-success">Ver más</Button>
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

            {/* Botón para volver al Dashboard al final */}
            <Button variant="secondary" className="mt-4" onClick={() => window.location.href = "/dashboard"}>
                ⬅️ Volver al Dashboard
            </Button>
        </Container>
    );
};

export default WeeklyPlan;
