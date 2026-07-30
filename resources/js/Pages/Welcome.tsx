import { Head, Link } from '@inertiajs/react';

type WelcomeProps = {
    auth: {
        user?: { name: string } | null;
    };
};

export default function Welcome({ auth }: WelcomeProps) {
    return (
        <>
            <Head title="FitPlanner" />
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
                <div
                    className="pointer-events-none absolute inset-0 bg-[url('/images/fitplanner-logo.png')] bg-center bg-no-repeat opacity-[0.07]"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-red-600/20 blur-3xl"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative z-10 flex min-h-screen flex-col">
                    <nav className="flex items-center justify-between px-6 py-6 sm:px-10">
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/10 p-1 ring-2 ring-white/20 backdrop-blur-sm sm:h-14 sm:w-14">
                                <img
                                    src="/images/fitplanner-logo.png"
                                    alt="FitPlanner"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <span className="text-xl font-semibold tracking-tight sm:text-2xl">FitPlanner</span>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-gradient-to-br from-red-600 to-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                >
                                    Ir al panel
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border border-white/40 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-red-500 hover:bg-red-500/90 focus:outline-none focus:ring-2 focus:ring-red-500/50 sm:px-5"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-gradient-to-br from-red-600 to-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500/50 sm:px-5"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-10 text-center sm:pt-16">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
                            FitPlanner
                        </p>
                        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Entrena con un plan semanal a tu medida
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg text-zinc-300 sm:text-xl">
                            Define tu objetivo, completa WODs y sigue tu progreso en un solo sitio.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-red-600 to-red-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                >
                                    Continuar entrenando
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            ) : (
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-red-600 to-red-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                >
                                    Empezar gratis
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            )}
                        </div>

                        <ul className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-6 text-left sm:grid-cols-3">
                            {[
                                {
                                    title: 'Plan semanal',
                                    desc: 'WODs alineados con tu objetivo, de lunes a viernes.',
                                },
                                {
                                    title: 'Historial',
                                    desc: 'Notas, puntuaciones y evolución mes a mes.',
                                },
                                {
                                    title: 'Objetivos',
                                    desc: 'Ajusta tu meta y regenera el plan cuando quieras.',
                                },
                            ].map((item) => (
                                <li key={item.title} className="border-t border-white/15 pt-4">
                                    <h2 className="text-base font-semibold text-white">{item.title}</h2>
                                    <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </main>
                </div>
            </div>
        </>
    );
}
