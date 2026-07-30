import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

type EmptyStateProps = {
    title?: string;
    message: string;
    className?: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
    actionDisabled?: boolean;
    actionLoading?: boolean;
    children?: ReactNode;
};

export default function EmptyState({
    title,
    message,
    className = '',
    actionLabel,
    actionHref,
    onAction,
    actionDisabled = false,
    actionLoading = false,
    children,
}: EmptyStateProps) {
    const showAction = Boolean(actionLabel && (actionHref || onAction));

    return (
        <div className={`rounded-lg bg-white p-8 text-center shadow transition-colors dark:bg-gray-800 dark:shadow-none ${className}`.trim()}>
            {title ? (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            ) : null}
            <p className={`text-gray-600 dark:text-gray-300 ${title ? 'mt-2' : ''}`}>{message}</p>

            {showAction ? (
                <div className="mt-6">
                    {actionHref ? (
                        <Link
                            href={actionHref}
                            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            {actionLabel}
                        </Link>
                    ) : (
                        <button
                            type="button"
                            onClick={onAction}
                            disabled={actionDisabled || actionLoading}
                            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-gray-800"
                        >
                            {actionLoading ? 'Generando...' : actionLabel}
                        </button>
                    )}
                </div>
            ) : null}

            {children}
        </div>
    );
}
