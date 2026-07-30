import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import WorkoutList from './WorkoutList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { AuthUser } from '@/types/auth';

type FeatureCard = {
    title: string;
    description: string;
    href: string;
    cta: string;
    icon: ReactNode;
};

const FEATURE_CARDS: FeatureCard[] = [
    {
        title: 'Progreso',
        description: 'Revisa tus WODs completados, notas y puntuaciones.',
        href: 'workout.history',
        cta: 'Ver historial',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        ),
    },
    {
        title: 'Plan semanal',
        description: 'Organiza y completa tus entrenamientos de la semana.',
        href: 'weekly.plan',
        cta: 'Abrir plan',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
    },
    {
        title: 'Objetivos',
        description: 'Define tu meta y genera un plan adaptado a ti.',
        href: 'objective.form',
        cta: 'Ajustar objetivo',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
    },
];

export default function Dashboard() {
    const { auth } = usePage<{ auth: { user: AuthUser } }>().props;
    const firstName = auth.user.name.trim().split(/\s+/)[0] || auth.user.name;
    const needsObjective = !auth.user.objective;

    return (
        <AuthenticatedLayout>
            <Head title="Inicio - FitPlanner" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-lg backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                        <div className="p-8">
                            <div className="mb-12 text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Hola, {firstName}
                                </h2>
                                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                    Gestiona tus entrenamientos y sigue tu progreso desde aquí.
                                </p>
                            </div>

                            {needsObjective ? (
                                <div className="mb-10 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-left dark:border-red-900 dark:bg-red-950/40">
                                    <p className="font-semibold text-red-800 dark:text-red-200">
                                        Todavía no has definido tu objetivo
                                    </p>
                                    <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                                        Configúralo para generar un plan semanal adaptado a ti.
                                    </p>
                                    <Link
                                        href={route('objective.form')}
                                        className="mt-3 inline-flex rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                                    >
                                        Configurar objetivo
                                    </Link>
                                </div>
                            ) : null}

                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {FEATURE_CARDS.map((card) => (
                                    <a
                                        key={card.title}
                                        href={route(card.href)}
                                        className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-gray-50 p-6 transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-gray-800/60 dark:hover:bg-gray-700/60 dark:focus:ring-offset-gray-900"
                                    >
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-500 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                {card.icon}
                                            </svg>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
                                        </div>
                                        <span className="mt-4 inline-flex items-center text-sm font-medium text-red-600 group-hover:text-red-500 dark:text-red-400 dark:group-hover:text-red-300">
                                            {card.cta}
                                            <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </a>
                                ))}
                            </div>

                            <div className="mt-16">
                                <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        Tus entrenamientos
                                    </h3>
                                    <div className="text-sm capitalize text-gray-500 dark:text-gray-400">
                                        {new Date().toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </div>
                                </div>
                                <WorkoutList embedded />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
