import { Head } from '@inertiajs/react';
import WorkoutList from './WorkoutList';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    const { darkMode } = usePage().props;

    return (
        <>
            <Head title="Inicio - FitPlanner" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Tarjeta principal con gradiente y efecto de cristal */}
                    <div className={`overflow-hidden rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
                        darkMode 
                            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
                    }`}>
                        <div className="p-8">
                            {/* Sección de bienvenida */}
                            <div className="mb-12 text-center">
                                <h2 className={`text-3xl font-bold tracking-tight ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    ¡Bienvenido a tu Panel de Control!
                                </h2>
                                <p className={`mt-4 text-lg ${
                                    darkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                    Aquí podrás gestionar tus entrenamientos y seguir tu progreso.
                                </p>
                            </div>

                            {/* Grid de características */}
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {/* Tarjeta de Progreso */}
                                <div className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                                    darkMode 
                                        ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                                        : 'bg-gray-50 hover:bg-gray-100'
                                }`}>
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-500 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className={`mb-2 text-xl font-semibold ${
                                        darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        Progreso
                                    </h3>
                                    <p className={`${
                                        darkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        Visualiza tu evolución y alcanza tus objetivos.
                                    </p>
                                    <Link 
                                        href={route('workout.history')}
                                        className={`mt-4 inline-flex items-center text-sm font-medium ${
                                            darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'
                                        }`}
                                    >
                                        Acceder al Historial
                                        <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>

                                {/* Tarjeta de Planificación */}
                                <div className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                                    darkMode 
                                        ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                                        : 'bg-gray-50 hover:bg-gray-100'
                                }`}>
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-500 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className={`mb-2 text-xl font-semibold ${
                                        darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        Planificación
                                    </h3>
                                    <p className={`${
                                        darkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        Organiza tus entrenamientos semanales.
                                    </p>
                                    <Link 
                                        href={route('weekly.plan')}
                                        className={`mt-4 inline-flex items-center text-sm font-medium ${
                                            darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'
                                        }`}
                                    >
                                        Ver Planificación
                                        <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>

                                {/* Tarjeta de Comunidad */}
                                <div className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                                    darkMode 
                                        ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                                        : 'bg-gray-50 hover:bg-gray-100'
                                }`}>
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-500 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className={`mb-2 text-xl font-semibold ${
                                        darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        Comunidad
                                    </h3>
                                    <p className={`${
                                        darkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        Conecta con otros atletas y comparte tus logros.
                                    </p>
                                    <div className={`mt-4 text-sm font-medium ${
                                        darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                        Próximamente
                                    </div>
                                </div>
                            </div>

                            {/* Sección de entrenamientos */}
                            <div className="mt-16">
                                <div className="mb-8 flex items-center justify-between">
                                    <h3 className={`text-2xl font-semibold ${
                                        darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        Tus Entrenamientos
                                    </h3>
                                    <div className={`text-sm ${
                                        darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                        {new Date().toLocaleDateString('es-ES', { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </div>
                                </div>
                                <WorkoutList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
