import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    title?: string;
}>;

export default function GuestLayout({ children, title }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" aria-label="Ir al inicio" className="block">
                    <img
                        className="mx-auto h-20 w-auto"
                        src="/images/fitplanner-logo.png"
                        alt="FitPlanner"
                    />
                </Link>
                {title ? (
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {title}
                    </h2>
                ) : null}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-900/90 px-6 py-8 shadow-[0_0_1rem_rgba(0,0,0,0.3)] backdrop-blur-sm sm:rounded-xl sm:px-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
