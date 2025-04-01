import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';  // Importa correctamente el layout

export default function ObjectiveForm({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        objective: user?.objective || '',
        age: user?.age || '',  // Asegúrate de que el valor por defecto esté definido
        height: user?.height || '',  // Asegúrate de que el valor por defecto esté definido
        weight: user?.weight || '',  // Asegúrate de que el valor por defecto esté definido
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data); // Para depuración: verifica los datos que se están enviando
        post('/objective');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Selecciona tu objetivo" />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-header text-center">
                                <h2>Selecciona tu objetivo</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="objective">Objetivo</label>
                                        <select
                                            id="objective"
                                            name="objective"
                                            className="form-control"
                                            value={data.objective}
                                            onChange={(e) => setData('objective', e.target.value)}
                                            required
                                        >
                                            <option value="">Selecciona un objetivo</option>
                                            <option value="Pérdida de peso">Pérdida de peso</option>
                                            <option value="Ganancia muscular">Ganancia muscular</option>
                                            <option value="Mejorar resistencia">Mejorar resistencia</option>
                                            <option value="Mejorar flexibilidad">Mejorar flexibilidad</option>
                                        </select>
                                        {errors.objective && <div className="text-danger">{errors.objective}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="age">Edad</label>
                                        <input
                                            type="number"
                                            id="age"
                                            name="age"
                                            className="form-control"
                                            value={data.age}
                                            onChange={(e) => setData('age', e.target.value)}
                                            required
                                        />
                                        {errors.age && <div className="text-danger">{errors.age}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="height">Altura (cm)</label>
                                        <input
                                            type="number"
                                            id="height"
                                            name="height"
                                            className="form-control"
                                            value={data.height}
                                            onChange={(e) => setData('height', e.target.value)}
                                            required
                                        />
                                        {errors.height && <div className="text-danger">{errors.height}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="weight">Peso (kg)</label>
                                        <input
                                            type="number"
                                            id="weight"
                                            name="weight"
                                            className="form-control"
                                            value={data.weight}
                                            onChange={(e) => setData('weight', e.target.value)}
                                            required
                                        />
                                        {errors.weight && <div className="text-danger">{errors.weight}</div>}
                                    </div>

                                    <div className="text-center mt-3">
                                        <button type="submit" className="btn btn-primary w-100" disabled={processing}>
                                            {processing ? 'Guardando...' : 'Guardar objetivo'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
