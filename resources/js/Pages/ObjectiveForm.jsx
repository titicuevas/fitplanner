import React from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ObjectiveForm({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        objective: user?.objective || '',
        age: user?.age || '',
        height: user?.height || '',
        weight: user?.weight || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/objective');
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
                                {/* Objetivo */}
                                <div>
                                    <label htmlFor="objective" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                        </svg>
                                        Objetivo
                                    </label>
                                    <select
                                        id="objective"
                                        name="objective"
                                        value={data.objective}
                                        onChange={(e) => setData('objective', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm transition-colors duration-200"
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

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Edad */}
                                    <div>
                                        <label htmlFor="age" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                                            </svg>
                                            Edad
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <input
                                                type="number"
                                                id="age"
                                                name="age"
                                                value={data.age}
                                                onChange={(e) => setData('age', e.target.value)}
                                                className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">años</span>
                                            </div>
                                        </div>
                                        {errors.age && (
                                            <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                                        )}
                                    </div>

                                    {/* Altura */}
                                    <div>
                                        <label htmlFor="height" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v16.19l2.47-2.47a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 111.06-1.06l2.47 2.47V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                            </svg>
                                            Altura
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <input
                                                type="number"
                                                id="height"
                                                name="height"
                                                value={data.height}
                                                onChange={(e) => setData('height', e.target.value)}
                                                className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm transition-colors duration-200"
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">cm</span>
                                            </div>
                                        </div>
                                        {errors.height && (
                                            <p className="mt-1 text-sm text-red-600">{errors.height}</p>
                                        )}
                                    </div>

                                    {/* Peso */}
                                    <div>
                                        <label htmlFor="weight" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v.756a49.106 49.106 0 019.152 1 .75.75 0 01-.152 1.485h-1.918l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 0118.75 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 01-.262 1.453h-8.37a.75.75 0 01-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 015.25 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84L4.168 6.241H2.25a.75.75 0 01-.152-1.485 49.105 49.105 0 019.152-1V3a.75.75 0 01.75-.75zm4.878 13.543l1.872-7.662 1.872 7.662h-3.744zm-9.756 0L5.25 8.131l-1.872 7.662h3.744z" clipRule="evenodd" />
                                            </svg>
                                            Peso
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <input
                                                type="number"
                                                id="weight"
                                                name="weight"
                                                value={data.weight}
                                                onChange={(e) => setData('weight', e.target.value)}
                                                className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors duration-200"
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">kg</span>
                                            </div>
                                        </div>
                                        {errors.weight && (
                                            <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                                        )}
                                    </div>
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
