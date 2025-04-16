import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ObjectiveForm({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        objective: '',
        birth_date: '',
        height: '',
        weight: '',
    });

    const [age, setAge] = useState(null);

    // Calcular edad cuando cambia la fecha de nacimiento
    useEffect(() => {
        if (data.birth_date) {
            const birthDate = new Date(data.birth_date);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setAge(age);
        }
    }, [data.birth_date]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('objective.store'));
    };

    // Validaciones
    const validateForm = () => {
        const errors = {};
        
        if (!data.birth_date) {
            errors.birth_date = 'La fecha de nacimiento es requerida';
        } else {
            const birthDate = new Date(data.birth_date);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 16) {
                errors.birth_date = 'Debes tener al menos 16 años';
            }
            if (age > 100) {
                errors.birth_date = 'Por favor, verifica la fecha de nacimiento';
            }
        }

        if (!data.height) {
            errors.height = 'La altura es requerida';
        } else if (data.height < 100 || data.height > 250) {
            errors.height = 'La altura debe estar entre 100 y 250 cm';
        }

        if (!data.weight) {
            errors.weight = 'El peso es requerido';
        } else if (data.weight < 30 || data.weight > 200) {
            errors.weight = 'El peso debe estar entre 30 y 200 kg';
        }

        return errors;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06l-2.47-2.47V21a.75.75 0 01-1.5 0V4.81L8.78 7.28a.75.75 0 01-1.06-1.06l3.75-3.75z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Configura tus Objetivos
                    </h2>
                </div>
            }
        >
            <Head title="Configura tus Objetivos" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    ¡Personaliza tu experiencia!
                                </h3>
                                <p className="text-gray-600">
                                    Ayúdanos a entender mejor tus objetivos y características para poder ofrecerte un plan más personalizado.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Fecha de Nacimiento */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Fecha de Nacimiento
                                    </label>
                                    <input
                                        type="date"
                                        value={data.birth_date}
                                        onChange={e => setData('birth_date', e.target.value)}
                                        max={new Date().toISOString().split('T')[0]}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {age && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            Edad: {age} años
                                        </p>
                                    )}
                                    {errors.birth_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>
                                    )}
                                </div>

                                {/* Objetivo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Objetivo
                                    </label>
                                    <select
                                        value={data.objective}
                                        onChange={e => setData('objective', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">Selecciona un objetivo</option>
                                        <option value="Pérdida de peso">Pérdida de peso</option>
                                        <option value="Ganancia muscular">Ganancia muscular</option>
                                        <option value="Mejorar resistencia">Mejorar resistencia</option>
                                        <option value="Mejorar flexibilidad">Mejorar flexibilidad</option>
                                    </select>
                                    {errors.objective && (
                                        <p className="mt-1 text-sm text-red-600">{errors.objective}</p>
                                    )}
                                </div>

                                {/* Altura */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Altura (cm)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.height}
                                        onChange={e => setData('height', e.target.value)}
                                        min="100"
                                        max="250"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.height && (
                                        <p className="mt-1 text-sm text-red-600">{errors.height}</p>
                                    )}
                                </div>

                                {/* Peso */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Peso (kg)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.weight}
                                        onChange={e => setData('weight', e.target.value)}
                                        min="30"
                                        max="200"
                                        step="0.1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.weight && (
                                        <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Guardando...
                                            </>
                                        ) : (
                                            'Guardar Objetivos'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
