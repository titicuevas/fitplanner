import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import WorkoutCard from "../Components/WorkoutCard";
import Swal from 'sweetalert2';

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
                showErrorMessage("Error al cargar los entrenamientos");
            });

        axios.get("/api/workouts/completed", { withCredentials: true })
            .then((response) => {
                setCompletedWorkouts(new Set(response.data.map(wod => wod.workout_id)));
            })
            .catch(error => {
                console.error("Error al cargar WODs completados:", error);
                showErrorMessage("Error al cargar los WODs completados");
            });
    }, []);

    const showSuccessMessage = (title, text) => {
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            confirmButtonColor: '#10B981',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end',
            toast: true
        });
    };

    const showErrorMessage = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonColor: '#EF4444',
            position: 'top-end',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    };

    const handleCompleteWorkout = async (workoutId, workoutTitle) => {
        if (completedWorkouts.has(workoutId)) {
            showErrorMessage("Este WOD ya está completado");
            return;
        }

        try {
            await axios.post("/api/workouts/complete", { workout_id: workoutId }, { withCredentials: true });
            setCompletedWorkouts(new Set(completedWorkouts).add(workoutId));
            
            showSuccessMessage(
                "¡WOD Completado!",
                `Has completado el WOD "${workoutTitle}" con éxito`
            );
        } catch (error) {
            console.error("Error al registrar el entrenamiento:", error);
            showErrorMessage("Error al registrar el WOD");
        }
    };

    const filteredWorkouts = category === "all"
        ? workouts
        : workouts.filter(workout => workout.category.name === category);

    return (
        <Container className="workout-container text-center">
            <h2 className="my-4 fw-bold text-uppercase">🏋️ Lista de Workouts</h2>

            <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
                <Button 
                    variant="dark"
                    className={`btn-lg fs-5 px-4 ${category === "all" ? "active" : ""}`} 
                    onClick={() => setCategory("all")}
                >
                    Todos
                </Button>
                <Button 
                    variant="primary"
                    className={`btn-lg fs-5 px-4 ${category === "Escalado" ? "active" : ""}`} 
                    onClick={() => setCategory("Escalado")}
                >
                    Escalado
                </Button>
                <Button 
                    variant="warning"
                    className={`btn-lg fs-5 px-4 ${category === "RX" ? "active" : ""}`} 
                    onClick={() => setCategory("RX")}
                >
                    RX
                </Button>
                <Button 
                    variant="danger"
                    className={`btn-lg fs-5 px-4 ${category === "Élite" ? "active" : ""}`} 
                    onClick={() => setCategory("Élite")}
                >
                    Élite
                </Button>
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
                                onComplete={() => handleCompleteWorkout(workout.id, workout.title)}
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
