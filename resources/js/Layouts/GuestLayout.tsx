import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 transition-colors dark:bg-gray-900 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" aria-label="Ir al inicio">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500 dark:text-gray-300" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md transition-colors sm:max-w-md sm:rounded-lg dark:bg-gray-800 dark:shadow-none dark:ring-1 dark:ring-gray-700">
                {children}
            </div>
        </div>
    );
}
