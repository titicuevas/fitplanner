import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bienvenido a FitPlanner CrossFit" />
            <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                {/* Overlay de imagen de fondo con efecto oscuro */}
                <div className="absolute inset-0 bg-[url('/images/fitplanner-logo.png')] bg-center bg-no-repeat opacity-5"></div>

                <div className="relative z-10">
                    {/* Barra de navegación */}
                    <nav className="flex items-center justify-between p-6">
                        <div className="flex items-center">
                            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white/10 p-1 ring-2 ring-white/20 backdrop-blur-sm transition-all duration-300 hover:ring-red-500/50">
                                <img 
                                    src="/images/fitplanner-logo.png" 
                                    alt="FitPlanner Logo" 
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-600 to-red-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                >
                                    <span className="relative">Dashboard</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border-2 border-white/50 px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-red-500 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                    >
                                        <span className="relative">Iniciar Sesión</span>
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-600 to-red-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                    >
                                        <span className="relative">Registrarse</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    {/* Contenido principal */}
                    <main className="mx-auto max-w-7xl px-6 py-24 text-center">
                        <h1 className="mb-8 text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_0.3rem_#ffffff70] sm:text-6xl lg:text-7xl">
                            Comienza Tu Transformación
                        </h1>
                        <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-100">
                            Únete a la comunidad FitPlanner CrossFit y descubre tu verdadero potencial. 
                            Entrena, progresa y supera tus límites con programas personalizados y seguimiento profesional.
                        </p>
                        
                        {/* Características destacadas */}
                        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl bg-gray-800/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/70 hover:shadow-red-500/10">
                                <div className="mb-4 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-500 shadow-lg">
                                    <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-white">Seguimiento de Progreso</h3>
                                <p className="text-gray-100">Registra tus WODs y visualiza tu evolución en tiempo real</p>
                            </div>

                            <div className="rounded-xl bg-gray-800/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/70 hover:shadow-red-500/10">
                                <div className="mb-4 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-500 shadow-lg">
                                    <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-white">Programación Semanal</h3>
                                <p className="text-gray-100">Planifica tus entrenamientos y mantén una rutina consistente</p>
                            </div>

                            <div className="rounded-xl bg-gray-800/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/70 hover:shadow-red-500/10">
                                <div className="mb-4 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-500 shadow-lg">
                                    <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-white">Comunidad</h3>
                                <p className="text-gray-100">Conecta con otros atletas y comparte tus logros</p>
                            </div>
                        </div>

                        {/* CTA final */}
                        {!auth.user && (
                            <div className="mt-16">
                                <Link
                                    href={route('register')}
                                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-600 to-red-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                >
                                    <span className="relative flex items-center">
                                        Comienza Ahora
                                        <svg className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
