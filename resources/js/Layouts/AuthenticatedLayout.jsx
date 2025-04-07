import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user || {};
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="dashboard">
                                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/10 p-1 ring-2 ring-white/20 backdrop-blur-sm transition-all duration-300 hover:ring-red-500/50">
                                        <img 
                                            src="/images/fitplanner-logo.png" 
                                            alt="FitPlanner Logo" 
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <Link
                                    href={route('dashboard')}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition duration-150 ease-in-out ${
                                        route().current('dashboard')
                                            ? 'border-red-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    Inicio
                                </Link>

                                <Link
                                    href={route('workout.history')}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition duration-150 ease-in-out ${
                                        route().current('workout.history')
                                            ? 'border-red-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    📜 Historial
                                </Link>

                                <Link
                                    href={route('weekly.plan')}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition duration-150 ease-in-out ${
                                        route().current('weekly.plan')
                                            ? 'border-red-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    📅 Planificación
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative ms-3">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    >
                                        <span className="sr-only">Abrir menú de usuario</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Usuario')}&background=random`}
                                            alt=""
                                        />
                                    </button>
                                </div>

                                {showingNavigationDropdown && (
                                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Link
                                            href={route('profile.edit')}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Perfil
                                        </Link>
                                        <form onSubmit={handleLogout}>
                                            <button
                                                type="submit"
                                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Cerrar Sesión
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-16">
                <main className="min-h-screen bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
