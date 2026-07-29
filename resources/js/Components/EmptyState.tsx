type EmptyStateProps = {
    message: string;
    className?: string;
};

export default function EmptyState({ message, className = '' }: EmptyStateProps) {
    return (
        <div className={`rounded-lg bg-white p-6 text-center shadow transition-colors dark:bg-gray-800 dark:shadow-none ${className}`.trim()}>
            <p className="text-gray-600 dark:text-gray-300">{message}</p>
        </div>
    );
}
