import { useState, PropsWithChildren, ReactNode, FormEvent } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Progress from '@/Components/Progress';
import { useTheme } from '@/hooks/useTheme';

type Props = PropsWithChildren<{
    header?: ReactNode;
}>;

function navLinkClass(active: boolean) {
    return `inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 no-underline ${
        active
            ? 'bg-red-50 text-red-600 font-semibold shadow-sm dark:bg-red-950/50 dark:text-red-400'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
    }`;
}

export default function AuthenticatedLayout({ children, header }: Props) {
    const { auth } = usePage<{ auth: { user: { name: string; email: string } } }>().props;
    const user = auth?.user || { name: 'Usuario', email: '' };
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { isDark, toggle } = useTheme();
    const { post } = useForm();

    const handleLogout = (e: FormEvent) => {
        e.preventDefault();
        post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-gray-100 transition-colors duration-300 dark:bg-gray-900">
            <Progress />
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800/95">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href={route('dashboard')} aria-label="Ir al inicio">
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
                                <Link href={route('dashboard')} className={navLinkClass(route().current('dashboard'))}>
                                    Inicio
                                </Link>
                                <Link href={route('workout.history')} className={navLinkClass(route().current('workout.history'))}>
                                    Historial
                                </Link>
                                <Link href={route('weekly.plan')} className={navLinkClass(route().current('weekly.plan'))}>
                                    Planificación
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={toggle}
                                aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-gray-400 dark:hover:bg-gray-700"
                            >
                                {isDark ? (
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>

                            <div className="relative ms-3">
                                <button
                                    type="button"
                                    className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    aria-expanded={showingNavigationDropdown}
                                    aria-haspopup="menu"
                                >
                                    <span className="sr-only">Abrir menú de usuario</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                                        alt={`Avatar de ${user.name}`}
                                    />
                                </button>

                                {showingNavigationDropdown && (
                                    <div
                                        role="menu"
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-800 dark:ring-white/10"
                                    >
                                        <Link
                                            href={route('profile.edit')}
                                            role="menuitem"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                            onClick={() => setShowingNavigationDropdown(false)}
                                        >
                                            Perfil
                                        </Link>
                                        <form onSubmit={handleLogout}>
                                            <button
                                                type="submit"
                                                role="menuitem"
                                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
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

            {header && (
                <header className="bg-white pt-16 shadow transition-colors dark:bg-gray-800 dark:shadow-none">
                    <div className="mx-auto max-w-7xl px-4 py-6 text-gray-800 sm:px-6 lg:px-8 dark:text-gray-100">
                        {header}
                    </div>
                </header>
            )}

            <div className={header ? '' : 'pt-16'}>
                <main className="min-h-screen bg-gray-100 transition-colors duration-300 dark:bg-gray-900">
                    {children}
                </main>
            </div>
        </div>
    );
}
