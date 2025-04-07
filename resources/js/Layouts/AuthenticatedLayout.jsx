import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import "@theme-toggles/react/css/Expand.css"
import { Expand } from "@theme-toggles/react"

export default function AuthenticatedLayout({ children, header }) {
    const { auth } = usePage().props || {};
    const user = auth?.user || {};
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('darkMode') === 'true';
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <nav className={`border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
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
                                            ? darkMode 
                                                ? 'border-red-500 text-white' 
                                                : 'border-red-500 text-gray-900'
                                            : darkMode
                                                ? 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    Inicio
                                </Link>

                                <Link
                                    href={route('workout.history')}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition duration-150 ease-in-out ${
                                        route().current('workout.history')
                                            ? darkMode 
                                                ? 'border-red-500 text-white' 
                                                : 'border-red-500 text-gray-900'
                                            : darkMode
                                                ? 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    📜 Historial
                                </Link>

                                <Link
                                    href={route('weekly.plan')}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition duration-150 ease-in-out ${
                                        route().current('weekly.plan')
                                            ? darkMode 
                                                ? 'border-red-500 text-white' 
                                                : 'border-red-500 text-gray-900'
                                            : darkMode
                                                ? 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    📅 Planificación
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <Expand
                                    duration={750}
                                    className="text-2xl"
                                    toggled={darkMode}
                                    toggle={setDarkMode}
                                />
                            </div>

                            <div className="relative ms-3">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
                                    <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md ${darkMode ? 'bg-gray-800' : 'bg-white'} py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                                        <Link
                                            href={route('profile.edit')}
                                            className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            Perfil
                                        </Link>
                                        <Link
                                            method="post"
                                            href={route('logout')}
                                            as="button"
                                            className={`block w-full px-4 py-2 text-left text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            Cerrar Sesión
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className={`shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
