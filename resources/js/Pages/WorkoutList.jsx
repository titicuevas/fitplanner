import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import WorkoutCard from "../Components/WorkoutCard";

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [completedWorkouts, setCompletedWorkouts] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("all");

    useEffect(() => {
        axios.get("/api/workouts")
            .then((response) => {
                setWorkouts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al cargar los entrenamientos:", error);
                setLoading(false);
            });

        axios.get("/api/workouts/completed", { withCredentials: true })
            .then((response) => {
                setCompletedWorkouts(new Set(response.data.map(wod => wod.workout_id)));
            })
            .catch(error => console.error("Error al cargar WODs completados:", error));
    }, []);

    const handleCompleteWorkout = (workoutId) => {
        if (completedWorkouts.has(workoutId)) return;

        axios.post("/api/workouts/complete", { workout_id: workoutId }, { withCredentials: true })
            .then(() => {
                setCompletedWorkouts(new Set(completedWorkouts).add(workoutId));
                alert("✅ WOD registrado con éxito");
            })
            .catch((error) => {
                console.error("Error al registrar el entrenamiento:", error);
                alert("❌ Error al registrar el WOD");
            });
    };

    const filteredWorkouts = category === "all"
        ? workouts
        : workouts.filter(workout => workout.category.name === category);

    return (
        <Container className="workout-container text-center">
            <h2 className="my-4 fw-bold text-uppercase">🏋️ Lista de Workouts</h2>

            {/* Botones de filtro centrados y con más separación */}
            <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
                <Button variant="dark" className="btn-lg fs-5 px-4" onClick={() => setCategory("all")}>Todos</Button>
                <Button variant="primary" className="btn-lg fs-5 px-4" onClick={() => setCategory("Escalado")}>Escalado</Button>
                <Button variant="warning" className="btn-lg fs-5 px-4" onClick={() => setCategory("RX")}>RX</Button>
                <Button variant="danger" className="btn-lg fs-5 px-4" onClick={() => setCategory("Élite")}>Élite</Button>
            </div>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Cargando entrenamientos...</p>
                </div>
            ) : (
                <Row className="justify-content-center gy-4">
                    {filteredWorkouts.map((workout) => (
                        <Col xs={12} sm={10} md={6} lg={4} key={workout.id} className="d-flex justify-content-center">
                            <WorkoutCard 
                                workout={workout} 
                                onComplete={handleCompleteWorkout}
                                isCompleted={completedWorkouts.has(workout.id)}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default WorkoutList;
